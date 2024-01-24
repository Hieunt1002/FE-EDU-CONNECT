import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, MenuItem, Modal, Pagination, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format } from "date-fns";
import dayjs from "dayjs";
import "./TryLearningManagement.css";
import MuiAlert from '@mui/material/Alert';


function TryLearningManagement() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [student, setStudent] = useState(null);
    const [tutor, setTutor] = useState(null);
    const [text, setText] = useState('');
    const [status, setStatus] = useState(null);
    const [vstudent, setVstudent] = useState('');
    const [vTutor, setVtutor] = useState('');
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

    const handleOpen = (studentid, tutorid) => {
        setStudent(studentid);
        setTutor(tutorid);
        setOpen(true);
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const datestring = `${year}-${month}-${day}`;
    const [date, setDate] = useState(datestring);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const handleSearch = (event) => {
        setSearchName(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const fetchData = useCallback((pageNumber) => {
        axios
            .get(`http://localhost:8081/staffsconnect/studentTrylearning/${pageNumber}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/staffsconnect/counttrylearnpage`)
            .then((response) => {
                setPages(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        if (student !== null && tutor != null) {
            axios
                .get(`http://localhost:8081/staffsconnect/student/viewprofile/${student}`)
                .then((response) => {
                    setVstudent(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            axios
                .get(`http://localhost:8081/staffsconnect/tutor/viewprofile/${tutor}`)
                .then((response) => {
                    setVtutor(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        fetchData(page);
    }, [student, fetchData, page, tutor]);
    const handleClickChange = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const formatDate = format(new Date(date), 'yyyy-MM-dd');
            const response = await axios.put(
                `http://localhost:8081/staffsconnect/accepttrylean`,
                {
                    studentid: vstudent.studentid,
                    status: status,
                    date: formatDate,
                    emailstudent: vstudent.email,
                    emailtutor: vTutor.email,
                    text: text,
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
                        fontFamily: "cursive"
                    }}>
                        Danh sách học sinh học thử
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
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>MSHS</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Tên học sinh</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Tên gia sư</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Số điện thoại</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Ngày đăng ký</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Môn đăng ký</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Trạng thái</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => {
                                    if (item.fullnamestudent.toLowerCase().includes(searchName.toLowerCase())) {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.studentid}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.fullnamestudent}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.fullnametutor}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.phone}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.dateregister}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.courseName} {item.class}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", color: item.status === 1 ? 'green' : 'red' }}>
                                                    {item.status === 1 ? 'Đã duyệt' : null}
                                                    {item.status === 2 ? 'Chưa duyệt' : null}
                                                    {item.status === 0 ? 'Đã từ chối' : null}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                                    {item.status !== 2 ? (
                                                        null
                                                    ) : (
                                                        <Button variant="contained" style={{ marginRight: '10px', fontSize: "10px", fontFamily: "cursive", }} onClick={() => handleOpen(item.studentid, item.tutorid)} >
                                                            Hành động
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                    return null;
                                })}
                            </TableBody>
                        </Table>
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
                            <Box sx={{ backgroundColor: "#D9D9D9", width: "350px", height: "460px", borderRadius: "10px", border: '2px solid #000000', p: 2, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', }}>
                                <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>Duyệt học sinh</Typography>
                                <TextField
                                    fullWidth
                                    label='Email Học sinh'
                                    value={vstudent.email}
                                    variant='outlined'
                                    InputLabelProps={{
                                        shrink: vstudent.email ? true : undefined,
                                        style: { fontSize: '15px' },
                                    }}
                                    disabled={true}
                                    InputProps={{
                                        style: { fontSize: '14px' },
                                    }}
                                    required
                                    sx={{ marginTop: "20px" }}
                                />
                                <TextField
                                    fullWidth
                                    label='Email gia sư'
                                    value={vTutor.email}
                                    variant='outlined'
                                    InputLabelProps={{
                                        shrink: vTutor.email ? true : undefined,
                                        style: { fontSize: '15px' },
                                    }}
                                    disabled={true}
                                    InputProps={{
                                        style: { fontSize: '14px' },
                                    }}
                                    required
                                    sx={{ marginTop: "20px" }}
                                />
                                <TextField
                                    fullWidth
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    label='Nội dung'
                                    variant='outlined'
                                    InputLabelProps={{
                                        style: { fontSize: '15px' },
                                    }}
                                    InputProps={{
                                        style: { fontSize: '14px' },
                                        multiline: true,
                                        rows: 3,
                                    }}
                                    required
                                    sx={{ marginTop: "20px" }}
                                />
                                <TextField
                                    select
                                    label='Hành động'
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    InputLabelProps={{
                                        style: { fontSize: '15px' },
                                    }}
                                    InputProps={{
                                        style: { fontSize: '14px' },
                                    }}
                                    sx={{
                                        width: '100%', marginTop: "20px"
                                    }}
                                >
                                    <MenuItem value={1}>Duyệt</MenuItem>
                                    <MenuItem value={0}>Không Duyệt</MenuItem>
                                </TextField>
                                {status !== 0 && status !== null && (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={dayjs(date)}
                                            onChange={(newValue) => setDate(newValue)}
                                            label='Chọn ngày học'
                                            fullWidth
                                            sx={{
                                                width: '100%',
                                                marginTop: "20px",
                                                "& .MuiInputLabel-root": {
                                                    fontSize: "15px"
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    value={date || ''}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                )}
                                <Box sx={{ marginTop: "30px" }}>
                                    <Button variant="outlined" startIcon={<DeleteIcon sx={{ color: "white" }} />} sx={{ backgroundColor: "red", color: "white" }} onClick={handleClose}>
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
                                    <Button variant="contained" endIcon={<SendIcon />} sx={{ backgroundColor: "green", marginLeft: '10px' }} onClick={handleClickChange}>
                                        Send
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
                    </TableContainer>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                    <Pagination count={pages} page={page} onChange={handlePageChange} sx={{ '& .MuiPaginationItem-root': { fontSize: '15px', minWidth: '50px' } }} />
                </Box>
            </Box>
        </Box>
    );
}

export default TryLearningManagement;