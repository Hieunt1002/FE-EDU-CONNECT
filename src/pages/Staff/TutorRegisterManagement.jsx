import React, { useEffect, useState } from "react";
import { Box, Button, Link, Modal, Pagination, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { jwtDecode } from "jwt-decode";
import MuiAlert from '@mui/material/Alert';



function TutorRegisterManagement() {
    const [searchName, setSearchName] = useState("");
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [tutor, setTutor] = useState('');
    const [prices, setPrice] = useState('');
    const [experience, setExperience] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleCloses = () => setOpen(false);
    const [open1, setOpen1] = React.useState(false);
    const [page, setPage] = useState(1);
    const [total, settotal] = useState([]);
    const handleCloses1 = () => setOpen1(false);
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

    const handleOpen1 = (email, tutor) => {
        setEmail(email);
        setTutor(tutor);
        setOpen1(true);
    };
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const handleOpen = (email, tutor) => {
        setEmail(email);
        setTutor(tutor);
        setOpen(true);
    };

    const handleSearch = (event) => {
        setSearchName(event.target.value);
    };
    const handleSend = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.put(
                `http://localhost:8081/staffsconnect/accepttutor`,
                {
                    tutorid: tutor,
                    staffid: decodedToken.id,
                    message: message,
                    email: email,
                    experience: experience,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            showSnackbar(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
        handleCloses();
    };

    const handleSendfinal = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.put(
                `http://localhost:8081/staffsconnect/accepttutorfinal`,
                {
                    tutorid: tutor,
                    staffid: decodedToken.id,
                    message: message,
                    email: email,
                    price: prices,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            showSnackbar(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
        handleCloses();
    };

    const handleDelete = async (event, tutorid) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.delete(
                `http://localhost:8081/staffsconnect/deletetutorregister/${tutorid}`);
            showSnackbar(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
        handleCloses();
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8081/staffsconnect/listwaitforconfirm?page=${page}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get(`http://localhost:8081/staffsconnect/pageforwaittutor`)
            .then((response) => {
                settotal(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [page]);

    return (
        <Box sx={{ marginBottom: "50px" }}>
            <Box sx={{
                backgroundColor: "#D9D9D9",
                height: "100px",
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "20px",
                borderRadius: "5px",
                border: '1px solid #000000', p: 2
            }}>
                <Box sx={{
                    textAlign: "center",
                }}>
                    <Typography sx={{
                        fontSize: "40px",
                        fontFamily: "cursive",
                    }}>
                        Thông tin gia sư mới đăng ký
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                backgroundColor: "#D9D9D9",
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "20px",
                borderRadius: "5px",
                border: '1px solid #000000', p: 2,
            }}>
                <Box sx={{
                    marginLeft: '80%',
                    marginTop: '10px',
                }}>
                    <TextField
                        label="Tìm Kiếm"
                        sx={{
                            borderRadius: '11%',
                            width: '200px',
                        }}
                        InputProps={{
                            style: {
                                height: '45px',
                                fontSize: "14px"
                            },
                        }}
                        value={searchName}
                        onChange={handleSearch}
                    />
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "15px",
                }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>STT</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Tên gia sư</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>File CV</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Trạng thái</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item) => {
                                    if (item.fullName.toLowerCase().includes(searchName.toLowerCase())) {
                                        return (
                                            <TableRow key={item.tutorid}>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.tutorid}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.fullName}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.cv ? (
                                                    <Link style={{ textDecoration: "none" }} href={`http://localhost:8081/edu/file/fileuser/${item.cv}/${item.tutorid}`} target="_blank" rel="noopener noreferrer">
                                                        Tải File
                                                    </Link>
                                                ) : (
                                                    "No file available"
                                                )}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", color: "red" }}>{item.status === 3 ? 'Đang đợi duyệt' : 'Đợi phỏng vấn'}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                                    {item.status === 3 ? (
                                                        <InterpreterModeIcon sx={{ fontSize: "25px" }} onClick={() => handleOpen(item.email, item.tutorid)} />
                                                    ) : (
                                                        <CheckCircleIcon sx={{ fontSize: "25px" }} onClick={() => handleOpen1(item.email, item.tutorid)} />
                                                    )}
                                                    <RemoveCircleOutlineIcon sx={{ fontSize: "25px", marginLeft: '10px' }} onClick={(e) => handleDelete(e, item.tutorid)} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                    return null;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                    <Pagination count={total.length} page={page} onChange={handlePageChange} sx={{ '& .MuiPaginationItem-root': { fontSize: '15px', minWidth: '50px' } }} />
                </Box>
            </Box>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#D9D9D9",
                        width: "500px",
                        height: "410px",
                        borderRadius: "10px",
                        border: '2px solid #000000',
                        p: 2
                    }}
                >
                    <Typography
                        sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}
                    >
                        Duyệt gia sư
                    </Typography>
                    <TextField
                        fullWidth
                        label='Email'
                        disabled={true}
                        value={email}
                        InputProps={{
                            style: { fontSize: '14px' },
                        }}
                        required
                        sx={{ marginTop: "20px" }}
                    />
                    <TextField
                        fullWidth
                        label='Nội dung'
                        variant='outlined'
                        InputLabelProps={{
                            style: { fontSize: '15px' },
                        }}
                        InputProps={{
                            style: { fontSize: '14px' },
                            multiline: true,
                            rows: 7,
                        }}
                        required
                        sx={{ marginTop: "20px" }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Box sx={{ marginTop: "30px", marginLeft: "45%" }}>
                        <Button
                            variant="outlined"
                            sx={{ backgroundColor: "red", color: "white" }}
                            onClick={handleCloses}
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "green", marginLeft: '10px' }}
                            onClick={(e) => handleSend(e)}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={open1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#D9D9D9",
                        width: "500px",
                        height: "550px",
                        borderRadius: "10px",
                        border: '2px solid #000000',
                        p: 2
                    }}
                >
                    <Typography
                        sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}
                    >
                        Duyệt gia sư
                    </Typography>
                    <TextField
                        fullWidth
                        label='Email'
                        disabled={true}
                        value={email}
                        InputProps={{
                            style: { fontSize: '14px' },
                        }}
                        required
                        sx={{ marginTop: "20px" }}
                    />
                    <TextField
                        fullWidth
                        label='Nội dung'
                        variant='outlined'
                        InputLabelProps={{
                            style: { fontSize: '15px' },
                        }}
                        InputProps={{
                            style: { fontSize: '14px' },
                            multiline: true,
                            rows: 7,
                        }}
                        required
                        sx={{ marginTop: "20px" }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        value={prices}
                        onChange={(e) => setPrice(e.target.value)}
                        label='Tiền'
                        type="number"
                        variant='outlined'
                        InputLabelProps={{
                            style: { fontSize: '15px' },
                        }}
                        InputProps={{
                            style: { fontSize: '14px' },
                        }}
                        required
                        sx={{ marginTop: "20px" }}
                    />
                    <TextField
                        fullWidth
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        label='Kinh nghiệm'
                        type="number"
                        variant='outlined'
                        InputLabelProps={{
                            style: { fontSize: '15px' },
                        }}
                        InputProps={{
                            style: { fontSize: '14px' },
                        }}
                        required
                        sx={{ marginTop: "20px" }}
                    />
                    <Box sx={{ marginTop: "30px", marginLeft: "45%" }}>
                        <Button
                            variant="outlined"
                            sx={{ backgroundColor: "red", color: "white" }}
                            onClick={handleCloses1}
                        >
                            Hủy
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
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "green", marginLeft: '10px' }}
                            onClick={(e) => handleSendfinal(e)}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default TutorRegisterManagement;