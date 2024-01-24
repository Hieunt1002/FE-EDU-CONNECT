import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import axios from 'axios';

function RadarChartMui() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/staffsconnect/radarchart`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Những môn học nỗi trội
      </Typography>
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar name="Lượng học sinh học" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default RadarChartMui;