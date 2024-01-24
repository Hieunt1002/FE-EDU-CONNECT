import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

function PieChartMui() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/admin/piechart`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography align="center" gutterBottom>
        Số lượng học sinh, gia sư và nhân viên
      </Typography>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
          <Tooltip formatter={(value, name, entry) => [`${name}: ${value}`, `${(value / data.reduce((a, b) => a + b.value, 0) * 100).toFixed(2)}%`]} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PieChartMui;