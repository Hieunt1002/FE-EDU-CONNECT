import React, { useEffect, useState } from "react";
import "./../ListSubject/Subject.css";
import { Box, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import DiscountIcon from '@mui/icons-material/Discount';
import axios from "axios";

function SubjectPage() {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:8081/course/findCourseByClass?classcourseid=" + id)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    return (
        <Box className="body">
            <Grid container spacing={2}>
                {data.map((item) => (
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
                                src={`http://localhost:8081/edu/file/files/${item.img}`}
                                alt={item.courseName}
                                style={{ width: '100px', height: '160px' }}
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
                                <Link to={`/listtutor/${item.classCourseId}`}>
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
    );
}

export default SubjectPage;