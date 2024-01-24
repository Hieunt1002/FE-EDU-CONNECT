import { Box, Grid, Typography } from "@mui/material";
import MovingIcon from '@mui/icons-material/Moving';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './DateCalendar.css';
import ApexChart from "./ApexChart";
import PieChartMui from "./PieChart";
import RadarChartMui from "./RadarChart";
import { useEffect, useState } from "react";
import axios from "axios";



function Admin() {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState('');
  const [lmonth, setLmonth] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8081/staffsconnect/staffstatisticsyear`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`http://localhost:8081/admin/adminstatisticscurrentmonth`)
      .then((response) => {
        setMonth(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`http://localhost:8081/admin/adminstatisticspreviousmonth`)
      .then((response) => {
        setLmonth(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formattedData = data.map((item) => ({
    name: item.Month,
    Tổng_Tiền: item.totalamount,
    Thanh_Toán: item.payfortutor,
    Tiền_Lời: item.profit,
  }));
  const denominator = lmonth.TotalRevenue === 0 ? 1 : lmonth.TotalRevenue;
  const percentageChange = Math.min(Math.max(((month.TotalRevenue - lmonth.TotalRevenue) / denominator) * 100, 0), 100) + '%';
  return (
    <Box>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Box sx={{ marginTop: '20px', backgroundColor: 'gold', marginLeft: '10px', height: '80px', width: '300px', borderRadius: '5px' }}>
              <Typography variant="h5" sx={{ textAlign: 'center', paddingTop: '10px', fontFamily: 'cursive' }}>Số lượng học sinh</Typography>
              <Box sx={{ display: 'flex', paddingTop: '10px', justifyContent: 'center' }}>
                <Typography variant="h4">{month.TotalStudents}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    paddingTop: '3px',
                    marginLeft: "10px",
                    backgroundColor: month.TotalStudents > lmonth.TotalStudents ? "#1151F8" : "red",
                    borderRadius: "10px"
                  }}
                >
                  <Typography sx={{ fontSize: "15px", marginLeft: "5px" }}>
                    {lmonth.TotalStudents !== 0
                      ? (((month.TotalStudents - lmonth.TotalStudents) / Math.abs(lmonth.TotalStudents)) * 10).toFixed(2)
                      : 0
                    }%
                  </Typography>
                  {month.TotalStudents > lmonth.TotalStudents ? (
                    <MovingIcon sx={{ fontSize: '20px', marginLeft: "10px" }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: '20px', marginLeft: "10px" }} />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ marginTop: '20px', backgroundColor: 'gold', marginLeft: '10px', height: '80px', width: '300px', borderRadius: '5px' }}>
              <Typography variant="h5" sx={{ textAlign: 'center', paddingTop: '10px', fontFamily: 'cursive' }}>Số lượng gia sư</Typography>
              <Box sx={{ display: 'flex', paddingTop: '10px', justifyContent: 'center' }}>
                <Typography variant="h4">{month.TotalTutors}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    paddingTop: '3px',
                    marginLeft: "10px",
                    backgroundColor: month.TotalTutors > lmonth.TotalTutors ? "#1151F8" : "red",
                    borderRadius: "10px"
                  }}
                >
                  <Typography sx={{ fontSize: "15px", marginLeft: "5px" }}>
                    {((month.TotalTutors - lmonth.TotalTutors) / Math.abs(lmonth.TotalTutors) * 10).toFixed(2)}%
                  </Typography>
                  {month.TotalTutors > lmonth.TotalTutors ? (
                    <MovingIcon sx={{ fontSize: '20px', marginLeft: "10px" }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: '20px', marginLeft: "10px" }} />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ marginTop: '20px', backgroundColor: 'gold', marginLeft: '10px', height: '80px', width: '300px', borderRadius: '5px' }}>
              <Typography variant="h5" sx={{ textAlign: 'center', paddingTop: '10px', fontFamily: 'cursive' }}>Lượng tiền </Typography>
              <Box sx={{ display: 'flex', paddingTop: '10px', justifyContent: 'center' }}>
                <Typography variant="h4">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(month.TotalRevenue)}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    paddingTop: '3px',
                    marginLeft: "10px",
                    backgroundColor: month.TotalRevenue > lmonth.TotalRevenue ? "#1151F8" : "red",
                    borderRadius: "10px"
                  }}
                >
                  <Typography sx={{ fontSize: "15px", marginLeft: "5px" }}>
                    {percentageChange}
                  </Typography>
                  {month.TotalRevenue > lmonth.TotalRevenue ? (
                    <MovingIcon sx={{ fontSize: '20px', marginLeft: "10px" }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: '20px', marginLeft: "10px" }} />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ marginTop: '20px', backgroundColor: 'gold', marginLeft: '10px', height: '80px', width: '300px', borderRadius: '5px' }}>
              <Typography variant="h5" sx={{ textAlign: 'center', paddingTop: '10px', fontFamily: 'cursive' }}>Số lượng nhân viên</Typography>
              <Box sx={{ display: 'flex', paddingTop: '10px', justifyContent: 'center' }}>
                <Typography variant="h4">{month.TotalStaff}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    paddingTop: '3px',
                    marginLeft: "10px",
                    backgroundColor: month.TotalStaff > lmonth.TotalStaff ? "#1151F8" : "red",
                    borderRadius: "10px"
                  }}
                >
                  <Typography sx={{ fontSize: "15px", marginLeft: "5px" }}>
                    {((month.TotalStaff - lmonth.TotalStaff) / Math.abs(lmonth.TotalStaff) * 10).toFixed(2)}%
                  </Typography>
                  {month.TotalStaff > lmonth.TotalStaff ? (
                    <MovingIcon sx={{ fontSize: '20px', marginLeft: "10px" }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: '20px', marginLeft: "10px" }} />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: "40px", display: "flex" }}>
        <Box sx={{ backgroundColor: "#E8F4F5", marginLeft: "10px", borderRadius: "5px" }}>
          <LineChart width={900} height={400} data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Tổng_Tiền" stroke="#78068B" />
            <Line type="monotone" dataKey="Thanh_Toán" stroke="#08950D" />
            <Line type="monotone" dataKey="Tiền_Lời" stroke="#E80F0F" />
          </LineChart>
        </Box>
        <Box sx={{ backgroundColor: "#E8F4F5", marginLeft: "10px", borderRadius: "5px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>
        <ApexChart />
        <Box sx={{ width: "100%" }}>
          <PieChartMui />
          <RadarChartMui />
        </Box>
      </Box>
    </Box>
  );
}

export default Admin;