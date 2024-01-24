import { Grid, Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Modal, Link } from "@mui/material";
import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { useParams } from "react-router-dom";
import Iframe from "react-iframe";
import styled from "@emotion/styled";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { jwtDecode } from "jwt-decode";

function SubmitExercise() {

    const [files, setFiles] = useState(null);
    const { bookid } = useParams();
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const userId = decodedToken.id;

    useEffect(() => {
        axios
            .get(`http://localhost:8081/exersice/homework/detailhomework?homeworkid=${bookid}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookid]);

    const handleUploadFile = (event) => {
        const selectedFile = event.target.files[0];
        setFiles(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('homeworkid', bookid);
            formData.append('studentid', userId);
            formData.append('file', files);

            await axios.post(
                "http://localhost:8081/exersice/addsubmithomework",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            window.location.href = '/submitExercise/' + bookid;
        } catch (error) {
            console.error(error);
        }
    };
    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('homeworkid', bookid);
            formData.append('studentid', userId);
            formData.append('file', files);

            await axios.put(
                "http://localhost:8081/exersice/updatesubmit",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            window.location.href = '/submitExercise/' + bookid;
        } catch (error) {
            console.error(error);
        }
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

    const allLayout = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center',

    };

    const insideLayout = {
        width: '100%',
        border: '1px solid',
        padding: '10px',
        boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.2)',
        minHeight: '0px'
    };

    const content = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50px',
        width: '100%'
    };

    const gridStyle = {
        width: '100% !important',
        // display: 'flex',
        // flexDirection: 'column',
    };

    const fontSizeHeader = {
        fontSize: '16px',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
        width: '30%',
        minWidth: '50px'
    };
    const fontSizeBodyTable = {
        fontSize: '16px',
        borderBottom: '1px solid black',
        width: '90%',
        minWidth: '50px'
    };
    const buttonStyle = {
        fontSize: '12px',
        fontFamily: 'cursive',
    };
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
        <Box id="container" style={allLayout} >
            <Box id="header" style={{ ...insideLayout, height: '100px', minHeight: '0px' }}>
                <Typography variant="h4" >{`Gia Sư ${data.fullname} - ${data.courseName} ${data.classname}`}</Typography>
                <Box sx={{ marginTop: "20px" }}>
                    <Typography variant="h5" style={{ display: 'inline-block' }} >Ngày tham gia:</Typography>
                    <Typography variant="h5" style={{ display: 'inline-block', marginLeft: '5px' }} >{` ${data.startdateb} - ${data.enddateb}`}</Typography>
                </Box>

            </Box>
            <Box id="body" style={{ ...insideLayout, marginTop: '20px' }}>
                <Box id="contenBody" style={content} >
                    <Box id="contenHeader" style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px' }}>
                        <Box id="">
                            <Box id="" style={{ float: 'left' }}>
                                <Typography variant="h4" >{`Bài Thực Hành   ${data.titleHomework}`}</Typography>
                            </Box>
                            {data.filesDemo === null ? (
                                null
                            ) : (
                                <Box id="" style={{ float: 'right' }}>
                                    <Button variant="contained" style={buttonStyle} onClick={handleOpen}>
                                        Xem mô phỏng
                                    </Button>
                                </Box>
                            )}
                        </Box>
                        <Box id="" style={{ marginBottom: '10px' }}>
                            <Box>
                                <Typography id="txtFromDate" variant="h5" style={{ display: "inline-block", marginRight: "8px" }} >Từ Ngày</Typography>
                                <Typography id="dataFromDate" variant="h5" style={{ display: "inline-block", marginLeft: "5px" }} >: {`${data.startdate} `}</Typography>
                            </Box>
                            <Box>
                                <Typography id="txtToDate" variant="h5" style={{ display: "inline-block" }} >Đến Ngày</Typography>
                                <Typography id="dataToDate" variant="h5" style={{ display: "inline-block", marginLeft: "5px" }} >: {`${data.enddate} `}</Typography>
                            </Box>
                        </Box>

                        <Box style={{ float: 'left', marginTop: '10px' }}>
                            <Link href={`http://localhost:8081/edu/file/fileuser/${data.filesHomework}/${data.tutorid}`} target="_blank">

                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="label"
                                    startIcon={<CloudDownloadIcon />}
                                >
                                    Tải File
                                </Button>
                            </Link>
                        </Box>

                    </Box>
                    <Box id="contenFooter" style={gridStyle} sx={{ marginTop: '40px' }}>
                        <Grid id="grid" container spacing={2} style={{ marginBottom: '10px', overflowX: 'auto', width: '100%', display: 'inline-block', marginLeft: '0px' }}>
                            <Grid id="gridContent" item xs={9} style={{ width: '100% !important', maxWidth: '100% ', padding: '0px' }}>
                                <TableContainer style={{ border: '1px solid', borderRadius: '20px', width: '100% !important', overflowX: 'auto' }}>
                                    <Table >
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={fontSizeHeader}>Ngày nộp bài</TableCell>
                                                {data.submitdate === null ? (
                                                    <TableCell style={fontSizeBodyTable}></TableCell>
                                                ) : (
                                                    <TableCell style={fontSizeBodyTable}>{formattedDate}</TableCell>
                                                )}
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ fontSize: '16px', width: '160px', minWidth: '50px', borderRight: '1px solid black' }} >Nộp bài</TableCell>
                                                {data.fileSubmid === null ? (
                                                    <TableCell >
                                                        {files ? (
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ fontSize: "15px" }}>Selected File:</Typography>
                                                                <Typography sx={{ fontSize: "15px", marginLeft: '2%' }}>{files.name}</Typography>
                                                            </Box>
                                                        ) : (
                                                            <Typography>No file selected</Typography>
                                                        )}
                                                    </TableCell>
                                                ) : (
                                                    <TableCell>
                                                        {files ? (
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ fontSize: "15px" }}>Selected File:</Typography>
                                                                <Typography sx={{ fontSize: "15px", marginLeft: '2%' }}>{files.name}</Typography>
                                                            </Box>
                                                        ) : (

                                                            <Link href={`http://localhost:8081/edu/file/fileuser/${data.fileSubmid}/${userId}`} target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
                                                                <Typography sx={{ fontSize: '15px' }}>{data.fileSubmid}</Typography>
                                                            </Link>
                                                        )}
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                        <Box>
                            {data.enddate > formattedDate ? (
                                <Box style={{ float: 'right', marginRight: '40px', marginTop: '40px' }}>
                                    {data.fileSubmid === null ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component="label"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Chọn File
                                            <VisuallyHiddenInput type="file" onChange={handleUploadFile} />
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component="label"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Update File
                                            <VisuallyHiddenInput type="file" onChange={handleUploadFile} />
                                        </Button>
                                    )}
                                    {data.fileSubmid === null ? (
                                        <Button variant="contained" style={buttonStyle} sx={{ marginLeft: '30px' }} onClick={handleSubmit}>
                                            Nộp Bài
                                        </Button>
                                    ) : (
                                        <Button variant="contained" style={buttonStyle} sx={{ marginLeft: '30px' }} onClick={handleUpdateSubmit}>
                                            Nộp Bài
                                        </Button>
                                    )}
                                </Box>
                            ) : (
                                <Typography></Typography>
                            )}
                        </Box>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Iframe src={data.filesDemo} styles={{
                                    height: 'calc(90vh - 33px)',
                                    width: 'calc(1.6 * (110vh - 33px))',
                                    border: '1px solid silver',
                                }}></Iframe>
                            </Box>
                        </Modal>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}
export default SubmitExercise;
