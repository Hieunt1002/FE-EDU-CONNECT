import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, Grid } from '@mui/material';
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

export default function ListCourseByDiscout(props) {
    const { isShowModal, setOpen, selectDiscountId, title } = props;
    const [course, setCourse] = useState([]);

    const handleClose = () => setOpen(false);

    const [dataToSend, setDataToSend] = useState({
        discountId: selectDiscountId
    });

    useEffect(() => {
        setDataToSend(prevData => ({
            ...prevData,
            discountId: selectDiscountId
        }));
    }, [selectDiscountId]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/discount/listcoursebydiscourseid?discountid=${selectDiscountId}`)
            .then((response) => {
                setCourse(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [selectDiscountId]);

    return (


        <Modal
            open={!!isShowModal}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <Container maxWidth='lg' style={{ marginTop: '10px', padding: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid style={{ float: 'left' }}>
                            <Typography variant='h3' style={{ fontFamily: 'cursive' }}>
                                Những khóa học được giảm giá
                            </Typography>
                            <Typography variant='h4' style={{ fontFamily: 'cursive', marginTop: '10px', textAlign: 'center' }}>
                                Tiêu đề : {title}
                            </Typography>
                        </Grid>
                        {course.map((item, index) => (
                            <Grid item xs={12} key={index}>
                                <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>{item.courseName}</Typography>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='large'
                                style={{ float: 'right' }}
                                onClick={handleClose}
                            >
                                Đóng
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Modal>
    );
}
