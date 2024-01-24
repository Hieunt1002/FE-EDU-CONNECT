
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
import { Button, Box, Typography, Pagination } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Demo() {
    const [demoList, setDemoList] = useState([]);
    const { classcourseid } = useParams();
    const [tutor, setTutor] = useState('');
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const [pages, setPages] = useState(1);
    const [page, setPage] = useState(1);
    useEffect(() => {
        axios.get(`http://localhost:8081/educonnect/viewtutorcourse?classcourseid=${classcourseid}&tutorid=${decodedToken.id}`)
            .then((response) => {
                setTutor(response.data);
            })
            .catch((error) => {
            })
        axios.get(`http://localhost:8081/demo/listdemobyclasscourse?classcourseid=${classcourseid}`)
            .then((response) => {

                setDemoList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios.get(`http://localhost:8081/demo/totalpagedemo?classcourseid=${classcourseid}`)
            .then((response) => {

                setPage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [classcourseid, decodedToken.id]);

    const handlePageChange = (event, pageNumber) => {
        setPages(pageNumber);
    };


    return (
        <Box>
            <Box sx={{ width: '98%', marginTop: "20px", borderRadius: "5px", marginLeft: "1%", marginRight: "1%", backgroundColor: "#E2D6D6" }}>
                <Typography sx={{ fontSize: "40px", marginLeft: "2%", fontFamily: "cursive", paddingBottom: "20px" }}>{tutor.coursename} {tutor.classname}</Typography>
            </Box>
            <Box sx={{ width: '98%', marginTop: "20px", borderRadius: "5px", marginLeft: "1%", marginRight: "1%", backgroundColor: "#E2D6D6" }}>
                <TableContainer component={Paper} sx={{}}>
                    <Table >
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#e2d6d6c9" }}>
                                <TableCell style={{ width: 50, fontSize: "14px" }}>ID Khóa Học</TableCell>
                                <TableCell style={{ width: 100, fontSize: "14px" }}>Lớp</TableCell>
                                <TableCell style={{ width: 100, fontSize: "14px" }}>Tên Khóa Học</TableCell>
                                <TableCell style={{ width: 100, fontSize: "14px" }}>Link</TableCell>
                                <TableCell style={{ width: 50, fontSize: "14px" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {demoList.map((row) => (
                                <TableRow key={row.demoid} style={{ fontSize: "14px" }}>
                                    <TableCell style={{ fontSize: "14px" }}>{row.classcourseid}</TableCell>
                                    <TableCell style={{ fontSize: "14px" }}>{row.coursename}-{row.classname}</TableCell>
                                    <TableCell style={{ fontSize: "14px" }}>{row.demoname}</TableCell>
                                    <TableCell style={{ fontSize: "14px" }}>
                                        <img src={`http://localhost:8081/edu/file/files/${row.img}`} style={{width : '80px'}} alt='an'/>
                                    </TableCell>
                                    <TableCell style={{ fontSize: "14px" }}>
                                        <Button type='link' variant="contained" color="success" sx={{ marginRight: "10px" }} component={Link}
                                            to={{ pathname: `/demodetail/${row.demoid}`, state: { link: row.linkdemo } }}>
                                            Xem
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                <Pagination count={page}
                    page={pages}
                    onChange={handlePageChange} sx={{ '& .MuiPaginationItem-root': { fontSize: '15px', minWidth: '50px' } }} />
            </Box>
        </Box>
    );
}

export default Demo;
