import React, { useCallback, useEffect, useState } from "react";
import { Box, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getYear, getISOWeek } from 'date-fns';


function CalendarStudent() {
    const [user, setUser] = useState([]);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [data, setData] = useState([]);
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const userId = decodedToken.id;

    const fetchUser = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:8081/student/viewstudent?email=${userId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/book/lesson`)
            .then((response) => {
                setDaysOfWeek(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/book/timeline`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const [selectedWeek, setSelectedWeek] = useState('');
    const [week, setWeek] = useState('');
    const [year, setYear] = useState('');
    const [scheduleData, setScheduleData] = useState([]);

    const fetchStudentData = useCallback(async () => {
        try {
            const studentResponse = await axios.get(
                `http://localhost:8081/schedule/studentschedule?studentid=${user.studentid}&week=${week}&year=${year}`
            );
            setScheduleData(studentResponse.data);
        } catch (error) {
            console.error(error);
        }
    }, [week, year, user.studentid]);

    useEffect(() => {
        fetchUser();
    }, [userId, fetchUser]);

    useEffect(() => {
        if (week && user.studentid && year) {
            fetchStudentData();
        }
    }, [week, year, user.studentid, fetchStudentData]);

    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentWeek = getWeekNumber(currentDate);
        setYear(currentYear.toString());
        setWeek(currentWeek.toString());
    }, []);

    const handleWeekChange = (e) => {
        setSelectedWeek(e.target.value);
        const [selectedYear, selectedWeek] = e.target.value.split('-W');
        setYear(selectedYear);
        setWeek(selectedWeek);
    };

    const getWeekNumber = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    const getCurrentWeek = () => {
        const currentDate = new Date();
        const currentWeek = getISOWeek(currentDate);
        const currentYear = getYear(currentDate);
        const formattedWeek = `${currentYear}-W${currentWeek}`;
        return formattedWeek;
    };


    return (
        <Box sx={{ marginBottom: "50px" }}>
            <Box>
                <Typography sx={{ fontSize: "20px", fontFamily: "cursive", fontWeight: "700", textAlign: "center", marginTop: "30px" }}>{user.fullname}</Typography>
                <Typography sx={{ fontSize: "20px", fontFamily: "cursive", fontWeight: "700", textAlign: "center", marginTop: "10px" }}>Mã Số Học Sinh: {user.studentid}</Typography>
            </Box>
            <Box sx={{ backgroundColor: 'gray', width: '1110px', marginLeft: 'auto', borderRadius: '20%', marginRight: 'auto', marginTop: "30px" }}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ border: '1px solid #000000', padding: '20px 45px', backgroundColor: '#71C763' }}>
                                    <TextField
                                        type="week"
                                        value={selectedWeek || getCurrentWeek()}
                                        onChange={handleWeekChange}
                                        sx={{ width: '100%' }}
                                    />
                                </TableCell>
                                {daysOfWeek.map((day, index) => (
                                    <TableCell key={index} sx={{ border: '1px solid #000000', padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#71C763' }}>{day.lessonline}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((itime, indextime) => (
                                <TableRow key={indextime}>
                                    <TableCell sx={{ border: '1px solid #000000', width: '140px', height: '100px', backgroundColor: '#71C763', color: 'white', textAlign: 'center', fontSize: '15px', fontFamily: 'cursive' }}>{itime.timeline} - {itime.endtime}</TableCell>
                                    {daysOfWeek.map((day, keydate) => {
                                        const item = scheduleData.find((data) => data.lessonline === day.lessonline && data.timeline === itime.timeline);
                                        return (
                                            <TableCell key={keydate} sx={{ border: '1px solid #000000', width: '140px', height: '100px' }}>
                                                {item && (
                                                    <Box>
                                                        {item.courses && (
                                                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', fontWeight: '800', textAlign: 'center' }}>{item.courses}</Typography>
                                                        )}
                                                        {item.fullname && (
                                                            <Typography sx={{ fontSize: '12px', fontFamily: 'cursive', fontWeight: '800', textAlign: 'center' }}>{item.fullname}</Typography>
                                                        )}
                                                        {item.linkMeet && (
                                                            <Link sx={{ fontSize: '15px', fontFamily: 'cursive', fontWeight: '200', textAlign: 'center', marginLeft: '10px', textDecoration: 'none' }} href={item.linkMeet} target="_blank" rel="noopener noreferrer">
                                                                Meet-URL
                                                            </Link>
                                                        )}
                                                    </Box>
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "30px",
                marginLeft: "10px"
            }}>
                <Typography sx={{ fontSize: '20px', fontWeight: "700", color: "red" }}>Notes:</Typography>
                <Typography sx={{ fontSize: '20px', marginLeft: "7px", color: "#5E5D5D" }}> Bạn theo dõi lịch để tham gia đầy đủ các tiết học tránh thiệt thòi cho bạn. </Typography>
            </Box>
        </Box>
    );
}

export default CalendarStudent;