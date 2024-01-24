import "./Slide.css";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Box, Typography } from "@mui/material";
import axios from "axios";


function Slide() {

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/discount/listdiscounts`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box sx={{ height: "auto" }}>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index} className="slider">
              <Box className="client__avatar" sx={{ marginLeft: '20%' }}>
                <Typography sx={{
                  position: 'absolute', left: '10%', width: '500px',
                  top: '10%', fontFamily: 'serif', color: 'black', fontWeight: '800', fontSize: '20px'
                }}>
                  {item.desciption}</Typography>
                <img src={`http://localhost:8081/edu/file/files/` + item.img} alt={`Slide ${index}`} />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Slide;