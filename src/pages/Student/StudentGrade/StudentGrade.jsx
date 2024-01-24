import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function StudentGrade() {
    const [tutor, setTutor] = useState([]);
    const { bookid } = useParams();
    const [home, setHome] = useState([]);
    const [classroom, setClassroom] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/course/tutorexercise?bookid=${bookid}`)
            .then((response) => {
                setTutor(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookid]);
    useEffect(() => {
        axios
            .get(`http://localhost:8081/exersice/scoreexercise?bookid=${bookid}`)
            .then((response) => {
                setHome(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookid]);
    useEffect(() => {
        axios
            .get(`http://localhost:8081/exersice/scoreclassroom/${bookid}`)
            .then((response) => {
                setClassroom(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookid]);

    return (
        <Box>
            <Box sx={{ border: '1px solid #000000', marginTop: "20px", borderRadius: "5px", marginLeft: "1%", marginRight: "1%", backgroundColor: "#E2D6D6", textAlign: "center", marginBottom: "10px" }}>
                <Typography sx={{ fontSize: "40px", marginLeft: "2%", fontFamily: "cursive", paddingBottom: "20px" }}>{tutor.fullname} - {tutor.course} {tutor.classname}</Typography>
            </Box>
            <Box sx={{ marginLeft: "1%", marginRight: "1%", marginBottom: "50px" }}>
                <TableContainer>
                    <Table>
                        <TableHead >
                            <TableRow>
                                <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "25px", fontFamily: "cursive", fontWeight: "500", }}>Bài kiểm tra</TableCell>
                                <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "25px", fontFamily: "cursive", fontWeight: "500", }}>Ngày kiểm tra</TableCell>
                                <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "25px", fontFamily: "cursive", fontWeight: "500", }}>Loại</TableCell>
                                <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "25px", fontFamily: "cursive", fontWeight: "500", }}>Điểm</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {home.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "15px", fontFamily: "cursive", fontWeight: "500" }}>{item.title}</TableCell>
                                    <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "15px", fontFamily: "cursive", fontWeight: "500" }}>{item.startDate} - {item.endDate}</TableCell>
                                    <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "15px", fontFamily: "cursive", fontWeight: "500" }}>Bài tập về nhà</TableCell>
                                    <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "15px", fontFamily: "cursive", fontWeight: "500" }}>{item.score}</TableCell>
                                </TableRow>
                            ))}
                            {classroom.map((item, cl) => (
                                <TableRow key={cl}>
                                    <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "15px", fontFamily: "cursive", fontWeight: "500" }}>{item.nameclassroom}</TableCell>
                                    <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "15px", fontFamily: "cursive", fontWeight: "500" }}>{item.submitdate}</TableCell>
                                    <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "15px", fontFamily: "cursive", fontWeight: "500" }}>Kiểm tra trắc nghiệm</TableCell>
                                    <TableCell sx={{ border: "1px solid #000000", background: "#BFBDBD", fontSize: "15px", fontFamily: "cursive", fontWeight: "500" }}>{item.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default StudentGrade;