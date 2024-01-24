import { Textarea } from "@mui/joy";
import { Box, Button, Modal, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Feedback() {
    const [open, setOpen] = React.useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [feedbacks, setFeedback] = useState([]);
    const [note, setNote] = useState('');
    const student = jwtDecode(localStorage.getItem('token'));
    useEffect(() => {
        axios
            .get("http://localhost:8081/student/feedback/" + student.id)
            .then((response) => {
                setFeedback(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [student.id]);

    const handleSubmitFB = async (event, feedbackid) => {
        event.preventDefault();
        event.stopPropagation();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.post(
                "http://localhost:8081/student/addfeedback",
                {
                    feedbackid: feedbackid,
                    notes: note,
                    ranks: ratingValue,
                },
                config
            );

            window.location.href = "/feedback";
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };
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
                                        <Button onClick={handleOpen} variant="contained" sx={{ textAlign: 'center', fontSize: '10px', fontFamily: 'cursive' }}>
                                            Phản hồi
                                        </Button>
                                    </TableCell>
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
                                                value={ratingValue}
                                                onChange={handleRatingChange}
                                                size="large"
                                                sx={{ marginTop: '20px', fontSize: '20px', marginLeft: '15%' }}
                                            />
                                            <Textarea placeholder='Chú thích'
                                                InputLabelProps={{
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
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                InputProps={{
                                                    style: {
                                                        fontSize: '14px',
                                                        height: '45px'
                                                    },
                                                }} />
                                            <Button variant="contained" style={{ width: '70px', fontSize: '18px', marginTop: '30px', marginLeft: '20%' }} onClick={(event) => handleSubmitFB(event, item.feedbackid)}>Lưu</Button>
                                        </Box>
                                    </Modal>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {feedbacks.length > 0 ? (
                <Typography></Typography>
            ) : (
                <Box sx={{ paddingLeft: '70%', paddingTop: '20px' }}>
                    <Link to="/homestudent">
                        <Button variant="contained" sx={{ backgroundColor: '#D7AA67', fontSize: '12px', fontFamily: 'cursive' }}> Quay trở lại</Button>
                    </Link>
                </Box>
            )}
        </Box>
    );
}

export default Feedback;