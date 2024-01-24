
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Link, Modal, Snackbar, TextField, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MuiAlert from '@mui/material/Alert';


function ProgesstestTable(props) {
    const [open3, setOpen3] = useState(false);
    const [res, setRes] = useState(props.data);
    const [progess, setProgess] = useState('');
    const [link, setLink] = useState('');
    const [classroom, setClassroom] = useState('');
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

    const handleOpen3 = (classroomid, link, progess) => {
        setProgess(progess);
        setLink(link);
        setClassroom(classroomid);
        setOpen3(true);
    }

    useEffect(() => {
        setRes(props.data)
    }, [props.data]);
    const handleDelete = async (id, event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.delete(
                `http://localhost:8081/exersice/deleteclassroom/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            showSnackbar(response.data.message)
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await axios.put(
                "http://localhost:8081/exersice/updateclassroom",
                {
                    classroomid: classroom,
                    nameclassroom: progess,
                    link: link,
                },
                config
            );
            showSnackbar(response.data.message)
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
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
        paddingTop: '20px',
        borderRadius: '10px'
    };
    return (
        <TableContainer component={Paper} sx={{}}>
            <Table >
                <TableHead>
                    <TableRow style={{ backgroundColor: "#e2d6d6c9" }}>
                        <TableCell width={100} style={{ width: 50, fontSize: "14px" }}>ID</TableCell>
                        <TableCell style={{ minWidth: 150, fontSize: "14px", textAlign: 'center' }}>Tên Bài tập</TableCell>
                        <TableCell style={{ minWidth: 30, fontSize: "14px" }}>Bài tập</TableCell>
                        <TableCell style={{ minWidth: 30, fontSize: "14px", textAlign: 'center' }}>Ngày làm</TableCell>
                        <TableCell style={{ width: 50, fontSize: "14px" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {res.map((row) => (
                        <TableRow key={row.classroomid} style={{ fontSize: "14px" }}>
                            <TableCell style={{ fontSize: "14px" }}>{row.classroomid}</TableCell>
                            <TableCell style={{ fontSize: "14px", textAlign: 'center' }}>{row.nameclassroom}</TableCell>
                            <TableCell style={{ fontSize: "14px" }}>
                                <Link href={row.link} target="_blank">
                                    <SchoolIcon sx={{ fontSize: "25px", marginLeft: "4%" }} />
                                </Link>
                            </TableCell>
                            <TableCell style={{ fontSize: "14px", textAlign: 'center' }}>{row.submitdate}</TableCell>
                            <TableCell style={{ fontSize: "14px" }}>
                                <Button variant="contained" color="success" sx={{ marginRight: "10px" }} onClick={() => handleOpen3(row.classroomid, row.link, row.nameclassroom)}>
                                    Sửa
                                </Button>
                                <Button variant="contained" color="error" onClick={(e) => handleDelete(row.classroomid, e)}>
                                    Xoá
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal
                open={open3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ marginTop: '40px' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '15px', fontFamily: 'cursive' }}>Cập nhật bài kiểm tra</Typography>
                        <TextField
                            sx={{ marginTop: '20px', marginLeft: '26%' }}
                            label='Bài Trắc nghiệm'
                            value={progess}
                            onChange={(e) => setProgess(e.target.value)}
                            InputProps={{
                                style: {
                                    fontSize: '14px',
                                    height: '45px'
                                },
                            }}

                        />
                        <TextField
                            sx={{ marginTop: '20px', marginLeft: '26%' }}
                            label='Link bài kiểm tra'
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            InputProps={{
                                style: {
                                    fontSize: '14px',
                                    height: '45px'
                                },
                            }}
                        />

                        <Box sx={{ marginTop: "30px", marginLeft: "34%", display: 'flex' }}>
                            <Button onClick={(e) => handleSubmit(e)} sx={{ backgroundColor: "green", color: "black", fontSize: "12px", fontWeight: "600" }} >Lưu</Button>
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
                            <Button sx={{ backgroundColor: "red", color: "black", fontSize: "12px", fontWeight: "600", marginLeft: '10px' }} onClick={() => setOpen3(false)} >Huỷ</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </TableContainer>

    );
}

export default ProgesstestTable;
