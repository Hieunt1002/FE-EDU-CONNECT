import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SendIcon from "@mui/icons-material/Send";

function UpdateCalender() {
    const [data, setData] = useState([]);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const token = localStorage.getItem("token");
    const tutor = jwtDecode(token);
    const [time, setTime] = useState([]);

    useEffect(() => {
        // Fetch timeline data
        axios.get(`http://localhost:8081/book/timeline`)
            .then((response) => {
                if (response && response.data) {
                    setData(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching timeline:", error);
            });
        axios.get(`http://localhost:8081/book/lesson`)
            .then((response) => {
                if (response && response.data) {
                    setDaysOfWeek(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching lessons:", error);
            });
        axios.get(`http://localhost:8081/educonnect/listteachtime?tutorid=${tutor.id}`)
            .then((response) => {
                if (response && response.data) {
                    setTime(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching lessons:", error);
            });
    }, [tutor.id]);

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

    const isCellSelectedAndChosen = (cellIndex) => {
        const [timeId, lessonId] = cellIndex.split("-");
        return time.some((item) => item.timeId === Number(timeId) && item.lessonid === Number(lessonId));
    };
    const isCellSelected = (cellIndex) => {
        return selectedCells.includes(cellIndex);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            for (const cellIndex of selectedCells) {
                const [timeId, lessonId] = cellIndex.split('-');
                await axios.delete(
                    `http://localhost:8081/schedule/deletecalender/${timeId}/${lessonId}/${tutor.id}`,
                    config
                );
                window.location.href = '/updatecalender';
            }
        } catch (error) {
            console.error(error);
        }
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

            window.location.href = '/updatecalender';
        } catch (error) {
            console.error("Error choosing time:", error);
        }
    };

    return (
        <Box sx={{ marginBottom: "50px" }}>
            <Box>
                <Typography sx={{ fontSize: "30px", fontFamily: "cursive", fontWeight: "700", textAlign: "center", marginTop: "20px" }}>Cập nhật lịch dạy của bạn</Typography>
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
                            {data.map((item) => (
                                <TableRow key={item.timeId}>
                                    <TableCell sx={{ border: '1px solid #000000', width: '140px', height: '100px', backgroundColor: 'green', color: 'white', textAlign: 'center', fontSize: '15px', fontFamily: 'cursive' }}>{item.timeline} - {item.endtime}</TableCell>
                                    {daysOfWeek.map((day) => {
                                        const cellIndex = `${item.timeId}-${day.lessonId}`;
                                        return (
                                            <TableCell
                                                key={cellIndex}
                                                sx={{
                                                    border: "1px solid",
                                                    backgroundColor: isCellSelectedAndChosen(cellIndex) ? "#ffcc80" : isCellSelected(cellIndex) ? "#b2dfdb" : ""
                                                }}
                                                onClick={() => handleCellClick(cellIndex)}
                                            >
                                                {isCellSelectedAndChosen(cellIndex) ?
                                                    <>
                                                        <MoreVertIcon sx={{ fontSize: '20px' }} onClick={handleClick} />
                                                    </>
                                                    : null}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={(event) => handleSubmit(event)}>Hủy</MenuItem>
                </Menu>
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

export default UpdateCalender;
