import React, { useEffect, useState } from "react";
import './BookTutor.css';
import { Box, Grid, Snackbar, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import DiscountIcon from '@mui/icons-material/Discount';
import MuiAlert from '@mui/material/Alert';



function BookTutorSTPage() {

    const [data, setData] = useState([]);

    const { tutorid } = useParams();
    const { classcourseid } = useParams();
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

    useEffect(() => {
        axios
            .get(`http://localhost:8081/educonnect/tutor/booktutor?tutorid=${tutorid}&classcourseid=${classcourseid}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [tutorid, classcourseid]);
    const [page, setPage] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/tutorByCourse/find4TutorByCourse?CourseId=${classcourseid}`)
            .then((response) => {
                setPage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [classcourseid]);

    const [course, setCourse] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/course/findCourseByTutor?tutorid=${tutorid}`)
            .then((response) => {
                setCourse(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [tutorid]);

    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/student/viewstudent?email=" + decodedToken.id)
            .then((response) => {
                setStudent(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [decodedToken.id]);

    const studentid = student.studentid;
    const handleSubmit = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            await axios.post(
                "http://localhost:8081/book/bookcourse",
                {
                    studentId: studentid,
                    tutorId: tutorid,
                    classCourseId: classcourseid,
                },
                config
            );
            window.location.href = '/booktime/' + tutorid;
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmitTry = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.post(
                "http://localhost:8081/trylearn/booktrylearn",
                {
                    studentid: studentid,
                    tutorid: tutorid,
                    classcourseid: classcourseid,
                },
                config
            );
            showSnackbar("Đăng ký thành công bạn vui lòng đợi email duyệt từ EDU-CONNECT")
            window.location.href = '/homestudent';
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Box className="body">
            <Box className="body-tutor" >
                <Grid container spacing={1}>
                    <Grid item xs={5} >
                        <Box className="tutor-infor">
                            <img src={`http://localhost:8081/edu/file/fileuser/${data.img}/${data.tutorId}`} alt={data.fullname} className="tutor-img" />
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Box className="infortutor">
                            <Typography className="Nametutor">
                                Tên gia sư
                            </Typography>
                            <Typography className="people">
                                <PersonIcon className="number" />
                                {data.count}
                                <ShareIcon className="share" />
                                <MoreHorizIcon className="more" />
                            </Typography>
                        </Box>
                        <Typography className="name">
                            {data.fullname}
                        </Typography>
                        <Typography className="subject">
                            Môn dạy
                        </Typography>
                        <Typography className="course">
                            {data.coursename} {data.className}
                        </Typography>
                        <Typography className="price">
                            Giá
                        </Typography>
                        <Typography className="price-number">
                            {data.price ? data.price.toLocaleString('vi-VN') + 'VNĐ' : ''}
                        </Typography>
                        <Typography className="rank">
                            Rank
                        </Typography>
                        <Rating
                            name="five-star-rating"
                            value={data.ranks ?? 0}  // Provide a default value of 0 if data.ranks is undefined
                            max={5}
                            readOnly
                            emptyIcon={<StarIcon style={{ fontSize: '30px', color: '#e0e0e0' }} />}
                            icon={<StarIcon style={{ fontSize: '30px', color: '#ffc107' }} />}
                            sx={{
                                fontSize: '20px',
                                marginLeft: '5%'
                            }}
                        />
                        <Box className="button" sx={{ display: 'flex' }}>
                            <Button
                                variant="contained" color="success" className="register" type="submit" onClick={handleSubmit}>
                                Đăng ký ngay
                            </Button>
                            <Button href={`/viewinfomationpage/${data.tutorId}`}
                                variant="contained" className="infor">
                                Thông Tin
                            </Button>
                            {data.status === 0 ? (
                                <Button
                                    variant="contained" color="warning" className="try" onClick={handleSubmitTry}>
                                    Đăng ký học thử
                                </Button>
                            ) : (
                                <Typography></Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box className='bodysubject'>
                <Typography className="relsubject">
                    <span className="line" />
                    Những môn gia sư dạy
                    <span className="line" />
                </Typography>
                <Grid container spacing={1} >
                    {course.map((item, index) => (
                        <Grid item xs={3} key={index}>
                            <Box className='top4couse' style={{ position: 'relative' }}>
                                {item.discount === 0 ? (
                                    <Typography></Typography>
                                ) : (
                                    <Box sx={{
                                        display: 'flex', alignItems: 'center', position: 'absolute', top: '1px',
                                        right: '1px', backgroundColor: 'green', padding: '5px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <DiscountIcon sx={{ color: 'red', marginRight: '5px' }} />
                                        <Typography sx={{ fontWeight: 'bold' }}>{item.discount}%</Typography>
                                    </Box>
                                )}
                                <img src={`http://localhost:8081/edu/file/files/` + item.img}
                                    alt={item.courseName}
                                    style={{ width: '120px', height: '170px' }}
                                    className="courseimg" />
                                <Typography className="namebook">
                                    {item.courseName} {item.className}
                                </Typography>
                                <Box sx={{ display: 'flex', marginBottom: '20px', marginTop: '10px' }}>
                                    <Typography className="numberpeople">
                                        <PersonIcon className="total" />
                                        {item.CountStudent}
                                    </Typography>
                                    <Link to={`/listtutorst/${item.classCourseId}`}>
                                        <Button variant="contained" className="buttonchitiet">
                                            Chi tiết
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box className='bodysubject' >
                <Typography className="relsubject">
                    <span className="line" />
                    Những gia sư liên quan
                    <span className="line" />
                </Typography>
                <Grid container spacing={1}>
                    {page.map((item, index) => (
                        <Grid item xs={3} key={index}>
                            <Box className='top4couse'>
                                <Typography sx={{ fontSize: '12px', textAlign: 'center', fontFamily: 'cursive', marginTop: '5px' }}>
                                    Gia sư dạy {item.coursename} {item.classentity}
                                </Typography>
                                <img src={`http://localhost:8081/edu/file/fileuser/${item.img}/${item.tutorid}`}
                                    style={{ width: '120px', height: '170px' }}
                                    alt="subject" className="imgtutor" />
                                <Rating
                                    name="five-star-rating"
                                    value={item.ranks}
                                    max={5}
                                    readOnly
                                    emptyIcon={<StarIcon style={{ fontSize: '25px', color: '#e0e0e0' }} />}
                                    icon={<StarIcon style={{ fontSize: '25px', color: '#ffc107' }} />}
                                    sx={{

                                    }}
                                />
                                <Typography sx={{ fontSize: '15px', textAlign: 'center', fontFamily: 'cursive' }}>
                                    {item.fullname}
                                </Typography>
                                <Button
                                    variant="contained" className="button-register">
                                    Xem thông tin
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
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
    );
};

export default BookTutorSTPage;