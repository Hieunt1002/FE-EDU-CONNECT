
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
import { jwtDecode } from 'jwt-decode';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import styled from '@emotion/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MuiAlert from '@mui/material/Alert';


function FileTable(props) {
    const token = localStorage.getItem("token");
    const tutor = jwtDecode(token);
    const [res, setRes] = useState(props.data);
    const [file, setFile] = useState(null);
    const [fileid, setFileid] = useState('');
    const [nameFile, setNameFile] = useState('');
    const [open2, setOpen2] = useState(false);
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

    const handleOpen2 = (fileid, nameFile, file) => {
        setFile(file);
        setFileid(fileid);
        setNameFile(nameFile);
        setOpen2(true);
    }

    useEffect(() => {
        setRes(props.data)
    }, [props.data]);
    const handleDelete = async (id, event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await axios.delete(
                `http://localhost:8081/exersice/deletefile/${id}/${tutor.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            showSnackbar(response.data)
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmitFile = async (event) => {
        event.preventDefault();
        try {

            const response = await axios.put(
                "http://localhost:8081/exersice/updatefile",
                {
                    fileid: fileid,
                    nameFile: nameFile,
                    file: file,
                    tutorid: tutor.id,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
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
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    return (
        <TableContainer component={Paper} sx={{}}>
            <Table >
                <TableHead>
                    <TableRow style={{ backgroundColor: "#e2d6d6c9" }}>
                        <TableCell width={100} style={{ width: 50, fontSize: "14px" }}>ID</TableCell>
                        <TableCell style={{ minWidth: 150, fontSize: "14px", textAlign: 'center' }}>Tên File</TableCell>
                        <TableCell style={{ minWidth: 13, fontSize: "14px" }}>File</TableCell>
                        <TableCell style={{ minWidth: 130, fontSize: "14px" }}>Trạng Thái</TableCell>
                        <TableCell style={{ width: 50, fontSize: "14px" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {res.map((row) => (
                        <TableRow key={row.fileid} style={{ fontSize: "14px" }}>
                            <TableCell style={{ fontSize: "14px" }}>{row.fileid}</TableCell>
                            <TableCell style={{ fontSize: "14px", textAlign: 'center' }}>{row.namefile}</TableCell>
                            <TableCell style={{ fontSize: "14px" }}>
                                <Link href={`http://localhost:8081/edu/file/fileuser/${row.files}/${tutor.id}`} target="_blank">
                                    <InsertDriveFileIcon sx={{ fontSize: "25px", marginLeft: "4%" }} />
                                </Link>
                            </TableCell>
                            <TableCell style={{ fontSize: "14px" }}>{row.status === 3 ? 'Đợi duyệt' : row.status === 2 ? 'Đã Duyệt' : 'Đã xem'}</TableCell>
                            <TableCell style={{ fontSize: "14px" }}>
                                <Button variant="contained" color="success" sx={{ marginRight: "10px" }} onClick={() => handleOpen2(row.fileid, row.namefile, row.files)}>
                                    Sửa
                                </Button>
                                <Button variant="contained" color="error" onClick={(e) => handleDelete(row.fileid, e)}>
                                    Xoá
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal
                open={open2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ marginTop: '40px' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '15px', fontFamily: 'cursive' }}>Thêm File</Typography>
                        <TextField
                            sx={{ marginTop: '20px', marginLeft: '20px', width: '90%' }}
                            label='Tên file'
                            value={nameFile}
                            onChange={(e) => setNameFile(e.target.value)}
                            InputProps={{
                                style: {
                                    fontSize: '14px',
                                    height: '45px'
                                },
                            }}

                        />
                        <Box sx={{ marginLeft: '150px', marginTop: '10px' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                            >
                                Chọn File
                                <VisuallyHiddenInput type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </Button>
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', marginLeft: '25px' }}>{file ? file.name : ''}</Typography>
                        </Box>

                        <Box sx={{ marginTop: "30px", marginLeft: "34%", display: 'flex' }}>
                            <Button onClick={(e) => handleSubmitFile(e)} sx={{ backgroundColor: "green", color: "black", fontSize: "12px", fontWeight: "600" }}>Lưu</Button>
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
                            <Button sx={{ backgroundColor: "red", color: "black", fontSize: "12px", fontWeight: "600", marginLeft: '10px' }} onClick={() => setOpen2(false)} >Huỷ</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </TableContainer>

    );
}

export default FileTable;
