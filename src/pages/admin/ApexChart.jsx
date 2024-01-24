import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

function ApexChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/staffsconnect/countstudentandtutor`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box id="chart" sx={{ marginTop: "30px", marginLeft: "10px" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Lượng học sinh và gia sư theo từng lớp
      </Typography>
      <BarChart width={850} height={600} data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="gia_su" fill="#F41B3F" />
        <Bar dataKey="hoc_sinh" fill="#1B08F4" />
      </BarChart>
    </Box>
  );
}

export default ApexChart;