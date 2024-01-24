import React, { useState } from "react";
import { Box, Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const data = [
    { id: 1, exercise: "homework", name: "Nguyễn Văn A", timestart: "15/09/2023", timeend: "18/09/2023", time: "17/09/2023", file: "../../../assets/Vo-Thanh-An.pdf", point: "10" },
    { id: 2, exercise: "homework", name: "Nguyễn Văn A", timestart: "15/09/2023", timeend: "18/09/2023", time: "17/09/2023", file: "../../../assets/Vo-Thanh-An.pdf", point: "10" },
    { id: 3, exercise: "homework", name: "Nguyễn Văn A", timestart: "15/09/2023", timeend: "18/09/2023", time: "17/09/2023", file: "../../../assets/Vo-Thanh-An.pdf", point: "10" },
    { id: 4, exercise: "homework", name: "Nguyễn Văn A", timestart: "15/09/2023", timeend: "18/09/2023", time: "17/09/2023", file: "../../../assets/Vo-Thanh-An.pdf", point: "10" },
    { id: 5, exercise: "homework", name: "Nguyễn Văn A", timestart: "15/09/2023", timeend: "18/09/2023", time: "17/09/2023", file: "../../../assets/Vo-Thanh-An.pdf", point: "10" },
    { id: 6, exercise: "classroom", name: "Nguyễn Văn A", timestart: "15/09/2023", timeend: "18/09/2023", time: "17/09/2023", file: "../../../assets/Vo-Thanh-An.pdf", point: "10" },
    { id: 7, exercise: "classroom", name: "Nguyễn Văn A", timestart: "15/09/2023", timeend: "18/09/2023", time: "17/09/2023", file: "../../../assets/Vo-Thanh-An.pdf", point: "10" },
    { id: 8, exercise: "classroom", name: "Nguyễn Văn A", timestart: "15/09/2023", timeend: "18/09/2023", time: "17/09/2023", file: "../../../assets/Vo-Thanh-An.pdf", point: "10" },
    { id: 9, exercise: "classroom", name: "Nguyễn Văn A", timestart: "15/09/2023", timeend: "18/09/2023", time: "17/09/2023", file: "../../../assets/Vo-Thanh-An.pdf", point: "10" },
    { id: 10, exercise: "classroom", name: "Nguyễn Văn A", timestart: "15/09/2023", timeend: "18/09/2023", time: "17/09/2023", file: "../../../assets/Vo-Thanh-An.pdf", point: "10" },
]

function HomeWorkTutorList() {
    const [exerciseType, setExerciseType] = useState("homework");

    const handleHomeworkClick = () => {
        setExerciseType("homework");
    };

    const handleClassroomClick = () => {
        setExerciseType("classroom");
    };

    const filteredData = data.filter((item) => item.exercise === exerciseType);
    return (
        <Box>
            <Box sx={{
                backgroundColor: "#FFFFFF",
                marginLeft: "30px",
                marginRight: "30px",
                marginTop: "90px",
                marginBottom: "5px",
                borderRadius: "5px",
                border: '1px solid #000000', p: 2,
            }}>
                <Typography sx={{ fontSize: "25px", marginLeft: "30px" }}>Gia sư Nguyễn Văn A - Toán đại số 10</Typography>
            </Box>
            <Box sx={{
                backgroundColor: "#FFFFFF",
                marginLeft: "30px",
                marginRight: "30px",
                marginBottom: "50px",
                borderRadius: "5px",
                border: '1px solid #000000', p: 2,
            }}>
                <Box sx={{ marginLeft: "80%" }}>
                    <Button
                        variant={exerciseType === "homework" ? "contained" : "outlined"}
                        onClick={handleHomeworkClick}
                    >
                        Homework
                    </Button>
                    <Button
                        variant={exerciseType === "classroom" ? "contained" : "outlined"}
                        onClick={handleClassroomClick}
                    >
                        Classroom
                    </Button>
                </Box>
                <Box sx={{ marginTop: "10px" }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, textAlign: "center" }}>STT</TableCell>
                                    <TableCell sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, textAlign: "center" }}>Bài tập</TableCell>
                                    <TableCell sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, textAlign: "center" }}>Tên học sinh</TableCell>
                                    <TableCell sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, textAlign: "center" }}>Thời gian bắt đầu </TableCell>
                                    <TableCell sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, textAlign: "center" }}>Thời gian kết thúc</TableCell>
                                    <TableCell sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, textAlign: "center" }}>Thời gian nộp bài</TableCell>
                                    <TableCell sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, textAlign: "center" }}>File nộp bài</TableCell>
                                    <TableCell sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, textAlign: "center" }}>Điểm</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, }}>{item.id}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, }}>{item.exercise}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, }}>{item.name}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, }}>{item.timestart}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, }}>{item.timeend}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, }}>{item.time}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, }}>{item.file ? (
                                            <Link sx={{ textDecoration: "none" }} href={item.file} target="_blank" rel="noopener noreferrer">
                                                Tải File
                                            </Link>
                                        ) : (
                                            "No file available"
                                        )}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", backgroundColor: '#D9D9D9', border: '1px solid #000000', p: 2, }}>{item.point}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
}

export default HomeWorkTutorList;