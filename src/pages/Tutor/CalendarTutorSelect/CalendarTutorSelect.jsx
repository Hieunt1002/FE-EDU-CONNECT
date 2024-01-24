import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function CalendarTutorSelect() {
    const [data, setData] = useState([]);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const token = localStorage.getItem("token");
    const tutor = jwtDecode(token);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8081/book/timeline`)
            .then((response) => {
                if (response && response.data) {
                    setData(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching timeline:", error);
            });

        axios
            .get(`http://localhost:8081/book/lesson`)
            .then((response) => {
                if (response && response.data) {
                    setDaysOfWeek(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching lessons:", error);
            });
    },);

    const handleCellClick = (cellIndex) => {
        const isSelected = selectedCells.includes(cellIndex);

        if (isSelected) {
            const updatedCells = selectedCells.filter((index) => index !== cellIndex);
            setSelectedCells(updatedCells);
        } else {
            const updatedCells = [...selectedCells, cellIndex];
            setSelectedCells(updatedCells);
        }
    };

    const isCellSelected = (cellIndex) => {
        return selectedCells.includes(cellIndex);
    };

    const handleChoice = async (event) => {
        event.preventDefault();

        if (selectedCells.length === 0) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            for (const cellIndex of selectedCells) {
                const [timeId, lessonId] = cellIndex.split('-');
                const postData = {
                    tutorid: tutor.id,
                    lessonid: lessonId,
                    timeid: timeId,
                };

                await axios.post(
                    "http://localhost:8081/educonnect/choicetime",
                    postData,
                    config
                );
            }

            // Use React Router for navigation
            navigate("/hometutor");
        } catch (error) {
            console.error("Error choosing time:", error);
        }
    };

    return (
        <Box sx={{ marginBottom: "50px" }}>
            <Box>
                <Typography sx={{ fontSize: "30px", fontFamily: "cursive", fontWeight: "700", textAlign: "center", marginTop: "100px" }}>Chọn lịch dạy</Typography>
            </Box>
            <Box sx={{ backgroundColor: 'gray', width: '980px', marginLeft: 'auto', borderRadius: '20%', marginRight: 'auto', marginTop: "30px" }}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: '20px 45px', backgroundColor: 'green' }}></TableCell>
                                {daysOfWeek.map((day, index) => (
                                    <TableCell key={index} sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: 'green' }}>{day.lessonline}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: '1px solid #000000', width: '140px', height: '100px', backgroundColor: 'green', color: 'white', textAlign: 'center', fontSize: '15px', fontFamily: 'cursive' }}>{item.timeline} - {item.endtime}</TableCell>
                                    {daysOfWeek.map((day) => {
                                        const choice = `${item.timeId}-${day.lessonId}`;
                                        return (
                                            <TableCell key={day.lessonId} sx={{ border: '1px solid #000000', width: '140px', height: '100px', backgroundColor: isCellSelected(choice) ? '#71C763' : '#ffffff' }} checked={selectedCells.includes(choice)} onClick={() => handleCellClick(choice)}></TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: "space-around"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "70px",
                }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: "700", color: "red" }}>Notes:</Typography>
                    <Typography sx={{ fontSize: '20px', marginLeft: "7px", color: "#5E5D5D" }}> Chọn lịch dạy phù hợp của bạn</Typography>
                </Box>
                <Box sx={{ marginTop: "70px" }}>
                    <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={handleChoice}> Nộp Lịch</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CalendarTutorSelect;
