import React, { useEffect, useState } from "react";
import './../ListSubject/Subject.css';
import { Box, Grid, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function SubjectPage() {

    const [data, setData] = useState([]);
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const userId = decodedToken.id;
    useEffect(() => {
        axios
            .get(`http://localhost:8081/educonnect/tutor/course?tutorid=${userId}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    return (
        <Box className="body">
            <Grid container spacing={2}>
                {data.map((item) => (
                    <Grid item xs={12} sm={6} md={5} lg={3} key={item.classcourseid}>
                        <Box className='container'>
                            <img src={`http://localhost:8081/edu/file/files/` + item.img} alt={item.courseName} className="subject-img" />
                            <Typography className="nameSubject">{item.courseName} {item.class}</Typography>
                            <Box sx={{ display: 'flex' }} >
                                <Typography className="inforsubject">
                                    <PersonIcon className="total" />
                                    {item.count_student}</Typography>
                                <Link to={`/viewinfomationpagett/${item.classcourseid}`}>
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
    );
}

export default SubjectPage;