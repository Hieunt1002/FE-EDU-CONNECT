import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput, Snackbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import LOGIN from '../../../assests/login.png';
import LOGO from '../../../assests/lglogin.jpg';
import Button from '@mui/joy/Button';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';


const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const configs = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.get(
        "http://localhost:8081/edu/checkmail?email=" + email,
        config
      );
      showSnackbar("Vui lòng bạn kiểm tra email", 'success')
      window.location.href = "/login"
      if (response.data === true) {
        await axios.post("http://localhost:8081/edu/forgotpassword", {
          email: email,
        }, configs);
      } else if (response.data !== true) {
        showSnackbar("Email không chính xác", 'error')
        window.location.href = "/forgotpass"
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [emailError, setEmailError] = useState('');

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  const handleClick = () => {
    validateEmail();
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
        <form onSubmit={handleSubmit}>
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
                <FormControl sx={{ mt: 5, width: '50ch', ml: -4 }} variant="outlined" size='large'>
                  <InputLabel htmlFor="Email" style={{ fontSize: 15 }}>Email</InputLabel>
                  <OutlinedInput
                    style={{ fontSize: '18px' }}
                    id="Email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                  />
                  {emailError && <FormHelperText sx={{ fontSize: '12px', fontWeight: '700' }} error>{emailError}</FormHelperText>}
                </FormControl>
              </Box>
            </Box>
            <Button
              type='submit'
              sx={{
                width: '250px',
                height: '45px',
                fontSize: '23px',
                marginTop: '10px',
                background: '#2D3748',
              }}
              onClick={handleClick}
            >
              Lấy lại mật khẩu
            </Button>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MuiAlert
              onClose={handleSnackbarClose}
              severity={snackbarType}
              sx={{ width: '100%', fontSize: '15px' }}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </form>
        <Typography
          sx={{
            position: 'absolute',
            bottom: '27%',
            fontSize: '18px',
          }}
        >
          Vui lòng nhập email của bạn để lấy lại mật khẩu
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;