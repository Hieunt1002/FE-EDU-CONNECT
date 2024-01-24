import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Slide from "../../Guest/Home/Slide/Slide";
import AN from "../../../assests/1.jpg";
import ANN from "../../../assests/image 1.jpg";
import SubjectPage from "./ListSubject/SubjectPage";
import HOTNEW from "../../../assests/hotnew.jpg"
import EDU from "../../../assests/edu.jpg"
import FPT from "../../../assests/FPT.png"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const data2 = [
    { hotnew: HOTNEW, infor: "Thông tin chương trình học", para: "Chính thức khởi động cuộc thi Đấu trường Võ nhạc tại Đại học FPT", more: "XEM THÊM" },
    { hotnew: EDU, infor: "Thông tin chương trình học", para: "Chính thức khởi động cuộc thi Đấu trường Võ nhạc tại Đại học FPT", more: "XEM THÊM" },
    { hotnew: FPT, infor: "Thông tin chương trình học", para: "Chính thức khởi động cuộc thi Đấu trường Võ nhạc tại Đại học FPT", more: "XEM THÊM" },
]

const currentDate = new Date().toLocaleDateString();

function HomeTutor() {
    return (
        <Box>
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
            <Typography sx={{
                fontSize: "24px",
                textAlign: "center",
                marginTop: "90px"
            }}>
                <span style={{
                    display: "inline-block",
                    borderBottom: "1px solid #000000",
                    width: "30%",
                    marginBottom: "5px",
                }} />
                Những môn đã đăng ký
                <span style={{
                    display: "inline-block",
                    borderBottom: "1px solid #000000",
                    width: "30%",
                    marginBottom: "5px",
                }} />
            </Typography>
            <SubjectPage />
            <Typography sx={{
                fontSize: "24px",
                textAlign: "center",
                marginBottom: "30px",
                marginTop: "-70px"
            }}>
                <span style={{
                    display: "inline-block",
                    borderBottom: "1px solid #000000",
                    width: "30%",
                    marginBottom: "5px",
                }} />
                Tin Tức
                <span style={{
                    display: "inline-block",
                    borderBottom: "1px solid #000000",
                    width: "30%",
                    marginBottom: "5px",
                }} />
            </Typography>
            <Grid container spacing={1} sx={{ marginBottom: "30px" }}>
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
    );
}

export default HomeTutor;