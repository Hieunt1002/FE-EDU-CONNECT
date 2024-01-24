import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, Grid, MenuItem, TextField } from '@mui/material';
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

export default function DiscountForCourse(props) {
    const { isShowModal, setOpen } = props;
    const [discount, setDiscount] = useState('');
    const [course, setCourse] = useState('');
    const [data, setData] = useState([]);
    const [dis, setDis] = useState([]);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/course/listcourse`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/discount/listdiscountforcourse`)
            .then((response) => {
                setDis(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/discount/adddiscourse', {
                discountid: discount,
                courseid: course
            });
            alert(response.data.message);
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('An error occurred during the API call', error);
        }
    };

    return (


        <Modal
            open={!!isShowModal}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <Container maxWidth='lg' style={{ marginTop: '10px', padding: '10px' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid style={{ float: 'left' }}>
                                <Typography variant='h3' style={{ fontFamily: 'cursive' }}>
                                    Thêm giảm giá cho khóa học
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label='Tiêu đề giảm giá'
                                    variant='outlined'
                                    sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    required
                                >
                                    {dis.map((item) => (
                                        <MenuItem key={item.discountid} value={item.discountid} sx={{ fontSize: "15px" }}>
                                            {item.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label='Môn học'
                                    variant='outlined'
                                    sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    required
                                >
                                    {data.map((item) => (
                                        <MenuItem key={item.courseid} value={item.courseid} sx={{ fontSize: "15px" }}>
                                            {item.courseName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    style={{ float: 'right' }}
                                    onClick={handleSubmit}
                                >
                                    Lưu
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </Modal>
    );
}
