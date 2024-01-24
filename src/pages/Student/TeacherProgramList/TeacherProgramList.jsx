import React, { useEffect, useState } from "react";
import { Box, Typography, Link as Links } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';


function TeacherProgramList() {

    const { bookid } = useParams();
    const [data, setData] = useState([]);
    const [exercise, setExercise] = useState([]);
    const [file, setFiles] = useState([]);
    const [video, setVideo] = useState([]);
    const [classs, setClasss] = useState([]);
    const [home, setHome] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8081/course/tutorexercise?bookid=${bookid}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookid]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/exersice/findexersice?bookid=${bookid}`)
            .then((response) => {
                setExercise(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookid]);
    useEffect(() => {
        axios
            .get(`http://localhost:8081/exersice/fileexercise?bookid=${bookid}`)
            .then((response) => {
                setFiles(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookid]);
    useEffect(() => {
        axios
            .get(`http://localhost:8081/exersice/videoexercise?bookid=${bookid}`)
            .then((response) => {
                setVideo(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookid]);
    useEffect(() => {
        axios
            .get(`http://localhost:8081/exersice/classroomexercise?bookid=${bookid}`)
            .then((response) => {
                setClasss(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookid]);
    useEffect(() => {
        axios
            .get(`http://localhost:8081/exersice/homeworkexercise?bookid=${bookid}`)
            .then((response) => {
                setHome(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookid]);
    const handleLinkClick = async (fileid, event, file) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            await axios.put(
                `http://localhost:8081/exersice/fileexercise/file/${fileid}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            window.open(file, '_blank');
        } catch (error) {
            console.error(error);
        }
    };
    const handleVideoClick = async (fileid, event, file) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            await axios.put(
                `http://localhost:8081/exersice/videoexercise/video/${fileid}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            window.open(file, '_blank');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{
            height: '100%',
        }}>
            <Box sx={{ height: "130px", marginTop: "20px", borderRadius: "5px", marginLeft: "1%", marginRight: "1%", backgroundColor: "#E2D6D6" }}>
                <Typography sx={{ fontSize: "40px", marginLeft: "2%", fontFamily: "cursive", paddingBottom: "20px" }}>{data.fullname} - {data.course} {data.classname}</Typography>
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontSize: "25px", marginLeft: "2%", fontFamily: "cursive" }}>Tab chính/{data.course} {data.classname}/{data.fullname}</Typography>
                    <Typography sx={{ fontSize: "19px", marginLeft: "auto", marginRight: '2%', fontFamily: "cursive" }}>{` ${data.startdate} - ${data.enddate}`}</Typography>
                </Box>
            </Box>
            <Box sx={{ border: '1px solid #ccc', p: 2, marginLeft: "1%", marginRight: "1%", marginBottom: '50px' }} >
                {exercise.map((item, ex) => (
                    <Box sx={{ height: "100%", borderRadius: "5px", backgroundColor: "#BFBDBD", marginTop: "1%" }} key={ex}>
                        <Typography sx={{ fontSize: "35px", fontFamily: "cursive", marginLeft: "2%", paddingTop: "1%" }}>{item.title}</Typography>
                        {file.map((files, keyf) => {
                            if (files.exerciseid === item.exerciseid) {
                                return (
                                    <Box key={keyf}>
                                        {files.status === 2 ? (
                                            <>
                                                <Links href={`http://localhost:8081/edu/file/fileuser/${files.files}/${data.tutorid}`} target="_blank" sx={{ textDecoration: 'none', color: 'black' }} onClick={(event) => handleLinkClick(files.fileid, event, files.files)}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <InsertDriveFileIcon sx={{ fontSize: "25px", marginLeft: "4%" }} />
                                                        <Typography sx={{ fontSize: "25px", marginLeft: "1%" }}> {files.namefile}</Typography>
                                                        <RadioButtonUncheckedIcon sx={{ marginLeft: 'auto', marginRight: '3%' }} />
                                                    </Box>
                                                </Links>
                                            </>
                                        ) : (
                                            <>
                                                <Links href={`http://localhost:8081/edu/file/fileuser/${files.files}/${data.tutorid}`} target="_blank" sx={{ textDecoration: 'none', color: 'black' }}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <InsertDriveFileIcon sx={{ fontSize: "25px", marginLeft: "4%" }} />
                                                        <Typography sx={{ fontSize: "25px", marginLeft: "1%" }}> {files.namefile}</Typography>
                                                        <RadioButtonCheckedIcon sx={{ marginLeft: 'auto', marginRight: '3%' }} />
                                                    </Box>
                                                </Links>
                                            </>
                                        )
                                        }
                                    </Box>
                                );
                            }
                            return null;
                        })}
                        {video.map((vd, kvd) => {
                            if (vd.exerciseid === item.exerciseid) {
                                return (
                                    <Box key={kvd}>
                                        {vd.status === 2 ? (
                                            <>
                                                <Links sx={{ textDecoration: 'none', color: 'black' }} href={vd.video} target="_blank" onClick={(event) => handleVideoClick(vd.videoid, event, vd.video)}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <PersonalVideoIcon sx={{ fontSize: "25px", marginLeft: "4%" }} />
                                                        <Typography sx={{ fontSize: "25px", marginLeft: "1%" }}>{vd.namevideo}</Typography>
                                                        <RadioButtonUncheckedIcon sx={{ marginLeft: 'auto', marginRight: '3%' }} />
                                                    </Box>
                                                </Links>
                                            </>
                                        ) : (
                                            <>
                                                <Links style={{ textDecoration: 'none', color: 'black' }} href={vd.video} target="_blank">
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <PersonalVideoIcon sx={{ fontSize: "25px", marginLeft: "4%" }} />
                                                        <Typography sx={{ fontSize: "25px", marginLeft: "1%" }}> {vd.namevideo}</Typography>
                                                        <RadioButtonCheckedIcon sx={{ marginLeft: 'auto', marginRight: '3%' }} />
                                                    </Box>
                                                </Links>
                                            </>
                                        )}
                                    </Box>
                                );
                            }
                            return null;
                        })}
                        {classs.map((cl, kcl) => {
                            if (cl.exerciseid === item.exerciseid) {
                                return (
                                    <Links href={cl.link} style={{ textDecoration: 'none', color: 'black' }} target="_blank" key={kcl}>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <SchoolIcon sx={{ fontSize: "25px", marginLeft: "4%" }} />
                                            <Typography sx={{ fontSize: "25px", marginLeft: "1%" }}> {cl.nameclassroom}</Typography>
                                        </Box>
                                    </Links>
                                );
                            }
                            return null;
                        })}
                        {home.map((homew, khome) => {
                            if (homew.exerciseid === item.exerciseid) {
                                return (
                                    <Box key={khome}>
                                        <Link to={`/submitExercise/${homew.homeworkid}`} style={{ textDecoration: "none", color: "black" }}>
                                            <Box sx={{ display: "flex", alignItems: "center" }} >
                                                <HomeWorkIcon sx={{ fontSize: "25px", marginLeft: "4%" }} />
                                                <Typography sx={{ fontSize: "25px", marginLeft: "1%" }}> {homew.title}</Typography>
                                            </Box>
                                        </Link>
                                    </Box>
                                );
                            } return null;
                        })}
                    </Box>
                ))
                }
            </Box >
        </Box >
    );
}

export default TeacherProgramList;