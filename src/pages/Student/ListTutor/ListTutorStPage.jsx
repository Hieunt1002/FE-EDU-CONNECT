import { Box, Button, Grid, Typography, TextField, Pagination, Rating } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import React, { useCallback, useEffect, useState } from "react";
import "./ListTutor.css";
import StarIcon from '@mui/icons-material/Star';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ListTutorST() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [pages, setPages] = useState(1);
    const [pageTop, setPageTop] = useState(1);
    const [searchName, setSearchName] = useState("");

    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };


    const handleSearch = () => {
        axios
            .get(`http://localhost:8081/tutorByCourse/search?classcoursid=${id}&name=${searchName}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchData = useCallback((pageNumber) => {
        axios
            .get(`http://localhost:8081/tutorByCourse/findTutorByCourse?courseid=${id}&page=${pageNumber}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/tutorByCourse/pagetutor/${id}`)
            .then((response) => {
                setPage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    useEffect(() => {
        fetchData(pages);
    }, [pages, fetchData]);

    const handlePageChange = (event, pageNumber) => {
        setPages(pageNumber);
    };

    const [top, setTop] = useState([]);
    const fetchTop = useCallback((pageNumber) => {
        axios
            .get(`http://localhost:8081/educonnect/ListAllDecsTutor?courseid=${id}&page=${pageNumber}`)
            .then((response) => {
                setTop(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);
    useEffect(() => {
        fetchTop(pageTop);
    }, [pageTop, fetchTop]);

    const handlePageTopChange = (event, pageNumber) => {
        setPageTop(pageNumber);
    };


    const [cpage, setCpage] = useState(1);

    useEffect(() => {
        axios
            .get("http://localhost:8081/educonnect/countpage?classcourseid=" + id)
            .then((response) => {
                setCpage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    return (
        <Box sx={{
        }}>
            <Box sx={{
                marginLeft: '950px',
                marginTop: '10px',
            }}>
                <TextField
                    label="Tìm Kiếm..."
                    InputLabelProps={{
                        style: {
                            fontSize: '12px',
                            color: 'rgba(0, 0, 0, 0.54)',
                        },
                    }}
                    sx={{
                        borderRadius: '11%',
                        width: '200px',
                    }}
                    InputProps={{
                        style: {
                            fontSize: '14px',
                            height: '45px'
                        },
                    }}
                    value={searchName} onChange={handleSearchChange}
                />
                <Button variant="contained" color="primary" sx={{
                    height: '45px',
                    marginLeft: '10px',
                    fontSize: '10px',
                    borderRadius: '11%',
                }} onClick={handleSearch}>
                    Tìm Kiếm
                </Button>
            </Box>
            <Box className="tutor">
                <Grid container spacing={2}  >
                    {data.map((item, index) => (
                        <Grid item xs={12} sm={6} md={5} lg={3} key={index} sx={{ marginTop: '20px' }} >
                            <Box className='container'>
                                <Typography sx={{ fontSize: '15px', fontFamily: 'cursive' }}>Gia sư dạy</Typography>
                                <Typography sx={{ fontFamily: 'cursive', fontSize: '12px' }}>{item.coursename} {item.classentity}</Typography>
                                <img src={`http://localhost:8081/edu/file/fileuser/${item.img}/${item.tutorid}`} alt={item.fullname} style={{ width: '50%', height: '100%' }} />
                                <Typography className="nameTutor">{item.fullname}</Typography>
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
                                <Box sx={{ display: 'flex', marginTop: '20px' }} >
                                    <Typography className="inforsubject">
                                        <PersonIcon className="total" />
                                        {item.CountStudent}</Typography>
                                    <Link to={`/booktutorst/${item.tutorid}/${item.classcourseid}`}>
                                        <Button variant="contained" color="primary"
                                            sx={{
                                                height: '20px',
                                                width: '80px'
                                            }}>
                                            Chi tiết
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box >
            <Box sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={page}
                    page={pages}
                    onChange={handlePageChange}
                    sx={{ '& .MuiPaginationItem-root': { fontSize: '15px', minWidth: '50px' } }}
                />
            </Box>
            <Box>
                <Typography sx={{ marginLeft: '40px', fontSize: '20px', fontFamily: 'cursive' }}>
                    Tham khảo các khóa học nhiều lượt đăng ký và đánh giá
                </Typography>
                <Box sx={{ marginLeft: '30px', marginTop: '30px' }}>
                    <Grid container spacing={1}>
                        {top.map((items, index) => (
                            <Grid item xs={3} key={index} sx={{ marginTop: '20px' }}>
                                <Box className='containers'>
                                    <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', marginTop: '10px' }}>Gia sư dạy</Typography>
                                    <Typography sx={{ fontFamily: 'cursive', fontSize: '12px' }}>{items.coursename} {items.classentity}</Typography>
                                    <img src={`http://localhost:8081/edu/file/fileuser/${items.img}/${items.tutorid}`} alt={items.fullname} style={{ width: '50%', height: '100%' }} />
                                    <Typography className="nameTutor">{items.fullname}</Typography>
                                    <Rating
                                        name="five-star-rating"
                                        value={items.ranks}
                                        max={5}
                                        readOnly
                                        emptyIcon={<StarIcon style={{ fontSize: '25px', color: '#e0e0e0' }} />}
                                        icon={<StarIcon style={{ fontSize: '25px', color: '#ffc107' }} />}
                                        sx={{

                                        }}
                                    />
                                    <Box sx={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }} >
                                        <Typography className="inforsubject">
                                            <PersonIcon />
                                            {items.CountStudent}</Typography>
                                        <Link to={`/booktutorst/${items.tutorid}/${items.classcourseid}`}>
                                            <Button variant="contained" color="primary"
                                                sx={{
                                                    height: '20px',
                                                    width: '80px'
                                                }}>
                                                Chi tiết
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box sx={{ marginBottom: '60px', display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={cpage.length}
                        page={pageTop}
                        onChange={handlePageTopChange} sx={{ '& .MuiPaginationItem-root': { fontSize: '15px', minWidth: '50px' } }} />
                </Box>
            </Box>
        </Box>
    );
}

export default ListTutorST;