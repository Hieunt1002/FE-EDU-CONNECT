import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, Modal, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from "axios";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Iframe from "react-iframe";
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import MuiAlert from '@mui/material/Alert';



function SimulationManagement() {
    const [demo, setDemo] = useState([]);
    const [classid, setClassid] = useState(0);
    const [classEntity, setClassEntity] = useState([]);
    const [courseName, setCourseName] = useState(0);
    const [course, setCourse] = useState([]);
    const [data, setData] = useState([]);
    const [subject, setSubject] = useState([]);
    const [detail, setDetail] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openUd, setOpenUd] = React.useState(false);
    const [opens, setOpens] = useState(false);
    const [view, setView] = useState('');
    const [lop, setLop] = useState('');
    const [mon, setMon] = useState('');
    const [file, setFile] = useState('');
    const [mp, setMp] = useState('');
    const [name, setName] = useState('');
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

    const handleOpens = (link) => {
        setView(link)
        setOpens(true);
    }
    const handleCloses = () => setOpens(false);
    const handleOpen = () => setOpen(true);
    const handleOpenUd = (demoid) => {
        try {
            axios
                .get(`http://localhost:8081/demo/detaildemo?demoid=${demoid}`)
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
    const handleCloseUd = () => setOpenUd(false);
    const handleClose = () => setOpen(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('classid', lop);
            formData.append('coureid', mon);
            formData.append('demo', name);
            formData.append('linkDemo', mp);
            formData.append('file', file);

            const response = await axios.post(
                "http://localhost:8081/demo/adddemo",
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
    const handleSubmitUd = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('demoid', detail.demoid);
            formData.append('classid', detail.classid);
            formData.append('coureid', detail.courseid);
            formData.append('demo', detail.demo);
            formData.append('linkDemo', detail.linkdemo);
            formData.append('file', detail.img);

            const response = await axios.put(
                "http://localhost:8081/demo/updatedemo",
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
    useEffect(() => {
        axios
            .get(`http://localhost:8081/demo/listdemo?classid=${classid}&courseName=${courseName}`)
            .then((response) => {
                setDemo(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get(`http://localhost:8081/demo/listclass`)
            .then((response) => {
                setClassEntity(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get(`http://localhost:8081/demo/listcourse`)
            .then((response) => {
                setCourse(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get(`http://localhost:8081/student/class`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get(`http://localhost:8081/course/listcourse`)
            .then((response) => {
                setSubject(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [classid, courseName]);
    const handleUploadFile = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    const handleUploadFileUd = (event) => {
        setDetail({ ...detail, img: event.target.files[0] })
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
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 'calc(1.6 * (110vh - 33px))',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
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
                        Danh sách mô phỏng
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
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: "20px", textAlign: "center" }}>STT</TableCell>
                                <TableCell sx={{ fontSize: "20px", textAlign: "center" }}>
                                    <TextField
                                        select
                                        label='Lớp'
                                        fullWidth
                                        value={classid === '' ? '' : classid}
                                        InputProps={{
                                            style: {
                                                fontSize: '12px',
                                                height: '45px',
                                                width: '100px'
                                            },
                                        }}
                                        sx={{ marginLeft: '50px' }}
                                        InputLabelProps={{
                                            style: {
                                                fontSize: '12px',
                                                color: 'rgba(0, 0, 0, 0.54)',
                                            },
                                        }}
                                        onChange={(e) => setClassid(e.target.value)}
                                    >
                                        <MenuItem value={0}>Tất cả</MenuItem>
                                        {classEntity.map((item, index) => (
                                            <MenuItem key={index} value={item.classid}>{item.className}</MenuItem>
                                        ))}
                                    </TextField>

                                </TableCell>
                                <TableCell sx={{ fontSize: "20px", textAlign: "center" }}>
                                    <TextField
                                        select
                                        label='Môn'
                                        fullWidth
                                        value={courseName}
                                        InputProps={{
                                            style: {
                                                fontSize: '12px',
                                                height: '45px',
                                                width: '100px'
                                            },
                                        }}
                                        sx={{ marginLeft: '50px' }}
                                        InputLabelProps={{
                                            style: {
                                                fontSize: '12px',
                                                color: 'rgba(0, 0, 0, 0.54)',
                                            },
                                        }}
                                        onChange={(e) => setCourseName(e.target.value)}
                                    >
                                        <MenuItem value={0}>Tất cả</MenuItem>
                                        {course.map((item, index) => (
                                            <MenuItem key={index} value={item.courseid}>{item.courseName}</MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                                <TableCell sx={{ fontSize: "20px", textAlign: "center" }}>Tên mô phỏng</TableCell>
                                <TableCell sx={{ fontSize: "20px", textAlign: "center" }}>Mô phỏng</TableCell>
                                <TableCell sx={{ fontSize: "20px", textAlign: "center" }}>
                                    <AddBoxIcon sx={{ fontSize: "25px" }} onClick={handleOpen} />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(demo) ? (
                                (demo.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.demoid}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.classname}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.coursename}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.demoname}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                            <img src={`http://localhost:8081/edu/file/files/${item.img}`} alt="an" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                            <RemoveRedEyeIcon sx={{ fontSize: '25px' }} onClick={() => handleOpens(item.linkdemo)} />
                                            <BuildCircleIcon sx={{ fontSize: '25px', marginLeft: '20px' }} onClick={() => handleOpenUd(item.demoid)} />
                                        </TableCell>
                                    </TableRow>
                                )))
                            ) : (
                                <TableRow>
                                    <TableCell style={{ fontSize: "10px", fontFamily: "cursive", textAlign: "center" }} colSpan={6}>No data available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Modal
                        open={openUd}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{
                            backgroundColor: "#D9D9D9", width: "400px", height: "400px", top: '50%',
                            left: '50%', borderRadius: "10px", border: '2px solid #000000', p: 2
                        }}>
                            <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>Thêm Mô Phỏng</Typography>
                            <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                                Tên mô phỏng:
                                <TextField
                                    value={detail.demo}
                                    onChange={(e) => setDetail({ ...detail, demo: e.target.value })}
                                    InputProps={{ style: { fontSize: "14px", height: "28px" } }}
                                />
                            </Typography>
                            <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                                Lớp:
                                <TextField
                                    select
                                    value={detail.classid}
                                    onChange={(e) => setDetail({ ...detail, classid: e.target.value })}
                                    InputProps={{ style: { fontSize: '12px', height: "28px" } }}
                                    sx={{ width: '55%' }}
                                    InputLabelProps={{ style: { fontSize: '12px', color: 'rgba(0, 0, 0, 0.54)' } }}
                                >
                                    {data.map((item, index) => (
                                        <MenuItem value={item.classid} key={index}>
                                            {item.className}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Typography>
                            <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                                Môn:
                                <TextField
                                    select
                                    value={detail.courseid}
                                    onChange={(e) => setDetail({ ...detail, courseid: e.target.value })}
                                    InputProps={{ style: { fontSize: '12px', height: "28px" } }}
                                    sx={{ width: '55%' }}
                                    InputLabelProps={{ style: { height: "28px", fontSize: '12px', color: 'rgba(0, 0, 0, 0.54)' } }}
                                >
                                    {subject.map((item, index) => (
                                        <MenuItem value={item.courseid} key={index}>
                                            {item.courseName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Typography>
                            <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                                Mô phỏng:
                                <TextField
                                    value={detail.linkdemo}
                                    onChange={(e) => setDetail({ ...detail, linkdemo: e.target.value })}
                                    InputProps={{ style: { fontSize: "14px", height: "28px" } }}
                                />
                            </Typography>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ marginTop: "20px", fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                Upload ảnh mô phỏng
                                <VisuallyHiddenInput type="file" onChange={handleUploadFileUd} />
                            </Button>
                            <Box sx={{ marginTop: "20px", marginLeft: "63%" }}>
                                <Button sx={{ height: "30px", width: "20px", backgroundColor: "red", color: "white", marginRight: "5px" }} onClick={handleCloseUd}>Huỷ</Button>
                                <Button sx={{ height: "30px", width: "20px", backgroundColor: "green", color: "white" }} onClick={handleSubmitUd}>Lưu</Button>
                            </Box>
                        </Box>
                    </Modal>
                </TableContainer>
                <Modal
                    open={open}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ backgroundColor: "#D9D9D9", width: "400px", height: "400px", borderRadius: "10px", border: '2px solid #000000', p: 2 }}>
                        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>Thêm Mô Phỏng</Typography>
                        <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            Tên mô phỏng:
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                InputProps={{
                                    style: {
                                        fontSize: "14px",
                                        height: "28px",
                                    },
                                }}
                            />
                        </Typography>
                        <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            Lớp:
                            <TextField
                                select
                                value={lop}
                                onChange={(e) => setLop(e.target.value)}
                                InputProps={{
                                    style: {
                                        fontSize: '12px',
                                        height: "28px",
                                    },
                                }}
                                sx={{ width: '55%' }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: '12px',
                                        color: 'rgba(0, 0, 0, 0.54)',
                                    },
                                }}
                            >
                                {data.map((item) => (
                                    <MenuItem
                                        value={item.classid}
                                        key={item.classid}
                                    >
                                        {item.className}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Typography>
                        <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            Môn:
                            <TextField
                                select
                                value={mon}
                                onChange={(e) => setMon(e.target.value)}
                                InputProps={{
                                    style: {
                                        fontSize: '12px',
                                        height: "28px",
                                    },
                                }}
                                sx={{ width: '55%' }}
                                InputLabelProps={{
                                    style: {
                                        height: "28px",
                                        fontSize: '12px',
                                        color: 'rgba(0, 0, 0, 0.54)',
                                    },
                                }}
                            >
                                {subject.map((item) => (
                                    <MenuItem
                                        value={item.courseid}
                                        key={item.courseid}
                                    >
                                        {item.courseName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Typography>
                        <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            Mô phỏng:
                            <TextField
                                value={mp}
                                onChange={(e) => setMp(e.target.value)}
                                InputProps={{
                                    style: {
                                        fontSize: "14px",
                                        height: "28px",
                                    },
                                }}
                            />
                        </Typography>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ marginTop: "20px", fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Upload ảnh mô phỏng
                            <VisuallyHiddenInput type="file" onChange={handleUploadFile} />
                        </Button>
                        <Box sx={{ marginTop: "20px", marginLeft: "63%" }}>
                            <Button sx={{ height: "30px", width: "20px", backgroundColor: "red", color: "white", marginRight: "5px" }} onClick={handleClose}>Huỷ</Button>
                            <Button sx={{ height: "30px", width: "20px", backgroundColor: "green", color: "white" }} onClick={handleSubmit}>Lưu</Button>
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
                </Modal>
                <Modal
                    open={opens}
                    onClose={handleCloses}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Iframe src={view} styles={{
                            height: 'calc(90vh - 33px)',
                            width: 'calc(1.6 * (110vh - 33px))',
                            border: '1px solid silver',
                        }}></Iframe>
                    </Box>
                </Modal>

            </Box>
        </Box>
    );
}

export default SimulationManagement;