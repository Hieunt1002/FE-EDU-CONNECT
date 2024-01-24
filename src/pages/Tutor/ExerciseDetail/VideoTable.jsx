
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
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import MuiAlert from '@mui/material/Alert';


function VideoTable(props) {
    const [open3, setOpen3] = useState(false);
    const [res, setRes] = useState(props.data);
    const [videoid, setVideoid] = useState('');
    const [namevideo, setNamevideo] = useState('');
    const [video, setVideo] = useState('');
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

    const handleOpen3 = (videoid, namevideo, video) => {
        setVideoid(videoid);
        setNamevideo(namevideo);
        setVideo(video);
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
                `http://localhost:8081/exersice/deletevideo/${id}`,
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
                "http://localhost:8081/exersice/updatevideo",
                {
                    videoid: videoid,
                    namevideo: namevideo,
                    video: video,
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
                        <TableCell style={{ minWidth: 150, fontSize: "14px", textAlign: 'center' }}>Tên Video</TableCell>
                        <TableCell style={{ minWidth: 30, fontSize: "14px" }}>Link Video</TableCell>
                        <TableCell style={{ minWidth: 130, fontSize: "14px" }}>Trạng Thái</TableCell>
                        <TableCell style={{ width: 50, fontSize: "14px" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {res.map((row) => (
                        <TableRow key={row.videoid} style={{ fontSize: "14px" }}>
                            <TableCell style={{ fontSize: "14px" }}>{row.videoid}</TableCell>
                            <TableCell style={{ fontSize: "14px", textAlign: 'center' }}>{row.namevideo}</TableCell>
                            <TableCell style={{ fontSize: "14px" }}>
                                <Link href={row.video} target="_blank">
                                    <PersonalVideoIcon sx={{ fontSize: "25px", marginLeft: "4%" }} />
                                </Link>
                            </TableCell>
                            <TableCell style={{ fontSize: "14px" }}>{row.status === 2 ? 'Chưa xem' : 'Đã xem'}</TableCell>
                            <TableCell style={{ fontSize: "14px" }}>
                                <Button variant="contained" color="success" sx={{ marginRight: "10px" }} onClick={() => handleOpen3(row.videoid, row.namevideo, row.video)}>
                                    Sửa
                                </Button>
                                <Button variant="contained" color="error" onClick={(e) => handleDelete(row.videoid, e)}>
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
                        <Typography sx={{ textAlign: 'center', fontSize: '15px', fontFamily: 'cursive' }}>Cập nhật Video</Typography>
                        <TextField
                            sx={{ marginTop: '20px', marginLeft: '26%' }}
                            label='Tên video'
                            value={namevideo}
                            onChange={(e) => setNamevideo(e.target.value)}
                            InputProps={{
                                style: {
                                    fontSize: '14px',
                                    height: '45px'
                                },
                            }}

                        />
                        <TextField
                            sx={{ marginTop: '20px', marginLeft: '26%' }}
                            label='Link video'
                            value={video}
                            onChange={(e) => setVideo(e.target.value)}
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

export default VideoTable;
