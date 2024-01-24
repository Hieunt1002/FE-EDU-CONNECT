import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClassIcon from '@mui/icons-material/Class';
import { Link } from 'react-router-dom';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import SchoolIcon from '@mui/icons-material/School';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BiotechIcon from '@mui/icons-material/Biotech';
import DiscountIcon from '@mui/icons-material/Discount';
import PaymentIcon from '@mui/icons-material/Payment';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function Sidebar() {
  const [isHomeClicked, setIsHomeClicked] = React.useState(false);
  const [isTutorClicked, setIsTutorClicked] = React.useState(false);
  const [isStudentClicked, setIsStudentClicked] = React.useState(false);
  const [isTestClicked, setIsTestClicked] = React.useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = React.useState(false);
  const [isDocumentClicked, setIsDocumentClicked] = React.useState(false);
  const [isTutorRegisterClicked, setIsTutorRegisterClicked] = React.useState(false);
  const [isSimulationClicked, setIsSimulationClicked] = React.useState(false);
  const [isDiscountClicked, setIsDiscountClicked] = React.useState(false);
  const [isPaymentClicked, setIsPaymentClicked] = React.useState(false);

  const handleHomeClick = () => {
    setIsHomeClicked(true);
    setIsTutorClicked(false);
    setIsStudentClicked(false);
    setIsTestClicked(false);
    setIsRegisterClicked(false);
    setIsDocumentClicked(false);
    setIsTutorRegisterClicked(false);
    setIsSimulationClicked(false);
    setIsDiscountClicked(false);
    setIsPaymentClicked(false);
};

const handleTutorClick = () => {
  setIsHomeClicked(false);
  setIsTutorClicked(true);
  setIsStudentClicked(false);
  setIsTestClicked(false);
  setIsRegisterClicked(false);
  setIsDocumentClicked(false);
  setIsTutorRegisterClicked(false);
  setIsSimulationClicked(false);
  setIsDiscountClicked(false);
  setIsPaymentClicked(false);
};

const handleStudentClick = () => {
  setIsHomeClicked(false);
  setIsTutorClicked(false);
  setIsStudentClicked(true);
  setIsTestClicked(false);
  setIsRegisterClicked(false);
  setIsDocumentClicked(false);
  setIsTutorRegisterClicked(false);
  setIsSimulationClicked(false);
  setIsDiscountClicked(false);
  setIsPaymentClicked(false);
};

const handleTestClick = () => {
  setIsHomeClicked(false);
  setIsTutorClicked(false);
  setIsStudentClicked(false);
  setIsTestClicked(true);
  setIsRegisterClicked(false);
  setIsDocumentClicked(false);
  setIsTutorRegisterClicked(false);
  setIsSimulationClicked(false);
  setIsDiscountClicked(false);
  setIsPaymentClicked(false);
};

const handleRegisterClick = () => {
  setIsHomeClicked(false);
  setIsTutorClicked(false);
  setIsStudentClicked(false);
  setIsTestClicked(false);
  setIsRegisterClicked(true);
  setIsDocumentClicked(false);
  setIsTutorRegisterClicked(false);
  setIsSimulationClicked(false);
  setIsDiscountClicked(false);
  setIsPaymentClicked(false);
};

const handleDocumentClick = () => {
  setIsHomeClicked(false);
  setIsTutorClicked(false);
  setIsStudentClicked(false);
  setIsTestClicked(false);
  setIsRegisterClicked(false);
  setIsDocumentClicked(true);
  setIsTutorRegisterClicked(false);
  setIsSimulationClicked(false);
  setIsDiscountClicked(false);
  setIsPaymentClicked(false);
};

const handleTutorRegisterClick = () => {
  setIsHomeClicked(false);
  setIsTutorClicked(false);
  setIsStudentClicked(false);
  setIsTestClicked(false);
  setIsRegisterClicked(false);
  setIsDocumentClicked(false);
  setIsTutorRegisterClicked(true);
  setIsSimulationClicked(false);
  setIsDiscountClicked(false);
  setIsPaymentClicked(false);
};

const handleSimulationClick = () => {
  setIsHomeClicked(false);
  setIsTutorClicked(false);
  setIsStudentClicked(false);
  setIsTestClicked(false);
  setIsRegisterClicked(false);
  setIsDocumentClicked(false);
  setIsTutorRegisterClicked(false);
  setIsSimulationClicked(true);
  setIsDiscountClicked(false);
  setIsPaymentClicked(false);
};

const handleDiscountClick = () => {
  setIsHomeClicked(false);
  setIsTutorClicked(false);
  setIsStudentClicked(false);
  setIsTestClicked(false);
  setIsRegisterClicked(false);
  setIsDocumentClicked(false);
  setIsTutorRegisterClicked(false);
  setIsSimulationClicked(false);
  setIsDiscountClicked(true);
  setIsPaymentClicked(false);
};

const handlePaymentClick = () => {
  setIsHomeClicked(false);
  setIsTutorClicked(false);
  setIsStudentClicked(false);
  setIsTestClicked(false);
  setIsRegisterClicked(false);
  setIsDocumentClicked(false);
  setIsTutorRegisterClicked(false);
  setIsSimulationClicked(false);
  setIsDiscountClicked(false);
  setIsPaymentClicked(true);
};



  const decodedToken = jwtDecode(localStorage.getItem('token'));
  const [data, setData] = useState([]);
  const [tryl, setTry] = useState([]);
  const [book, setBook] = useState([]);
  const [file, setFile] = useState([]);
  const [tutor, setTutor] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/staffsconnect/totalpayment?staffid=${decodedToken.id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios.get(`http://localhost:8081/staffsconnect/countTutorRegistersForLessons?staffid=${decodedToken.id}`)
      .then((response) => {
        setFile(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios.get(`http://localhost:8081/staffsconnect/counttrylearn`)
      .then((response) => {
        setTry(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios.get(`http://localhost:8081/staffsconnect/totalPageStudentRegistration`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios.get(`http://localhost:8081/staffsconnect/countWaitForConfirmTutor`)
      .then((response) => {
        setTutor(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [decodedToken.id]);

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
            <DashboardIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/dashboard' style={{ color: "black", textDecoration: "none" }}>Dashboard</Link></Typography>
        </ListItemButton>

        <ListItemButton
        sx={{
          backgroundColor: isTutorClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleTutorClick}
        >
          <ListItemIcon>
            <CastForEducationIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/tutormanagement' style={{ color: "black", textDecoration: "none" }}>Quản lý gia sư</Link></Typography>
        </ListItemButton>

        <ListItemButton
        sx={{
          backgroundColor: isStudentClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleStudentClick}
        >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/studentmanagement' style={{ color: "black", textDecoration: "none" }}>Quản lý học sinh</Link></Typography>
        </ListItemButton>

        <ListItemButton
        sx={{
          backgroundColor: isTestClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleTestClick}
         >
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/trylearningmanagement' style={{ color: "black", textDecoration: "none" }}>Quản lý lịch học thử</Link></Typography>
          {tryl > 0 && (
            <span
              style={{
                marginLeft: '40px',
                backgroundColor: 'red',
                color: 'white',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                textAlign: 'center'
              }}
            >
              {tryl}
            </span>
          )}
        </ListItemButton>

        <ListItemButton
        sx={{
          backgroundColor: isRegisterClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleRegisterClick}
        >
          <ListItemIcon>
            <ClassIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/coursemanagement' style={{ color: "black", textDecoration: "none" }}>Quản lý đăng ký khoá học</Link></Typography>
          {book > 0 && (
            <span
              style={{
                marginLeft: '10px',
                backgroundColor: 'red',
                color: 'white',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                textAlign: 'center'
              }}
            >
              {book}
            </span>
          )}
        </ListItemButton>

        <ListItemButton
        sx={{
          backgroundColor: isDocumentClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleDocumentClick}
        >
          <ListItemIcon>
            <FolderCopyIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/documentmanagement' style={{ color: "black", textDecoration: "none" }}>Quản lý tài liệu dạy</Link>
            {file > 0 && (
              <span
                style={{
                  marginLeft: '60px',
                  backgroundColor: 'red',
                  color: 'white',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '15px',
                  textAlign: 'center'
                }}
              >
                {file}
              </span>
            )}</Typography>
        </ListItemButton>

        <ListItemButton
        sx={{
          backgroundColor: isTutorRegisterClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleTutorRegisterClick}
        >
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/tutorregistermanagement' style={{ color: "black", textDecoration: "none" }}>Quản lý gia sư đăng ký</Link>
            {tutor > 0 && (
              <span
                style={{
                  marginLeft: '10px',
                  backgroundColor: 'red',
                  color: 'white',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  textAlign: 'center'
                }}
              >
                {tutor}
              </span>)}
          </Typography>
        </ListItemButton>

        <ListItemButton
        sx={{
          backgroundColor: isSimulationClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleSimulationClick}
        >
          <ListItemIcon>
            <BiotechIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/simulationmanagement' style={{ color: "black", textDecoration: "none" }}>Quản lý mô phỏng</Link></Typography>
        </ListItemButton>

        <ListItemButton
        sx={{
          backgroundColor: isDiscountClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleDiscountClick}
        >
          <ListItemIcon>
            <DiscountIcon />
          </ListItemIcon>
          <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/discountmanagement' style={{ color: "black", textDecoration: "none" }}>Chương trình giảm giá</Link></Typography>
        </ListItemButton>
        <ListItemButton
        sx={{
          backgroundColor: isPaymentClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          borderRadius: '10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handlePaymentClick}
        >
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <Typography
            component={Link}
            to='/managerpayment'
            sx={{
              fontSize: '16px',
              marginRight: 'auto',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: 'black'
            }}
          >
            Quản lý thanh toán
            {data > 0 && (
              <span
                style={{
                  marginLeft: '40px',
                  backgroundColor: 'red',
                  color: 'white',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  textAlign: 'center'
                }}
              >
                {data}
              </span>
            )}
          </Typography>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
