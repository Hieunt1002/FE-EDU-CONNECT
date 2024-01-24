import React, { useCallback, useEffect, useState } from "react";
import "./HomeStudent.css";
import { Box, Button, Grid, Typography } from "@mui/material";
import Slide from "../../Guest/Home/Slide/Slide";
import AN from "../../../assests/1.jpg"
import ANN from "../../../assests/image 1.jpg"
import HOTNEW from "../../../assests/hotnew.jpg"
import EDU from "../../../assests/edu.jpg"
import FPT from "../../../assests/FPT.png"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import DiscountIcon from '@mui/icons-material/Discount';

const data2 = [
    { hotnew: HOTNEW, infor: "Thông tin chương trình học", para: "Chính thức khởi động cuộc thi Đấu trường Võ nhạc tại Đại học FPT", more: "XEM THÊM" },
    { hotnew: EDU, infor: "Thông tin chương trình học", para: "Chính thức khởi động cuộc thi Đấu trường Võ nhạc tại Đại học FPT", more: "XEM THÊM" },
    { hotnew: FPT, infor: "Thông tin chương trình học", para: "Chính thức khởi động cuộc thi Đấu trường Võ nhạc tại Đại học FPT", more: "XEM THÊM" },
]

const currentDate = new Date().toLocaleDateString();

function Home() {
    const [user, setUser] = useState([]);
    const [course, setStudentData] = useState([]);
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

    const fetchStudentData = useCallback(async () => {
        try {
            const studentResponse = await axios.get(
                `http://localhost:8081/course/listcourseforstudent?classcourseid=${user.classId}&studentid=${user.studentid}`
            );
            setStudentData(studentResponse.data);
        } catch (error) {
            console.error(error);
        }
    }, [user.classId, user.studentid]);

    useEffect(() => {
        fetchUser();
    }, [userId, fetchUser]);

    useEffect(() => {
        if (user.classId && user.studentid) {
            fetchStudentData();
        }
    }, [user.classId, user.studentid, fetchStudentData]);


    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8081/educonnect/tutor/top3")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <Box sx={{ marginBottom: "80px" }}>
            <Slide />
            <Box
                sx={{
                    height: "182px",
                    display: "flex",
                }}>
                <img src={AN} alt="an" className='an' />
                <Box>
                    <Typography
                        sx={{
                            color: "#804F4F",
                            fontWeight: "800",
                            fontSize: "24px",
                            marginTop: "55px",
                            textDecoration: "underline"
                        }}
                    >
                        EDU-CONNECT
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "24px",
                            marginTop: "30px",
                        }}
                    >
                        EDU-CONNECT nhằm mục đích giúp mọi người
                        <br />đạt được trải nghiệm học tập hiệu quả nhất.
                    </Typography>
                </Box>
                <img src={ANN} alt="an" className='ann' />
            </Box>

            <Box sx={{ marginTop: "80px" }}>
                <Typography sx={{ fontSize: "20px" }} className="relsubject">
                    <span className="line" />
                    Những môn học liên quan
                    <span className="line" />
                </Typography>
                <Box className="body">
                    <Grid container spacing={2}>
                        {course.map((item) => (
                            <Grid item xs={12} sm={6} md={5} lg={3} key={item.classCourseId}>
                                <Box className="container" style={{ position: 'relative' }}>
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
                                    <img
                                        src={`http://localhost:8081/edu/file/files/` + item.img}
                                        alt={item.courseName}
                                        style={{ height: '200px', width: '150px' }}
                                        className="subject-img"
                                    />
                                    <Typography className="nameSubject">
                                        {item.courseName} {item.className}
                                    </Typography>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography className="inforsubject">
                                            <PersonIcon className="total" />
                                            {item.CountStudent}
                                        </Typography>
                                        <Link to={`/listtutorst/${item.classCourseId}`}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                    height: "20px",
                                                    width: "80px",
                                                }}
                                            >
                                                Chi tiết
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            <Box sx={{
                marginBottom: "70px",
            }}>
                <Typography sx={{ fontSize: "20px", paddingBottom: "30px" }} className="relsubject">
                    <span className="line" />
                    Gia sư nỗi bật trong tháng
                    <span className="line" />
                </Typography>

                <Grid container spacing={1}>
                    {data.map((item, index) => (
                        <Grid item xs={4} key={index}>
                            <Box className='giasu-container'>
                                <Typography className='giasutext'
                                    sx={{
                                        color: "green",
                                        fontWeight: "700",
                                        fontSize: "20px",
                                        fontFamily: "math"
                                    }}>
                                    Gia sư {index + 1}
                                </Typography>
                                <Typography className='giasu-name'
                                    sx={{
                                        color: "green",
                                        fontWeight: "800",
                                        fontSize: "20px",
                                    }}>
                                    {item.fullname}
                                </Typography>
                                <Link to={`/viewinfomationpage/${item.tutorid}`} style={{ color: 'black' }}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "20px",
                                            fontFamily: "cursive",
                                            height: "35px",
                                            width: "200px",
                                            borderRadius: "5px",
                                            position: "absolute",
                                            top: "95%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            textAlign: "center",
                                            textTransform: "uppercase",
                                            zIndex: 1
                                        }}
                                    >
                                        Thông tin
                                    </Button>
                                </Link>
                                <img src={`http://localhost:8081/edu/file/fileuser/${item.img}/${item.tutorid}`} alt="giasu" className='giasu' style={{ height: '330px' }} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box >
                <Typography sx={{ fontSize: "20px" }} className="relsubject">
                    <span className="line" />
                    Tin tức
                    <span className="line" />
                </Typography>

                <Grid container spacing={1}>
                    {data2.map((item, index) => (
                        <Grid item xs={4} key={index}>
                            <img src={item.hotnew} alt="hotnew" className='hotnew' style={{ height: "150px" }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    width: '209px',
                                    height: "170px",
                                    margin: '0 auto',
                                    backgroundColor: "#D9D9D9"
                                }}>
                                <Typography sx={{ marginBottom: 1, fontSize: "15px", marginLeft: "4%" }}>
                                    {item.infor}
                                </Typography>
                                <Typography sx={{ marginBottom: 1, fontSize: "15px", marginLeft: "4%" }}>
                                    <CalendarTodayIcon sx={{ marginRight: "4%" }} />
                                    {currentDate}
                                </Typography>
                                <Typography sx={{ marginBottom: 1, fontSize: "15px", marginLeft: "4%" }}>
                                    {item.para}
                                </Typography>
                                <Button variant="contained" color="success" sx={{ fontSize: "10px", height: "20px", width: "90px", margin: "0 auto", borderRadius: "15px" }}
                                    component="a"
                                    href="https://dnuni.fpt.edu.vn/tin-tuc/"
                                    target="_blank">
                                    {item.more}
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Home;