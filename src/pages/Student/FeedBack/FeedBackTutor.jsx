import { Textarea } from "@mui/joy";
import { Box, Button, Modal, Paper, Rating, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import MuiAlert from '@mui/material/Alert';


function FeedbackTutor() {
    const [open, setOpen] = React.useState(false);
    const [feedbacks, setFeedback] = useState([]);
    const [detail, setDetail] = useState([]);
    const student = jwtDecode(localStorage.getItem('token'));
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success');

    const showSnackbar = (message, type) => {
        setSnackbarMessage(message);
        setSnackbarType(type);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8081/student/feedbacktutor/" + student.id)
            .then((response) => {
                setFeedback(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [student.id]);

    const handleSubmitFB = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.put(
                "http://localhost:8081/student/feedback/update",
                {
                    feedbackid: detail.feedbackid,
                    notes: detail.note,
                    ranks: detail.ranks,
                },
                config
            );
            showSnackbar("Cập nhật thành công", 'success');
            window.location.reload();
        } catch (error) {
            showSnackbar("Cập nhật không thành công", 'error');
            console.error(error);
        }
    };

    const handleOpen = (feedbackid) => {
        try {
            axios
                .get(`http://localhost:8081/student/detailfeeback/${feedbackid}`)
                .then((response) => {
                    setDetail(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 350,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        padding: 16,
        borderRadius: "10px"
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Typography variant="h3" sx={{ textAlign: 'center', marginTop: '40px', fontFamily: 'cursive' }}>Đánh giá gia sư</Typography>
            <Box sx={{ backgroundColor: 'gray', width: '980px', marginLeft: 'auto', borderRadius: '20%', marginRight: 'auto', marginTop: '50px' }}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ border: '1px solid #000000', padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D7AA67', textAlign: 'center' }}>Tên</TableCell>
                                <TableCell sx={{ border: '1px solid #000000', padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D7AA67', textAlign: 'center' }}>Ngày</TableCell>
                                <TableCell sx={{ border: '1px solid #000000', padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D7AA67', textAlign: 'center' }}>Gia sư</TableCell>
                                <TableCell sx={{ border: '1px solid #000000', padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D7AA67', textAlign: 'center' }}>Môn học</TableCell>
                                <TableCell sx={{ border: '1px solid #000000', padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D7AA67', textAlign: 'center' }}>Phản hồi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feedbacks.map((item, key) => (
                                <TableRow key={key}>
                                    <TableCell sx={{ border: '1px solid #000000', width: '100px', height: '50px', backgroundColor: '#D9D9D9', fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>{item.studentname}</TableCell>
                                    <TableCell sx={{ border: '1px solid #000000', width: '150px', height: '50px', backgroundColor: '#D9D9D9', fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>{item.startdate} - {item.enddate}</TableCell>
                                    <TableCell sx={{ border: '1px solid #000000', width: '100px', height: '50px', backgroundColor: '#D9D9D9', fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>{item.tutorname}</TableCell>
                                    <TableCell sx={{ border: '1px solid #000000', width: '100px', height: '50px', backgroundColor: '#D9D9D9', fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>{item.courseName} {item.classname}</TableCell>
                                    <TableCell sx={{ border: '1px solid #000000', width: '100px', height: '50px', backgroundColor: '#D9D9D9', fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }} >
                                        <Button onClick={() => handleOpen(item.feedbackid)} variant="contained" sx={{ textAlign: 'center', fontSize: '10px', fontFamily: 'cursive' }}>
                                            Cập nhật
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles}>
                        <Typography id="modal-modal-title" component="h2" sx={{ marginTop: '-80px', fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>
                            Đánh giá gia sư
                        </Typography>
                        <Rating
                            name="star-rating"
                            value={detail.ranks}
                            onChange={(e) => setDetail({ ...detail, ranks: e.target.value })}
                            size="large"
                            sx={{ marginTop: '20px', fontSize: '20px', marginLeft: '15%' }}
                        />
                        <Textarea placeholder='Chú thích'
                            inputLabelProps={{
                                style: {
                                    fontSize: '12px',
                                    color: 'rgba(0, 0, 0, 0.54)',
                                },
                            }}
                            sx={{
                                width: '200px',
                                height: '100px',
                                marginLeft: '-30px',
                                marginTop: '30px',
                                fontSize: '15px'
                            }}
                            value={detail.note}
                            onChange={(e) => setDetail({ ...detail, note: e.target.value })}
                            InputProps={{
                                style: {
                                    fontSize: '14px',
                                    height: '45px'
                                },
                            }} />
                        <Button variant="contained" style={{ width: '70px', fontSize: '18px', marginTop: '30px', marginLeft: '20%' }} onClick={(event) => handleSubmitFB(event)}>Lưu</Button>
                    </Box>
                </Modal>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MuiAlert
                        onClose={handleSnackbarClose}
                        severity={snackbarType}
                        sx={{ width: '100%', fontSize: '15px' }}
                    >
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </Box>
        </Box>
    );
}

export default FeedbackTutor;