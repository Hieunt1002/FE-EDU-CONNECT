import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ProfileAvatar from '../../../components/Layout/components/ProfileAvatar/ProfileAvatar';
import UserProfileInfo from '../../../components/Layout/components/ProfileInfo/Student/ProfileInfo';
import { Box, Paper, ThemeProvider, createTheme } from '@mui/material';
import { useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { format } from 'date-fns';

const theme = createTheme({
  typography: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const ProfileStudent = () => {

  const decodedToken = jwtDecode(localStorage.getItem('token'));
  const userId = decodedToken.id;
  const [uploadedFile, setUploadedFile] = useState(null);
  const [city, setCity] = useState([]);
  const [wards, setWards] = useState([]);
  const [validationError, setValidationError] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);


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
  const [isEditing, setIsEditing] = useState(false);

  const isPhoneNumberValid = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const isBirthdateValid = (birthdate) => {
    const currentDate = dayjs();
    return dayjs(birthdate).isBefore(currentDate);
  };


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
      setShowSnackbar(true);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
    setValidationError(null);
  };

  const handleSave = () => {
    if (!validateInputs()) {
      return;
    }

    setUserData({
      ...userData,
      avt: uploadedFile,
    });

    updateInfo();
    setUploadedFile(userData.avt);
    setIsEditing(false);
    setValidationError(null);
  };

  const validateInputs = () => {

    if (
      userData.fullname === '' ||
      userData.gender === '' ||
      userData.birthdate === '' ||
      userData.phone === '' ||
      userData.city === '' ||
      userData.wards === '' ||
      userData.classId === ''
    ) {
      setValidationError('Vui lòng nhập đầy đủ dữ liệu của bạn');
      return false;
    }
    if (isBirthdateValid(userData.birthdate) !== true) {
      setValidationError('Ngày tháng năm sinh không được lớn hơn ngày hiện tại')
      return false;
    }
    if (isPhoneNumberValid(userData.phone) !== true) {
      setValidationError('Số Điện Thoại Phải là 10 Số');
      return false;
    }

    setValidationError(null);
    return true;
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
          userData={userData}
          onFileChange={handleFileChange}
          isEditing={isEditing}
          role={'học sinh'}
          uploadedFile={uploadedFile}
        />
        {validationError && (
          <div style={{ color: 'red', marginBottom: '10px' }}>{validationError}</div>
        )}
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
            isBirthdateValid={isBirthdateValid}
            isPhoneNumberValid={isPhoneNumberValid}
          />
          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Alert severity="success" onClose={handleCloseSnackbar}>
              Cập nhật thành công!
            </Alert>
          </Snackbar>
          {isEditing ? (
            <Button variant='contained' onClick={handleSave}>
              Lưu
            </Button>
          ) : (
            <Button variant='contained' onClick={() => setIsEditing(!isEditing)}>
              Chỉnh Sửa
            </Button>
          )}
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default ProfileStudent;