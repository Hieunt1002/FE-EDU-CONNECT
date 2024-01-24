import React, { useCallback, useEffect, useState } from "react";
import { Alert, Box, Button, Link, Menu, MenuItem, Modal, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { format, getISOWeek, getYear } from "date-fns";

function CalendarTutor() {

    const [user, setUser] = useState([]);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [data, setData] = useState([]);
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const userId = decodedToken.id;
    const [open4, setOpen4] = useState(false);
    const handleOpen4 = () => setOpen4(true);
    const handleClose4 = () => setOpen4(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [book, setBookid] = useState(0);
    const [course, setCourse] = useState("");
    const [schedules, setSchedules] = useState("");
    const [timeline, setTimeline] = useState("");
    const [lesson, setLesson] = useState("");

    const handleLinkClick = (date, bookid, course, timeline, lessonline, event) => {
        event.preventDefault();
        event.stopPropagation();
        setSchedules(date);
        setBookid(bookid);
        setCourse(course);
        setTimeline(timeline);
        setLesson(lessonline);
        setOpen4(true)
    };

    const shouldDisplayUpdateButton = (date) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
        const currentDay = String(currentDate.getDate()).padStart(2, '0');
        const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`;
        return formattedCurrentDate < date;
    };

    const fetchUser = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:8081/educonnect/viewTutor?tutorId=${userId}`,
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
        fetchUser();
    }, [userId, fetchUser]);

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
                `http://localhost:8081/schedule/studentscheduletutor?tutorid=${userId}&week=${week}&year=${year}`
            );
            setScheduleData(studentResponse.data);
        } catch (error) {
            console.error(error);
        }
    }, [week, year, userId]);

    useEffect(() => {
        if (week && userId && year) {
            fetchStudentData();
        }
    }, [week, year, userId, fetchStudentData]);

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
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [date, setDate] = useState('');
    const [times, setTimes] = useState('');

    const handleDateChange = (newDate) => {
        if (newDate.isBefore(dayjs(), 'day')) {
            console.log('Selected date is before today!');
        } else {
            setDate(newDate);
        }
    };

    const handleSubmitTry = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (date && !dayjs(date).isBefore(dayjs(), 'day')) {
            try {
                const formattedDate = format(new Date(date), 'yyyy-MM-dd');
                await axios.post(
                    "http://localhost:8081/schedule/changecalender",
                    {
                        bookid: book,
                        datechange: schedules,
                        timeid: times,  
                        subject: course,
                        nametutor: user.fullname,
                        time: timeline,
                        lesson: lesson,
                        date: formattedDate,  
                    },
                    config
                );
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        } else {
            // Invalid date, show an error message
            setErrorMessage('Selected date is before or equal to today.');
            setOpenSnackbar(true);
        }

    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };


    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        paddingTop: '20px'
    };

    const StyledDatePicker = styled(DatePicker)({
        fontSize: '14px',
        height: '45px',
    });

    const getCurrentWeek = () => {
        const currentDate = new Date();
        const currentWeek = getISOWeek(currentDate);
        const currentYear = getYear(currentDate);
        const formattedWeek = `${currentYear}-W${currentWeek}`;
        return formattedWeek;
    };

    return (
        <Box sx={{
            marginBottom: "50px"
        }}>
            <Box>
                <Typography sx={{ fontSize: "20px", fontFamily: "cursive", fontWeight: "700", textAlign: "center", marginTop: "30px" }}>{user.fullname}</Typography>
                <Typography sx={{ fontSize: "20px", fontFamily: "cursive", fontWeight: "700", textAlign: "center", marginTop: "10px" }}>Mã Số Gia Sư: {userId}</Typography>
            </Box>
            <Box sx={{ backgroundColor: 'gray', width: '1110px', marginLeft: 'auto', borderRadius: '20%', marginRight: 'auto', marginTop: "30px" }}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: '20px 45px', backgroundColor: '#71C763' }}>\
                                    <TextField
                                        type="week"
                                        value={selectedWeek || getCurrentWeek()}
                                        onChange={handleWeekChange}
                                        sx={{ width: '100%' }}
                                    /></TableCell>
                                {daysOfWeek.map((day, index) => (
                                    <TableCell key={index} sx={{ padding: '20px 40px', fontSize: '15px', fontFamily: 'cursive', backgroundColor: '#71C763' }}>{day.lessonline}</TableCell>
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
                                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            {item.courses && (
                                                                <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', fontWeight: '800', textAlign: 'center', marginRight: '10px' }}>
                                                                    {item.courses}
                                                                </Typography>
                                                            )}
                                                            {shouldDisplayUpdateButton(item.scheduled_Date) && item.datechange === null && item.datelearn === null && (
                                                                <MoreVertIcon sx={{ fontSize: '15px' }} onClick={(event) => {
                                                                    handleLinkClick(item.scheduled_Date, item.bookid, item.courses, item.timeline, item.lessonline, event);
                                                                }} />
                                                            )}
                                                        </Box>
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
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleOpen4}>Nghỉ học</MenuItem>
                </Menu>
                <Modal
                    open={open4}
                    onClose={handleClose4}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <form onSubmit={handleSubmitTry}>
                        <Box sx={styles}>
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center', marginTop: '20px' }}>Thay đổi lịch học</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StyledDatePicker
                                    label="Chọn ngày"
                                    value={date}
                                    onChange={handleDateChange}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '12px',
                                            color: 'rgba(0, 0, 0, 0.54)',
                                        },
                                    }}
                                    sx={{
                                        fontSize: '14px',
                                        height: '28px',
                                        width: '202px',
                                        marginLeft: '25%',
                                        marginTop: '15px',
                                    }}
                                />
                            </LocalizationProvider>
                            <TextField
                                select
                                label="Chọn giờ"
                                value={times}
                                onChange={(e) => setTimes(e.target.value)}
                                sx={{
                                    fontSize: "14px",
                                    height: "28px",
                                    width: "202px",
                                    marginLeft: '25%',
                                    marginTop: '40px'
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: '12px',
                                        color: 'rgba(0, 0, 0, 0.54)',
                                    },
                                }}
                            >
                                {data.map((item, index) => (
                                    <MenuItem key={index} value={item.timeId}>{item.timeline}</MenuItem>
                                ))}
                            </TextField>
                            <Button type="submit" variant="contained" style={{ width: '50px', fontSize: '12px', marginTop: '30px', marginLeft: '40%' }}>Lưu</Button>
                            <Snackbar
                                open={openSnackbar}
                                autoHideDuration={6000}
                                onClose={handleCloseSnackbar}
                            >
                                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                                    {errorMessage}
                                </Alert>
                            </Snackbar>
                        </Box>
                    </form>
                </Modal>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "70px",
                marginLeft: '20px'
            }}>
                <Typography sx={{ fontSize: '20px', fontWeight: "700", color: "red" }}>Notes:</Typography>
                <Typography sx={{ fontSize: '20px', marginLeft: "7px", color: "#5E5D5D" }}> Bạn theo dõi lịch dạy để tham gia dạy học cho học sinh.</Typography>
            </Box>
        </Box>
    );
}

export default CalendarTutor;