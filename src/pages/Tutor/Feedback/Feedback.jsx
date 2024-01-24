import React from "react";
import { Avatar, Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import Tutor from "../../../assests/tutor.png"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function FeedbackTutor() {
    return (
        <Box>
            <Box className="body-tutor">
                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <Box sx={{
                            position: "relative",
                            height: "50%",
                            paddingBottom: "70%",
                        }}>
                            <img src={Tutor} alt="an" style={{
                                position: "absolute",
                                height: "80%",
                                width: "40%",
                                left: "25%",
                                top: "10%"
                            }} />
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Box className="infortutor">
                            <Typography className="Nametutor">
                                Tên gia sư
                            </Typography>
                        </Box>
                        <Typography className="name">
                            Nguyễn Văn A
                        </Typography>
                        <Typography className="subject">
                            Môn dạy
                        </Typography>
                        <Typography className="course">
                            Toán Đại Số 10
                        </Typography>
                        <Typography className="rank">
                            Rank
                        </Typography>
                        <Rating
                            name="five-star-rating"
                            value={5}
                            max={5}
                            readOnly
                            emptyIcon={<StarIcon style={{ fontSize: '30px', color: '#e0e0e0' }} />}
                            icon={<StarIcon style={{ fontSize: '30px', color: '#ffc107' }} />}
                            sx={{
                                fontSize: '20px',
                                marginLeft: '5%'
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Typography sx={{ fontSize: "18px", fontFamily: "cursive", }}>ĐÁNH GIÁ VỀ TÔI:</Typography>
                    <Typography sx={{ fontSize: "18px", fontFamily: "cursive", marginLeft: "20px", color: "#5E5D5D" }}>(100)</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: "15px",
                    marginBottom: "50px",
                }}>
                    <Card sx={{ maxWidth: "400px", minWidth: "399px" }}>
                        <CardHeader
                            avatar={
                                <Avatar alt="An" src="an.jpg" sx={{
                                    height: "55px",
                                    width: "55px",
                                }} />
                            }
                            action={
                                <IconButton >
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={
                                <Typography variant="h5" fontSize={20}>Võ Thành An</Typography>
                            }
                            subheader={
                                <Typography variant="body2" fontSize={16}>September 14, 2023</Typography>
                            }
                        />
                        <CardContent>
                            <Typography fontSize={15}>
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                if you like.
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}

export default FeedbackTutor;