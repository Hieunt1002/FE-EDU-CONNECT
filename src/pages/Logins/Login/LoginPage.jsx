import { Box, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import LOGIN from '../../../assests/login.png';
import LOGO from '../../../assests/lglogin.jpg';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/edu/authenticate",
        {
          username: email,
          password: password,
        },
        config
      );
      setAlertMessage(response.data.message);
      setAlertSeverity('success');
      setShowAlert(true);

      const token = response.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);

      if (decodedToken.role === 1) {
        const fb = await axios.get("http://localhost:8081/student/feedback/" + decodedToken.id, config);
        if (Array.isArray(fb.data) && fb.data.length > 0) {
          window.location.href = "/feedback";
        } else {
          window.location.href = "/homestudent";
        }
      } else if (decodedToken.role === 2) {
        const check = await axios.get(`http://localhost:8081/educonnect/checktutor?tutorid=${decodedToken.id}`)
        if (check.data === false) {
          window.location.href = "/updatecalender";
        } else {
          window.location.href = "/hometutor";
        }
      } else if (decodedToken.role === 3) {
        window.location.href = "/dashboard"
      } else if (decodedToken.role === 4) {
        window.location.href = "/admin"
      }
      validateEmail();
      validatePassword();
    } catch (error) {
      setAlertMessage("Tài khoản hoặc mật khẩu của bạn không chính xác!");
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Mật khẩu cần ít nhất 8 ký tự');
    } else {
      setPasswordError('');
    }
  };

  return (
    <Box
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
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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

            <FormControl sx={{ mt: 5, width: '50ch' }} variant="outlined" size='large'>
              <InputLabel htmlFor="Email" style={{ fontSize: 15 }}>Email</InputLabel>
              <OutlinedInput
                style={{ fontSize: '18px' }}
                id="Email"
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              {emailError && <FormHelperText sx={{ fontSize: '12px', fontWeight: '700' }} error>{emailError}</FormHelperText>}
            </FormControl>

            <FormControl sx={{ mt: 1, width: '50ch' }} variant="outlined" size="large">
              <InputLabel htmlFor="password" style={{ fontSize: 15 }}>
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                style={{ fontSize: '18px' }}
                id="password"
                value={password}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      aria-label="toggle password visibility"
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                autoComplete="current-password" // Add the autocomplete attribute
              />
              {passwordError && <FormHelperText sx={{ fontSize: '12px', fontWeight: '700' }} error>{passwordError}</FormHelperText>}
            </FormControl>
            <Button
              sx={{
                width: '250px',
                height: '45px',
                fontSize: '23px',
                marginTop: '10px',
                background: '#2D3748'
              }}
              type="submit"
            >
              Đăng nhập
            </Button>
            <Snackbar open={showAlert}
              autoHideDuration={5000}
              onClose={handleAlertClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ backgroundColor: alertSeverity === 'error' ? '#ffee58' : '#4caf50', fontSize: "15px" }}>
                {alertMessage}
              </Alert>
            </Snackbar>
            <Link to="/forgotpass" style={{ textDecoration: "none" }}>
              <Typography variant='h5' sx={{ color: "#8B8B8B", marginLeft: "180px" }}>Quên mật khẩu</Typography>
            </Link>
          </Box>
        </form>
        <Typography
          sx={{
            position: 'absolute',
            fontSize: '18px',
            bottom: '16%'
          }}>
          Bạn chưa có tài khoản, đăng kí <Link to='/signup' style={{ color: "blue", textDecoration: "none" }}>tại đây</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;