import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Box, Button, Menu, MenuItem, Modal, Pagination, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import MuiAlert from '@mui/material/Alert';


function TutorManagement() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleCloses = () => setOpen(false);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [tutor, setTutor] = useState(null)
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

    const handleSearch = (event) => {
        setSearchName(event.target.value);
    };

    const handleClick = (event, tutorid) => {
        setAnchorEl(event.currentTarget);
        setTutor(tutorid);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [history, setHistory] = useState([]);
    const decodedToken = jwtDecode(localStorage.getItem('token'));

    const fetchTop = useCallback((pageNumber) => {
        axios
            .get(`http://localhost:8081/staffsconnect/tutor/${decodedToken.id}/${pageNumber}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [decodedToken.id]);
    const [page, setPage] = useState(1);
    const [total, settotal] = useState([]);
    useEffect(() => {
        fetchTop(page);
    }, [page, fetchTop]);
    const handlePageChange = (event, pageNumber) => {
        setPage(pageNumber);
    };
    useEffect(() => {
        axios
            .get(`http://localhost:8081/staffsconnect/totaltutor?staffid=${decodedToken.id}`)
            .then((response) => {
                settotal(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        if (tutor !== null) {
            axios
                .get(`http://localhost:8081/staffsconnect/tutor/viewprofile/${tutor}`)
                .then((response) => {
                    setData1(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            axios
                .get(`http://localhost:8081/staffsconnect/tutor/viewprofile/classcourse/${tutor}`)
                .then((response) => {
                    setData2(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            axios
                .get(`http://localhost:8081/staffsconnect/tutor/viewprofile/timeline/${tutor}`)
                .then((response) => {
                    setData3(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            axios
                .get(`http://localhost:8081/educonnect/historypay?tutorid=${tutor}`)
                .then((response) => {
                    setHistory(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [tutor, decodedToken.id]);
    const handleClickClasscourse = async (tutorid, event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const formData = new FormData();
            formData.append('classcourseid', course);
            formData.append('tutorid', tutorid);
            const response = await axios.post(
                `http://localhost:8081/staffsconnect/addClasscourseForTutor`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            showSnackbar(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickChange = async (tutorid, event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.put(
                `http://localhost:8081/staffsconnect/tutor/updatesalary`,
                {
                    tutorid: tutorid,
                    price: data1.price,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                alert("succsess");
            } else {
                alert("faill");
            }
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickFlag = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.get(`http://localhost:8081/staffsconnect/tutor/block/${tutor}`);
            if (response.data === true) {
                alert("succsess");
                window.location.reload();
            } else {
                alert("faill");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [classEntity, setClassEntity] = useState([]);
    const [courseC, setCourseC] = useState([]);
    const [course, setCourse] = useState('');
    const [classcourse, setClassCourse] = useState('');

    useEffect(() => {
        axios
            .get("http://localhost:8081/student/class")
            .then((response) => {
                setClassEntity(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (classcourse) {
            axios
                .get(`http://localhost:8081/course/findCourseByClass?classcourseid=${classcourse}`)
                .then((response) => {
                    setCourseC(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setCourseC([]);
        }
    }, [classcourse]);

    const handleClassChange = (event) => {
        setClassCourse(event.target.value);
    };


    const [open1, setOpen1] = useState(false);
    const handleClose1 = () => setOpen1(false);
    const handleOpen1 = () => setOpen1(true);
    const [open2, setOpen2] = useState(false);
    const handleCloses2 = () => setOpen2(false);
    const handleOpen2 = () => setOpen2(true);
    const [open3, setOpen3] = useState(false);
    const handleCloses3 = () => setOpen3(false);
    const handleOpen3 = () => setOpen3(true);
    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        paddingTop: '20px',
        borderRadius: '10px'
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 350,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        paddingTop: '20px'
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
                        fontFamily: "cursive"
                    }}>
                        Danh sách gia sư
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
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>MSGS</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Tên gia sư</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Địa chỉ</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Số điện thoại</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Ngày đăng ký</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Thu nhập</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Trạng thái</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => {
                                    if (item.fullname.toLowerCase().includes(searchName.toLowerCase())) {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.tutorid}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.fullname}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.city} {item.wards}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.phone}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.createdate}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(item.price)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", color: item.status === 1 ? 'green' : 'red' }}>
                                                    {item.status === 1 ? 'Còn dạy' : 'Đã nghỉ'}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                                    <MoreVertIcon sx={{ fontSize: "25px" }} onClick={(event) => handleClick(event, item.tutorid)} />
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
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleOpen}>Xem thông tin</MenuItem>
                    <MenuItem onClick={handleOpen1}>Lịch sử rút tiền</MenuItem>
                    <MenuItem onClick={handleOpen2}>Update Tiền</MenuItem>
                    <MenuItem onClick={handleOpen3}>Thêm môn dạy</MenuItem>
                    <MenuItem onClick={handleClickFlag}>Cắm cờ</MenuItem>
                </Menu>
                <Modal
                    open={open}
                    onClick={handleCloses}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ backgroundColor: "#D9D9D9", width: "340px", borderRadius: "10px", border: '2px solid #000000', p: 2, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', }}>
                        <Avatar sx={{ height: "100px", width: "100px", marginLeft: "30%" }} src={`http://localhost:8081/edu/file/files/` + data1.img} />
                        <Typography sx={{ fontSize: "17px", marginTop: "20px" }}>Giáo viên: {data1.fullname}</Typography>
                        <Typography sx={{ fontSize: "17px" }}>Ngày sinh: {data1.birthdate}</Typography>
                        <Typography sx={{ fontSize: "17px" }}>Số điện thoại: {data1.phone}</Typography>
                        <Typography sx={{ fontSize: "17px" }}>Email: {data1.email}</Typography>
                        <Typography sx={{ fontSize: "17px" }}>Địa chỉ: {data1.city} - {data1.wards}</Typography>

                        <Box sx={{ display: "flex" }}>
                            <Typography sx={{ fontSize: "17px" }}>Phụ trách môn:</Typography>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                {data2.map((item, index) => (
                                    <Typography key={index} sx={{ fontSize: "17px" }}> +{item.coursename} {item.classname}</Typography>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex" }}>
                            <Typography sx={{ fontSize: "17px" }}>Thời gian dạy:</Typography>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                {data3.map((item, index) => (
                                    <Typography key={index} sx={{ fontSize: "17px" }}> +{item.lesson} : {item.timeline}</Typography>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ ...styles, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                        <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>Lịch sử rút tiền</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Số tiền rút</TableCell>
                                        <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Số tài khoản</TableCell>
                                        <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Ngân hàng</TableCell>
                                        <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Ngày thanh toán</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.isArray(history) ? (
                                        (history).map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>
                                                    {item.money.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                                </TableCell>
                                                <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.banknumber}</TableCell>
                                                <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.bank}</TableCell>
                                                {item.date !== null ? (
                                                    <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.date}</TableCell>
                                                ) : (
                                                    <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>Đợi duyệt</TableCell>
                                                )}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell style={{ fontSize: "10px", fontFamily: "cursive", textAlign: "center" }} colSpan={4}>No data available</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Modal>
                <Modal
                    open={open2}
                    onClose={handleCloses2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box sx={{ marginTop: '40px' }}>
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>Tên gia sư: {data1.fullname}</Typography>
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>MSGS: {data1.tutorid}</Typography>
                            <TextField
                                sx={{ marginTop: '20px', marginLeft: '26%' }}
                                label='Giá'
                                value={data1.price}
                                onChange={(e) => setData1({ ...data1, price: e.target.value })}
                                InputLabelProps={{
                                    shrink: data1.price ? true : undefined,
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: '14px',
                                        height: '45px'
                                    },
                                }}
                            />

                            <Box sx={{ marginTop: "30px", marginLeft: "34%", display: 'flex' }}>
                                <Button type="submit" sx={{ backgroundColor: "green", color: "black", fontSize: "12px", fontWeight: "600" }} onClick={(event) => handleClickChange(data1.tutorid, event)}>Lưu</Button>
                                <Button sx={{ backgroundColor: "red", color: "black", fontSize: "12px", fontWeight: "600", marginLeft: '10px' }} onClick={handleCloses2}>Huỷ</Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={open3}
                    onClose={handleCloses3}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box sx={{ marginTop: '40px' }}>
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>
                                Tên gia sư: {data1.fullname}
                            </Typography>
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>
                                MSGS: {data1.tutorid}
                            </Typography>
                            <TextField
                                sx={{ marginTop: '20px', marginLeft: '26%', width: '200px' }}
                                label="Lớp"
                                select
                                value={classcourse}
                                onChange={handleClassChange}
                                InputLabelProps={{
                                    style: {
                                        fontSize: '12px',
                                        color: 'rgba(0, 0, 0, 0.54)',
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: '14px',
                                        height: '45px',
                                    },
                                }}
                            >
                                {classEntity.map((item, index) => (
                                    <MenuItem key={index} value={item.classid} sx={{ fontSize: '15px' }}>
                                        {item.className}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                sx={{ marginTop: '20px', marginLeft: '26%', width: '200px' }}
                                label="Môn"
                                select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                InputLabelProps={{
                                    style: {
                                        fontSize: '12px',
                                        color: 'rgba(0, 0, 0, 0.54)',
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: '14px',
                                        height: '45px',
                                    },
                                }}
                            >
                                {courseC.map((item, index) => (
                                    <MenuItem key={index} value={item.classCourseId} sx={{ fontSize: '15px' }}>
                                        {item.courseName}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Box sx={{ marginTop: '30px', marginLeft: '34%', display: 'flex' }}>
                                <Button
                                    type="submit"
                                    sx={{ backgroundColor: 'green', color: 'black', fontSize: '12px', fontWeight: '600' }}
                                    onClick={(event) => handleClickClasscourse(data1.tutorid, event)}
                                >
                                    Lưu
                                </Button>
                                <Button
                                    sx={{ backgroundColor: 'red', color: 'black', fontSize: '12px', fontWeight: '600', marginLeft: '10px' }}
                                    onClick={handleCloses3}
                                >
                                    Huỷ
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                    <Pagination count={total.length} page={page} onChange={handlePageChange} sx={{ '& .MuiPaginationItem-root': { fontSize: '15px', minWidth: '50px' } }} />
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
        </Box>
    );
}

export default TutorManagement;