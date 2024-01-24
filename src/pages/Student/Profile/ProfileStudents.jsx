import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ProfileAvatar from '../../../components/Layout/components/ProfileAvatar/ProfileAvatar';
import UserProfileInfo from './ProfileInfo';
import { Box, Paper, ThemeProvider, createTheme } from '@mui/material';
import { useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { format } from 'date-fns';

const theme = createTheme({
  typography: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const ProfileStudents = () => {

  const decodedToken = jwtDecode(localStorage.getItem('token'));
  const userId = decodedToken.id;
  const [uploadedFile, setUploadedFile] = useState(null);
  const [city, setCity] = useState([]);
  const [wards, setWards] = useState([]);

  const [userData, setUserData] = useState({
    fullname: '',
    studentid: userId,
    class: '',
    gender: '',
    wards: '',
    city: '',
    birthdate: null,
    phone: '',
    classId: '',
    img: '',
  });
  const [isEditing, setIsEditing] = useState(true);


  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/student/viewstudent?email=${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    axios
      .get(`https://provinces.open-api.vn/api/p/`)
      .then((response) => {
        setCity(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`https://provinces.open-api.vn/api/d/`)
      .then((response) => {
        setWards(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchUser();
  }, [fetchUser]);

  const updateInfo = async () => {
    try {
      const dateString = userData.birthdate;
      const formattedDate = format(new Date(dateString), 'yyyy/MM/dd');
      const formData = new FormData();
      formData.append('fullname', userData.fullname);
      formData.append('studentid', decodedToken.id);
      formData.append('file', userData.avt);
      formData.append('gender', userData.gender);
      formData.append('birthdate', formattedDate);
      formData.append('phone', userData.phone);
      formData.append('city', userData.city);
      formData.append('wards', userData.wards);
      formData.append('classentity', userData.classId);

      await axios.put(
        'http://localhost:8081/student/updatestudent',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      window.location.href = "/homestudent";
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleSave = () => {
    setUserData({
      ...userData,
      avt: uploadedFile,
    });
    updateInfo();
    setUploadedFile(userData.avt);
    setIsEditing(false);
  };

  const handleFileChange = (selectedFile) => {
    setUserData({
      ...userData,
      avt: selectedFile,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ThemeProvider theme={theme}>
        <ProfileAvatar
          city={city}
          userData={userData}
          onFileChange={handleFileChange}
          isEditing={isEditing}
          role={'học sinh'}
          uploadedFile={uploadedFile}
        />
        <Paper
          style={{
            marginBottom: '30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            padding: '30px',
            width: '50vw',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <UserProfileInfo
            wards={wards}
            city={city}
            userData={userData}
            handleInputChange={handleInputChange}
            isEditing={isEditing}
          />
          {isEditing ? (

            <Button variant="contained" onClick={handleSave}>
              Lưu
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setIsEditing(!isEditing)}>
              Chỉnh Sửa
            </Button>
          )}
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default ProfileStudents;
