import React from 'react';
import SLIDE from "./slide.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Box, Rating, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';


const data = [
  {
    avatar: SLIDE,
  },
  {
    avatar: SLIDE,
  },
  {
    avatar: SLIDE,
  },
  {
    avatar: SLIDE,
  },
];

function Slide() {
  return (
    <Box sx={{ height: "auto" }}>
      <Swiper
        slidesPerView={3}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        style={{ width: '100%', height: '100%' }}
      >
        {data.map(({ avatar }, index) => {
          return (
            <SwiperSlide key={index} style={{
              textAlign: 'center', fontSize: '18px', backgroundColor: '#fff'
            }}>
              <Box sx={{ backgroundColor: 'GrayText', width: '300px', borderRadius: '5%' }}>
                <Typography variant="h5" sx={{ marginBottom: '20px', width: '200px', fontFamily: 'cursive', marginLeft: 'auto', marginRight: 'auto', paddingTop: '10px' }}>Cảm ơn cô thầy rất nhiều có nhiều bài hay</Typography>
                <img src={avatar} alt={`Slide ${index}`} style={{
                  display: 'block', width: '150px', height: '150px', borderRadius: '50%',
                  marginTop: '20px', objectFit: 'cover', marginLeft: '25%'
                }} />
                <Rating
                  name="five-star-rating"
                  value={4}
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
  );
};

export default Slide;