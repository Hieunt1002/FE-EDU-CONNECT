import React, { useEffect, useState } from "react";
import './BookTutor.css';
import { Box, Grid, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { Link, useParams } from "react-router-dom";
import DiscountIcon from '@mui/icons-material/Discount';
import axios from "axios";

function BookTutorPage() {

    const [data, setData] = useState([]);

    const { tutorid } = useParams();
    const { classcourseid } = useParams();

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
                            value={data.ranks ?? 0}
                            max={5}
                            readOnly
                            emptyIcon={<StarIcon style={{ fontSize: '30px', color: '#e0e0e0' }} />}
                            icon={<StarIcon style={{ fontSize: '30px', color: '#ffc107' }} />}
                            sx={{
                                fontSize: '20px',
                                marginLeft: '5%'
                            }}
                        />
                        <Box className="button">
                            <Link to='/login'>
                                <Button
                                    variant="contained" color="success" className="register" type="submit">
                                    Đăng ký ngay
                                </Button>
                            </Link>
                            <Button href={`/viewinfomationpages/${data.tutorId}`}
                                variant="contained" color="info" className="infor">
                                Thông Tin
                            </Button>
                            <Link to='/login'>
                                <Button
                                    variant="contained" color="warning" className="try">
                                    Đăng ký học thử
                                </Button>
                            </Link>
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
                                    style={{ width: '120px', height: '180px' }}
                                    alt={item.courseName} className="courseimg" />
                                <Typography className="namebook">
                                    {item.courseName} {item.level}
                                </Typography>
                                <Box sx={{ display: 'flex' }} >
                                    <Typography className="numberpeople">
                                        <PersonIcon className="total" />
                                        {item.CountStudent}
                                    </Typography>
                                    <Link to={`/listtutor/${item.classCourseId}`}>
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
                                <Typography sx={{ fontSize: '12px', textAlign: 'center', marginTop: '5px' }}>
                                    Gia sư dạy {item.coursename} {item.classentity}
                                </Typography>
                                <img src={`http://localhost:8081/edu/file/fileuser/${item.img}/${item.tutorid}`}
                                    style={{ width: '130px', height: '180px' }}
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
                                <Typography sx={{ fontSize: '15px', textAlign: 'center', }}>
                                    {item.fullname}
                                </Typography>
                                <Button href={`/viewinfomationpages/${item.tutorid}`}
                                    variant="contained" className="button-register">
                                    Xem thông tin
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default BookTutorPage;