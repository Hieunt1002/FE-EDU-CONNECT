import { Box, Typography, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import LOGIN from '../../../assests/login.png';
import LOGO from '../../../assests/lglogin.jpg';
import Button from '@mui/joy/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');


    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError('Password should be at least 8 characters long');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };
    const handleSubmits = () => {
        validatePassword();
        validateConfirmPassword();
    };

    const { token } = useParams();

    const fetchStudentData = useCallback(async () => {
        try {
            const studentResponse = await axios.get(
                `http://localhost:8081/edu/checktoken?token=${token}`
            );
            if (studentResponse.data === false) {
                window.location.href = '/login';
            }
        } catch (error) {
            console.error(error);
        }
    }, [token]);
    useEffect(() => {
        fetchStudentData();
    }, [fetchStudentData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            await axios.put(
                "http://localhost:8081/edu/resetpassword",
                {
                    token: token,
                    password: password
                },
                config
            );
            alert("Thay đổi mật khẩu thành công")
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
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
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControl sx={{ mt: 1, width: '55ch', ml: -4 }} variant="outlined" size="large">
                                    <InputLabel htmlFor="new-password" style={{ fontSize: 18, marginLeft: '4%' }}>
                                        Mật khẩu mới
                                    </InputLabel>
                                    <OutlinedInput
                                        id="new-password"
                                        type={showNewPassword ? 'text' : 'password'}
                                        sx={{ fontSize: '18px' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleShowNewPassword}>
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
                                </FormControl>

                                <FormControl sx={{ mt: 1, width: '55ch', ml: -4 }} variant="outlined" size="large">
                                    <InputLabel htmlFor="confirm-password" style={{ fontSize: 18, marginLeft: '4%' }}>
                                        Nhập lại mật khẩu
                                    </InputLabel>
                                    <OutlinedInput
                                        id="confirm-password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        sx={{ fontSize: '18px' }}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleShowConfirmPassword}>
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {confirmPasswordError && <FormHelperText error>{confirmPasswordError}</FormHelperText>}
                                </FormControl>

                            </Box>
                        </Box>
                        <Button type='submit'
                            sx={{
                                width: '250px',
                                height: '45px',
                                fontSize: '23px',
                                marginTop: '10px',
                                background: '#2D3748',
                            }}
                            onClick={handleSubmits}
                        >
                            Đổi Mật Khẩu
                        </Button>
                    </Box>
                </form>
                <Typography
                    sx={{
                        position: 'absolute',
                        bottom: '10%',
                        fontSize: "18px"
                    }}
                >
                    Vui lòng nhập thông tin để thay đổi mật khẩu
                </Typography>
            </Box>
        </Box>
    );
}

export default ResetPassword;