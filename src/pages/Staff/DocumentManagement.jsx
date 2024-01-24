import React, { useCallback, useEffect, useState } from "react";
import { Box, Link, Pagination, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import CheckIcon from '@mui/icons-material/Check';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import MuiAlert from '@mui/material/Alert';


function DocumentManagement() {
    const [searchName, setSearchName] = useState("");
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState('');
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

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const fetchData = useCallback((pageNumber) => {
        axios
            .get(`http://localhost:8081/staffsconnect/listtutorregistersforlessons?page=${pageNumber}&staffid=${decodedToken.id}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [decodedToken.id]);

    useEffect(() => {
        fetchData(page);
        axios
            .get(`http://localhost:8081/staffsconnect/totalpageTutor?staffid=${decodedToken.id}`)
            .then((response) => {
                setPages(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [decodedToken.id, fetchData, page]);

    const handleClickChange = async (event, fileid, status) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.put(
                `http://localhost:8081/staffsconnect/acceptfile`,
                {
                    fileid: fileid,
                    status: status,
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
                        Thông tin gia sư đăng ký bài dạy
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
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Tên bài dạy</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Môn học</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>File bài dạy</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Trạng thái</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item) => {
                                    if (item.tutorname.toLowerCase().includes(searchName.toLowerCase())) {
                                        return (
                                            <TableRow key={item.fileid}>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.fileid}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.tutorname}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.nameFile}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.coursename}</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                                    <Link style={{ textDecoration: "none" }} href={`http://localhost:8081/edu/file/fileuser/${item.files}/${item.tutorid}`} target="_blank">
                                                        Tải File
                                                    </Link>
                                                </TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", color: "red" }}>Đang đợi duyệt</TableCell>
                                                <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                                    <CheckIcon sx={{ fontSize: "25px", marginRight: '15px' }} onClick={(e) => handleClickChange(e, item.fileid, 2)} />
                                                    <RemoveDoneIcon sx={{ fontSize: "25px" }} onClick={(e) => handleClickChange(e, item.fileid, 0)} />
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
                    <Pagination count={pages.length} page={page} onChange={handlePageChange} sx={{ '& .MuiPaginationItem-root': { fontSize: '15px', minWidth: '50px' } }} />
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

export default DocumentManagement;