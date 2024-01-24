import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Snackbar, Alert } from '@mui/material';
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from '@mui/material';
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import VNPAY from "../../../assests/vnpay.png"
import BANK from "../../../assests/bank.png"
import QR from "../../../assests/QR.jpg"
import MuiAlert from '@mui/material/Alert';



function BookTime() {
    const [data, setData] = useState([]);
    const { tutorId } = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (selectedCheckboxes.length !== 3) {
            setShowAlert(true);
            return;
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
          // Define the allowed file types
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];
    
          // Check if the selected file type is in the allowed types
          if (!allowedTypes.includes(selectedImage.type)) {
            alert('Please select a valid image file (JPG, JPEG, GIF, PNG, SVG).');
            // Clear the input if an invalid file is selected
            e.target.value = null;
            return;
          }
    
          // Set the file to state if needed
          setImage(selectedImage);
        }
    
      };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        paddingTop: '20px',
        borderRadius: '10px',
        backgroundColor: "white"
    };
    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        paddingTop: '20px',
        borderRadius: '10px',
        backgroundColor: "white"
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8081/book/timeline`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [daysOfWeek, setDaysOfWeek] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/book/lesson`)
            .then((response) => {
                setDaysOfWeek(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [scheduleData, setScheduleData] = useState([]);
    const token = localStorage.getItem('token');
    const decodedTokenRef = useRef(null);
    decodedTokenRef.current = jwtDecode(token);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/book/timeandlesson?tutorid=${tutorId}&studentid=${decodedTokenRef.current.id}`)
            .then((response) => {
                setScheduleData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [tutorId, decodedTokenRef.current.id]);

    const decodedToken = jwtDecode(localStorage.getItem('token'));

    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/student/viewstudent?email=" + decodedToken.id)
            .then((response) => {
                setStudent(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [decodedToken.id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.delete(
                `http://localhost:8081/book/cancelbook?studentid=${student.studentid}`,
                config
            );
            window.location.href = '/homestudent';
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmits = async (event) => {
        event.preventDefault();
      
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const configs = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      
        try {
          await axios.delete(
            `http://localhost:8081/book/deletetimeerror/${student.studentid}`,
            config
          );
      
          for (const checkbox of selectedCheckboxes) {
            const postData = {
              studentid: student.studentid,
              timeId: checkbox.timeId,
              lessonid: checkbox.lessonid,
            };
      
            await axios.post(
              'http://localhost:8081/book/timebook',
              postData,
              configs
            );
          }
      
          await axios.post(
            `http://localhost:8081/book/banking`,
            {
              studentid: student.studentid,
              file: image,
              email: student.email,
            },
            configs
          );
          showSnackbar("Cảm on bạn đã tin cậy chúng tôi vui lòng bạn đợi chúng phản hồi từ EDU-CONNECT!")
          window.location.href = '/homestudent';
        } catch (error) {
          console.error(error);
        }
      };

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

    const [showAlert, setShowAlert] = useState(false);

    const handlePaymentAndBooktime = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const configs = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            if (selectedCheckboxes.length !== 3) {
                setShowAlert(true);
                return;
            }

            const paymentResponse = await axios.get(
                `http://localhost:8081/book/createpayment?studentid=${student.studentid}`,
                config
            );

            await axios.delete(
                `http://localhost:8081/book/deletetimeerror/${student.studentid}`,
                config
            );

            for (const checkbox of selectedCheckboxes) {
                const postData = {
                    studentid: student.studentid,
                    timeId: checkbox.timeId,
                    lessonid: checkbox.lessonid,
                };

                await axios.post(
                    'http://localhost:8081/book/timebook',
                    postData,
                    configs
                );
            }

            window.location.href = paymentResponse.data.url;
        } catch (error) {
            console.error(error);
        }
    };

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    console.log("ds", selectedCheckboxes);

    const handleCheckboxChange = (item) => {
        if (selectedCheckboxes.includes(item)) {
            setSelectedCheckboxes(selectedCheckboxes.filter((checkbox) => checkbox !== item));
        } else if (selectedCheckboxes.length < 3) {
            setSelectedCheckboxes([...selectedCheckboxes, item]);
        }
    };

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <Box sx={{ marginTop: '30px', marginLeft: '5%' }}>
                    <Typography variant="h2"
                        noWrap
                        component="a"
                        sx={{
                            fontWeight: 800,
                            color: '#F9C01F',
                            textDecoration: 'none',
                            fontSize: '45px'
                        }}>EDU-CONNECT
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', marginLeft: '40px' }}>
                    <Box sx={{ backgroundColor: '#AFB5AF', width: '30px', textAlign: 'center', borderRadius: '50%' }}>
                        <Typography sx={{ fontSize: '20px', color: 'white', fontFamily: 'fantasy' }}>1</Typography>
                    </Box>
                    <span style={{ borderBottom: '5px solid #AFB5AF', width: '395px', display: 'inline-block', marginBottom: '13px' }} />
                    <Box sx={{ backgroundColor: '#388532', width: '30px', textAlign: 'center', borderRadius: '50%' }}>
                        <Typography sx={{ fontSize: '20px', color: 'white', fontFamily: 'fantasy' }}>2</Typography>
                    </Box>
                    <span style={{ borderBottom: '5px solid #AFB5AF', width: '395px', display: 'inline-block', marginBottom: '13px' }} />
                    <Box sx={{ backgroundColor: '#AFB5AF', width: '30px', textAlign: 'center', borderRadius: '50%' }}>
                        <Typography sx={{ fontSize: '20px', color: 'white', fontFamily: 'fantasy' }}>3</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', marginLeft: '480px', left: 'auto', marginTop: '10px' }}>
                <Box sx={{ textAlign: 'center', marginLeft: '-10px' }}>
                    <Typography>Chọn gia sư</Typography>
                </Box>
                <span style={{ width: '380px' }} />
                <Box sx={{ textAlign: 'center', marginLeft: '-3px' }}>
                    <Typography>Chọn giờ</Typography>
                </Box>
                <span style={{ width: '380px' }} />
                <Box sx={{ textAlign: 'center' }}>
                    <Typography>Hoàn thành</Typography>
                </Box>
            </Box>
            <Box sx={{
                height: '800px',
                backgroundColor: '#D9D9D9',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '20px',
                justifyContent: 'center'
            }}>
                <Typography sx={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', fontSize: '20px', fontFamily: 'revert' }}>Đăng ký thời gian học của bạn</Typography>
                <Box sx={{ backgroundColor: 'gray', width: '980px', marginLeft: 'auto', borderRadius: '20%', marginRight: 'auto' }}>
                    <TableContainer component={Paper} sx={{ width: '100%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ padding: '20px 45px', backgroundColor: '#71C763' }}></TableCell>
                                    {daysOfWeek.map((day, index) => (
                                        <TableCell key={index} sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#71C763' }}>{day.lessonline}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((itime, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ border: '1px solid #000000', width: '140px', height: '100px', backgroundColor: '#71C763', color: 'white', textAlign: 'center', fontSize: '15px', fontFamily: 'cursive' }}>{itime.timeline} - {itime.endtime}</TableCell>
                                        {daysOfWeek.map((day, dayIndex) => {
                                            const item = scheduleData.find((data) => data.timeline === itime.timeline && data.lessonline === day.lessonline);

                                            return (
                                                <TableCell key={dayIndex} sx={{ border: '1px solid #000000', width: '140px', height: '100px' }}>
                                                    {item && item.lessonline && (
                                                        <Checkbox
                                                            value={`${item.timeId}-${item.lessonid}`}
                                                            checked={selectedCheckboxes.includes(item)}
                                                            onChange={() => handleCheckboxChange(item)}
                                                            inputProps={{ 'aria-label': `Checkbox ${item}` }}
                                                        />
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box sx={{ paddingTop: '20px', display: 'flex' }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "50px"
                    }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: "700", color: "red" }}>Notes:</Typography>
                        <Typography sx={{ fontSize: '20px', marginLeft: "7px", color: "#5E5D5D" }}> Lịch học này của bạn sẽ kéo dài trong vòng 3 tháng và bắt buộc 1 tuần 3 tiết. </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 'auto', marginRight: '20%' }}>
                        <Button onClick={handleOpen} variant="contained" color="success" style={{ height: '30px', backgroundColor: 'green', fontSize: '12px', marginRight: '20px' }}>
                            Thanh toán
                        </Button>
                        <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleAlertClose} sx={{ marginBottom: "20%", marginLeft: "30%" }}>
                            <Alert onClose={handleAlertClose} autoHideDuration={1000} severity="warning" sx={{ backgroundColor: '#ffee58', fontSize: "15px" }}>
                                Vui lòng chọn đủ 3 lịch học để tiến hành thanh toán.
                            </Alert>
                        </Snackbar>
                        <Button onClick={handleSubmit} variant="contained" color="error" style={{ height: '30px', backgroundColor: 'red', fontSize: '12px' }}>
                            Huỷ
                        </Button>
                    </Box>
                </Box>

            </Box>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Typography sx={{ fontSize: "25px", fontWeight: "700" }}>Thông tin bạn đăng ký lịch học</Typography>
                        <Typography sx={{ fontSize: "15px" }}>Thời gian khoá học kéo dài trong vòng 3 tháng</Typography>
                        {selectedCheckboxes.map((item, index) => (
                            <Box key={index} sx={{ display: "flex", marginTop: "10px" }}>
                                <Typography sx={{ fontSize: "15px" }}>{item.lessonline}: </Typography>
                                <Typography sx={{ fontSize: "15px", marginLeft: "5px" }}>{item.timeline} (1h45p)</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", marginTop: "20px" }}>
                        <Box sx={{ height: "100px", width: "200px", borderRadius: "10px" }} onClick={handlePaymentAndBooktime}>
                            <img src={VNPAY} alt="logo" style={{ height: "80px", width: "170px" }} />
                        </Box>
                        <Box sx={{ height: "100px", width: "200px", borderRadius: "10px" }} onClick={handleOpen1}>
                            <img src={BANK} alt="logo" style={{ height: "80px", width: "170px" }} />
                        </Box>
                    </Box>
                    <Box sx={{ marginLeft: '70%', marginTop: "20px" }}>
                        <Button onClick={handleClose} variant="contained" sx={{ height: '30px', backgroundColor: 'red', fontSize: '12px' }}>
                            Huỷ
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={open1}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Typography style={{ fontSize: "23px", fontWeight: "700" }}>Chuyển khoản ngân hàng</Typography>
                        <img src={QR} alt="logo" style={{ height: "200px", width: "200px" }} />
                        <Typography style={{ fontSize: "18px", fontWeight: "700", color: "red" }}>Nội dung: Họ và Tên + Lớp</Typography>
                        <Box>
                            <TextField
                                accept="image/*"
                                fullWidth
                                variant='outlined'
                                style={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}
                                type="file"
                                id="contained-button-file"
                                onChange={handleImageChange}
                                required
                            />
                        </Box>
                    </Box>
                    <Box sx={{ marginLeft: '40%', marginTop: "20px" }}>
                        <Button onClick={handleSubmits} variant="contained" style={{ height: '30px', backgroundColor: 'green', fontSize: '12px', marginRight: '20px' }}>
                            Thanh toán
                        </Button>
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
                        <Button onClick={handleClose1} variant="contained" style={{ height: '30px', backgroundColor: 'red', fontSize: '12px' }}>
                            Huỷ
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>);
}

export default BookTime;