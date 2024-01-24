import { Box, Typography, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import LOGIN from '../../../assests/login.png';
import LOGO from '../../../assests/lglogin.jpg';
import Button from '@mui/joy/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function ChangePassword() {
  const decodedToken = jwtDecode(localStorage.getItem('token') || '');
  const userEmail = decodedToken.sub;
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOldPass = (e) => {
    setOldPass(e.target.value);
  };
  const handleNewPass = (e) => {
    setNewPass(e.target.value);
  };
  const handleConfirmPass = (e) => {
    setConfirmPass(e.target.value);
  };
  const handleClickChange = async () => {
    try {
      localStorage.removeItem('token');
      setShowSnackbar(true);
      window.location.href = '/';
      await axios.put('http://localhost:8081/edu/changepass', {
        username: userEmail,
        password: oldPass,
        newpass: newPass,
      });
    } catch (error) {
      if (error.response.data === false) {
        setPasswordError(true);
      }
    }
  };

  return (
    <Box
      className='image-container'
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(to bottom, #F9C01F, white)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
        }}
      >
        <img
          src={LOGIN}
          alt='login'
          style={{
            height: '400px',
            width: '600px',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '50%',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '45vw',
            backgroundColor: 'white',
            height: '90vh',
            borderRadius: '30px',
            padding: '50px',
            gap: '30px',
          }}
        >
          <img
            src={LOGO}
            alt='logo'
            style={{
              width: '350px',
              height: '100px',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '70%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FormControl sx={{ mt: 1, width: '55ch', ml: -4 }} variant='outlined' size='large'>
                <InputLabel htmlFor='password' style={{ fontSize: 18 }}>
                  Mật khẩu cũ
                </InputLabel>
                <OutlinedInput
                  id='password'
                  label="Mật khẩu cũ"
                  type={showCurrentPassword ? 'text' : 'password'}
                  sx={{ fontSize: '18px' }}
                  onChange={handleOldPass}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton onClick={toggleShowCurrentPassword}>
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {passwordError && (
                <Typography style={{ color: 'red', paddingTop: '10px' }}>Mật khẩu cũ không đúng. Vui lòng thử lại.</Typography>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FormControl sx={{ mt: 1, width: '55ch', ml: -4 }} variant='outlined' size='large'>
                <InputLabel htmlFor='password' style={{ fontSize: 18 }}>
                  Mật khẩu mới
                </InputLabel>
                <OutlinedInput
                  id='password'
                  label="Mật khẩu mới"
                  type={showNewPassword ? 'text' : 'password'}
                  sx={{ fontSize: '18px' }}
                  onChange={handleNewPass}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton onClick={toggleShowNewPassword}>
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            {confirmPass === '' && oldPass === newPass && oldPass !== '' && (
              <p
                style={{
                  color: 'red',
                }}
              >
                Mật khẩu trùng với mật khẩu cũ
              </p>
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FormControl sx={{ mt: 1, width: '55ch', ml: -4 }} variant='outlined' size='large'>
                <InputLabel htmlFor='password' style={{ fontSize: 18 }}>
                  Nhập lại mật khẩu
                </InputLabel>
                <OutlinedInput
                  id='password'
                  label="Nhập lại mật khẩu
                  "
                  type={showConfirmPassword ? 'text' : 'password'}
                  sx={{ fontSize: '18px' }}
                  onChange={handleConfirmPass}
                  disabled={oldPass === newPass}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton onClick={toggleShowConfirmPassword}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
          {confirmPass !== '' && newPass !== confirmPass && (
            <p
              style={{
                color: 'red',
              }}
            >
              Mật khẩu chưa khớp
            </p>
          )}
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
              Đổi mật khẩu thành công!
            </Alert>
          </Snackbar>
          <Button
            sx={{
              width: '250px',
              height: '45px',
              fontSize: '23px',
              marginTop: '10px',
              background: '#2D3748',
            }}
            onClick={handleClickChange}
            disabled={
              oldPass === '' ||
              newPass === '' ||
              confirmPass === '' ||
              newPass !== confirmPass ||
              oldPass === newPass
            }
          >
            Đổi Mật Khẩu
          </Button>
        </Box>
        <Typography
          sx={{
            position: 'absolute',
            bottom: '10%',
            fontSize: '18px',
          }}
        >
          Vui lòng nhập thông tin để thay đổi mật khẩu
        </Typography>
      </Box>
    </Box>
  );
}

export default ChangePassword;