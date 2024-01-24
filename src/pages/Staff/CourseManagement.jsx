import React, { useCallback, useEffect, useState }
    from "react";
import { Box, Button, Menu, MenuItem, Modal, Pagination, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MuiAlert from '@mui/material/Alert';


function CourseManagement() {
    const [data, setData] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState('');
    const [detail, setDetail] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [time, setTime] = useState([]);
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

    const handleClicks = (event, tutorid, status, date, tutor, student, studentid) => {
        setAnchorEl(event.currentTarget);
        setBook(tutorid);
        setStatus(status);
        setDate(date);
        setStudent(student);
        setTutor(tutor);
        setStduentid(studentid);
    };

    const handleCloses = () => {
        setAnchorEl(null);
    };

    const handleSearch = (event) => {
        setSearchName(event.target.value);
    };
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const [open, setOpen] = useState(false);
    const [tutor, setTutor] = useState('');
    const [student, setStudent] = useState('');
    const [book, setBook] = useState('');
    const [studentid, setStduentid] = useState('');
    const [link, setLink] = useState('');
    const [openUd, setOpenUd] = React.useState(false);
    const handleCloseUd = () => setOpenUd(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        setOpen(true);
    }

    const handleOpenV = () => {
        try {
            axios
                .get(`http://localhost:8081/staffsconnect/learntime?bookid=${book}`)
                .then((response) => {
                    setTime(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            axios
                .get(`http://localhost:8081/staffsconnect/detailmanagestudent?bookid=${book}`)
                .then((response) => {
                    setDetail(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
        setOpenUd(true);
    }

    const handleAccept = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            showSnackbar("Bạn đã chấp nhận hóa đơn thành công");
            window.location.reload();
            await axios.get(
                `http://localhost:8081/book/acceptcardpay/${studentid}`
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.delete(`http://localhost:8081/book/cancelcardpay/${book}`)
            showSnackbar(response.data)
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
        handleCloses();
    }

    const fetchData = useCallback((pageNumber) => {
        axios
            .get(`http://localhost:8081/staffsconnect/managestudent?page=${pageNumber}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/staffsconnect/totalpageStudent`)
            .then((response) => {
                setPages(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        fetchData(page);
    }, [fetchData, page]);

    const handleClickChange = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.put(
                `http://localhost:8081/staffsconnect/addlinkmeet`,
                {
                    bookid: book,
                    linkmeet: link,
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
    };

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
                        Thông tin học sinh đăng ký khoá học
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
                                    <TableCell sx={{ fontSize: "17px", fontFamily: "cursive", textAlign: "center" }}>STTĐK</TableCell>
                                    <TableCell sx={{ fontSize: "17px", fontFamily: "cursive", textAlign: "center" }}>Tên học sinh</TableCell>
                                    <TableCell sx={{ fontSize: "17px", fontFamily: "cursive", textAlign: "center" }}>Tên gia sư</TableCell>
                                    <TableCell sx={{ fontSize: "17px", fontFamily: "cursive", textAlign: "center" }}>Môn học</TableCell>
                                    <TableCell sx={{ fontSize: "17px", fontFamily: "cursive", textAlign: "center" }}>Ngày đăng ký</TableCell>
                                    <TableCell sx={{ fontSize: "17px", fontFamily: "cursive", textAlign: "center" }}>Ngày kết thúc</TableCell>
                                    <TableCell sx={{ fontSize: "17px", fontFamily: "cursive", textAlign: "center" }}>Loại thanh toán</TableCell>
                                    <TableCell sx={{ fontSize: "17px", fontFamily: "cursive", textAlign: "center" }}>Trạng thái</TableCell>
                                    <TableCell sx={{ fontSize: "17px", fontFamily: "cursive", textAlign: "center" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => {
                                    if (item.studentName.toLowerCase().includes(searchName.toLowerCase())) {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.bookid}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.studentName}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.tutorName}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.courseName}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.dateregister}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.endDate}</TableCell>
                                                {item.status === '2' ? (
                                                    <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                                        Chuyển khoản
                                                    </TableCell>
                                                ) : (
                                                    <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                                        VNPAY
                                                    </TableCell>
                                                )}
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", color: item.trangThai === 'Đã hoàn thành' ? 'green' : 'red' }}>{item.trangThai}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                                    <MoreVertIcon sx={{ fontSize: "25px" }} onClick={(e) => handleClicks(e, item.bookid, item.status, item.datepay, item.tutorName, item.studentName, item.studentid)} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                    return null;
                                })}
                            </TableBody>
                        </Table>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloses}
                        >
                            <MenuItem onClick={handleOpenV}>Xem thông tin</MenuItem>
                            {date !== null ? (
                                <MenuItem onClick={handleOpen}>Cập nhật google meet</MenuItem>
                            ) : (
                                null
                            )}
                            {status === '2' && date === null ? (
                                <>
                                    <MenuItem onClick={handleAccept}>Chấp nhận pay</MenuItem>
                                    <MenuItem onClick={handleCancel}>Xóa</MenuItem>
                                </>
                            ) : (
                                null
                            )}
                        </Menu>
                    </TableContainer>
                </Box>
                <Modal
                    open={openUd}
                    onClick={handleCloseUd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ backgroundColor: "#D9D9D9", width: "300px", height: "280px", borderRadius: "10px", border: '2px solid #000000', p: 2, }}>
                        <Typography sx={{ fontSize: "17px", marginTop: "10px", textAlign: 'center' }}>Học sinh: {detail.studentName}</Typography>
                        <Typography sx={{ fontSize: "17px", textAlign: 'center' }}>Gia sư: {detail.tutorName}</Typography>
                        <Typography sx={{ fontSize: "17px", textAlign: 'center' }}>Thanh toán bằng: {detail.status === 1 ? "Chuyển khoản" : "VNPAY"}</Typography>
                        <Typography sx={{ fontSize: "17px", textAlign: 'center' }}>Ngày đăng ký: {detail.dateregister}</Typography>
                        <Typography sx={{ fontSize: "17px", textAlign: 'center' }}>Ngày kết thúc: {detail.endDate}</Typography>
                        <Typography sx={{ fontSize: "17px", textAlign: 'center' }}>Môn: {detail.courseName}</Typography>
                        {time.map((item, index) => (
                            <Typography sx={{ fontSize: "17px", textAlign: 'center' }} key={index}>Giờ: {item.timeline} Buổi: {item.lesson}</Typography>
                        ))}
                    </Box>
                </Modal>
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
                    <Box sx={{ backgroundColor: "#D9D9D9", width: "350px", height: "300px", borderRadius: "10px", border: '2px solid #000000', p: 2 }}>
                        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>Thêm LinkMeet</Typography>
                        <Typography sx={{ fontSize: "15px", fontWeight: "600", textAlign: "center", marginTop: '10px' }}>Tên học sinh: {student}</Typography>
                        <Typography sx={{ fontSize: "15px", fontWeight: "600", textAlign: "center", marginTop: '10px' }}>Tên gia sư: {tutor}</Typography>
                        <TextField
                            fullWidth
                            label='Link meet'
                            variant='outlined'
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
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
                            <Button variant="outlined" sx={{ backgroundColor: "red", color: "white" }} onClick={handleClose}>
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
                            <Button variant="contained" sx={{ marginLeft: '10px' }} onClick={handleClickChange}>
                                Send
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                    <Pagination count={pages.length} page={page} onChange={handlePageChange} sx={{ '& .MuiPaginationItem-root': { fontSize: '15px', minWidth: '50px' } }} />
                </Box>
            </Box>
        </Box>
    );
}

export default CourseManagement;