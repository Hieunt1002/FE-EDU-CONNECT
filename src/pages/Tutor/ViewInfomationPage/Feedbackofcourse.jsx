import { Box, Grid, Typography, Rating } from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarIcon from '@mui/icons-material/Star';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { jwtDecode } from "jwt-decode";

function Feedbackofcourse() {
  const [tutor, setTutor] = useState([]);
  const { classcourseid } = useParams();
  const decodedToken = jwtDecode(localStorage.getItem('token'));
  const [course, setCourse] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/educonnect/studentviewdetailtutor?tutorid=${decodedToken.id}`)
      .then((response) => {
        setTutor(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`http://localhost:8081/educonnect/tutor/listcourse?tutorid=${decodedToken.id}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`http://localhost:8081/educonnect/feedbackofcourse/${decodedToken.id}/${classcourseid}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [decodedToken.id, classcourseid]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#E4D3A3",
          height: "250px",
          width: "100%",
          display: 'flex',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '50px', marginLeft: '300px', fontWeight: '800', fontFamily: 'cursive' }}>Gia sư</Typography>
          <Typography sx={{ fontSize: '50px', marginLeft: '350px', fontWeight: '800', fontFamily: 'cursive' }}>{tutor.fullname}</Typography>
          <Rating
            name="five-star-rating"
            value={tutor.ranks ?? 0}
            max={5}
            readOnly
            emptyIcon={<StarIcon style={{ fontSize: '50px', color: '#e0e0e0' }} />}
            icon={<StarIcon style={{ fontSize: '50px', color: '#ffc107' }} />}
            sx={{
              marginTop: '20px', marginLeft: '320px'
            }}
          />
        </Box>
        {tutor.img ? (
          <img src={`http://localhost:8081/edu/file/fileuser/${tutor.img}/${tutor.tutorid}`} alt="tutor" style={{
            width: '250px',
            height: '250px', float: 'right', marginLeft: '250px', borderRadius: '50%'
          }} />
        ) : (null)}
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Box sx={{
              backgroundColor: "#E4D3A3",
              width: "150px",
              height: "150px",
              marginTop: "15px",
              borderRadius: "10px",
              textAlign: "center",
              marginLeft: "35%"
            }}>
              <PeopleAltIcon style={{ fontSize: "60px" }} />
              <Typography sx={{ fontSize: "19px" }}>{tutor.countStudent}</Typography>
              <Typography sx={{ fontSize: "20px" }}>Học sinh theo học</Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box sx={{
              backgroundColor: "#E4D3A3",
              width: "150px",
              height: "150px",
              marginTop: "15px",
              borderRadius: "10px",
              textAlign: "center",
              marginLeft: "35%"
            }}>
              <MenuBookIcon style={{ fontSize: "60px" }} />
              <Typography sx={{ fontSize: "19px" }}>{tutor.countClasscourse}</Typography>
              <Typography sx={{ fontSize: "20px" }}>Khoá học trên trang</Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box sx={{
              backgroundColor: "#E4D3A3",
              width: "150px",
              height: "150px",
              marginTop: "15px",
              borderRadius: "10px",
              textAlign: "center",
              marginLeft: "35%"
            }}>
              <StarIcon style={{ fontSize: "60px" }} />
              <Typography sx={{ fontSize: "19px" }}>{tutor.experience}+</Typography>
              <Typography sx={{ fontSize: "20px" }}>Số năm kinh nghiệm</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{
        marginTop: "30px",
        marginBottom: '100px'
      }}>
        <Grid container spacing={1}>
          <Grid item xs={4} sx={{ marginLeft: "20%" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>Giáo viên: {tutor.fullname}</Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>Nơi công tác: EDU-CONNECT</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>Môn:</Typography>
            {course.map((cs, id) => (
              <Typography sx={{ fontSize: "17px", fontWeight: "600", marginLeft: '60px' }} key={id}>-{cs.courseName} {cs.classname}</Typography>
            ))}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "700", color: "blue" }}>Chia sẻ, cảm nhận của học sinh</Typography>
      </Box>
      <Box sx={{ marginTop: '40px', marginBottom: '80px', marginLeft: "70px" }}>
        <Box sx={{ height: "auto" }}>
          <Swiper
            slidesPerView={3}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            style={{ width: '100%', height: '100%' }}
          >
            {data.map((item, index) => {
              return (
                <SwiperSlide key={index} style={{
                  textAlign: 'center', fontSize: '18px', backgroundColor: '#fff'
                }}>
                  <Box sx={{ backgroundColor: 'GrayText', width: '300px', borderRadius: '5%' }}>
                    <Typography variant="h5" sx={{ marginBottom: '20px', width: '200px', fontFamily: 'cursive', marginLeft: 'auto', marginRight: 'auto', paddingTop: '10px' }}>{item.notes}</Typography>
                    <Typography variant="h5" sx={{ marginBottom: '20px', width: '200px', fontFamily: 'cursive', marginLeft: 'auto', marginRight: 'auto' }}>{`${item.coursename} ${item.classname}`}</Typography>
                    <img src={`http://localhost:8081/edu/file/fileuser/${item.img}/${item.studentid}`} alt={`Slide ${index}`} style={{
                      display: 'block', width: '150px', height: '150px', borderRadius: '50%',
                      marginTop: '20px', objectFit: 'cover', marginLeft: '25%'
                    }} />
                    <Typography variant="h5" sx={{ width: '200px', fontFamily: 'cursive', marginLeft: 'auto', marginRight: 'auto', paddingTop: '10px' }}>{item.fullname}</Typography>
                    <Rating
                      name="five-star-rating"
                      value={item.ranks}
                      max={5}
                      readOnly
                      emptyIcon={<StarIcon style={{ fontSize: '25px', color: '#e0e0e0' }} />}
                      icon={<StarIcon style={{ fontSize: '25px', color: '#ffc107' }} />}
                      sx={{
                        fontSize: '20px',
                        marginTop: '10px'
                      }}
                    />
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}

export default Feedbackofcourse;