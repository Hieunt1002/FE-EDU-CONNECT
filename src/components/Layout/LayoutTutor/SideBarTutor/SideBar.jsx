import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, Collapse, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import TopicIcon from '@mui/icons-material/Topic';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const Sidebar = () => {
  const [openGrades, setOpenGrades] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const [openHomework, setOpenHomework] = useState(false);
  const decodedToken = jwtDecode(localStorage.getItem('token'));
  const userId = decodedToken.id;
  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isCalendarClicked, setIsCalendarClicked] = useState(false);
  const [isGradesClicked, setIsGradesClicked] = useState(false);
  const [isSubjectClicked, setIsSubjectClicked] = useState(false);
  const [isHomeworkClicked, setIsHomeworkClicked] = useState(false);
  const [isFixCalendarClicked, setIsFixCalendarClicked] = useState(false);

  const handleHomeClick = () => {
    setIsHomeClicked(true);
    setIsCalendarClicked(false);
    setIsGradesClicked(false);
    setIsSubjectClicked(false);
    setIsHomeworkClicked(false);
    setIsFixCalendarClicked(false);
  };

  const handleCalendarClick = () => {
    setIsHomeClicked(false);
    setIsCalendarClicked(true);
    setIsGradesClicked(false);
    setIsSubjectClicked(false);
    setIsHomeworkClicked(false);
    setIsFixCalendarClicked(false);
  };

  const handleFixCalendarClick = () => {
    setIsHomeClicked(false);
    setIsCalendarClicked(false);
    setIsGradesClicked(false);
    setIsSubjectClicked(false);
    setIsHomeworkClicked(false);
    setIsFixCalendarClicked(true);
  }

  const [course, setCourse] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/educonnect/tutor/listcourse?tutorid=${userId}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  const handleGradesClick = () => {
    setOpenGrades(!openGrades);
    setOpenSubject(false);
    setOpenHomework(false);
    setIsHomeClicked(false);
    setIsCalendarClicked(false);
    setIsGradesClicked(true);
    setIsSubjectClicked(false);
    setIsHomeworkClicked(false);
    setIsFixCalendarClicked(false);
  };
  const handleSubjectClick = () => {
    setOpenSubject(!openSubject);
    setOpenGrades(false);
    setOpenHomework(false);
    setIsHomeClicked(false);
    setIsCalendarClicked(false);
    setIsGradesClicked(false);
    setIsSubjectClicked(true);
    setIsHomeworkClicked(false);
    setIsFixCalendarClicked(false);
  };
  const handleHomeworkClick = () => {
    setOpenHomework(!openHomework);
    setOpenGrades(false);
    setOpenSubject(false);
    setIsHomeClicked(false);
    setIsCalendarClicked(false);
    setIsGradesClicked(false);
    setIsSubjectClicked(false);
    setIsHomeworkClicked(true);
    setIsFixCalendarClicked(false);
  };
  return (
    <Box
      sx={{
        bgcolor: '#E0D3A8',
        minWidth: '30vh',
        height: "100%"
      }}
    >
      <List
        sx={{
          width: '100%',
          bgcolor: '#E0D3A8',
        }}
      >
        <ListItemButton 
        sx={{
          backgroundColor: isHomeClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleHomeClick}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to="/hometutor" style={{ color: "black", textDecoration: "none" }}>Trang chủ</Link></Typography>
        </ListItemButton>

        <ListItemButton
        sx={{
          backgroundColor: isCalendarClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleCalendarClick}
        >
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to="/calendartutor" style={{ color: "black", textDecoration: "none" }}>Lịch dạy</Link></Typography>
        </ListItemButton>

        <ListItemButton
        sx={{
          backgroundColor: isGradesClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
         onClick={handleGradesClick}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}>Xem khoá dạy </Typography>
          {openGrades ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openGrades} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {course.map((item, index) => (
              <ListItemButton sx={{ pl: 3 }} key={index}>
                <ListItemIcon></ListItemIcon>
                <Typography sx={{ fontSize: '13px', marginRight: 'auto', fontWeight: 'bold' }}>
                  <Link to={`/managerstudent/${item.classcourseid}`} style={{ color: "black", textDecoration: "none" }}>{item.courseName} {item.classname}</Link>
                </Typography>
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <ListItemButton
        sx={{
          backgroundColor: isSubjectClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
         onClick={handleSubjectClick}>
          <ListItemIcon>
            <TopicIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link style={{ color: "black", textDecoration: "none" }}>Tài liệu dạy </Link></Typography>
          {openSubject ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openSubject} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {course.map((item, index) => (
              <ListItemButton sx={{ pl: 3 }} key={index}>
                <ListItemIcon></ListItemIcon>
                <Typography sx={{ fontSize: '13px', marginRight: 'auto', fontWeight: 'bold' }}>
                  <Link to={`/demo/${item.classcourseid}`} style={{ color: "black", textDecoration: "none" }}>{item.courseName} {item.classname}</Link>
                </Typography>
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <Collapse in={openHomework} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {course.map((item, index) => (
              <ListItemButton sx={{ pl: 3 }} key={index}>
                <ListItemIcon></ListItemIcon>
                <Typography sx={{ fontSize: '13px', marginRight: 'auto', fontWeight: 'bold' }}>
                  <Link to={`/homeworklist/${item.classcourseid}`} style={{ color: "black", textDecoration: "none" }}>{item.courseName} {item.classname}</Link>
                </Typography>
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <ListItemButton
        sx={{
          backgroundColor: isFixCalendarClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleFixCalendarClick}
         >
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to="/updatecalender" style={{ color: "black", textDecoration: "none" }}>Sửa lịch dạy</Link></Typography>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;