import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRef } from 'react';
import LOGO from "../../../../assests/logo.png";



function Header() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();

    const handleChangePassword = () => {
        navigate('/changepass');
    }
    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const token = localStorage.getItem('token');
    const decodedTokenRef = useRef(null);

    const [data] = useState([]);

    useEffect(() => {
        try {
            decodedTokenRef.current = jwtDecode(token);
        } catch (error) {
            console.error('Error decoding the token:', error);
        }
    }, [token]);

    return (
        <AppBar position='fixed' sx={{ width: '100%', background: "#D1BD7F", zIndex: "5", boxShadow: 'none', height: '70px' }}>
            <Container maxWidth="">
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                <Typography
                        variant="h2"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            fontWeight: 800,
                            color: 'inherit',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={() => { navigate('/') }}
                    >
                        <img src={LOGO} alt="logo" style={{ height: "70px" }} />
                        <span style={{ marginLeft: '10px' }}>EDU-CONNECT</span>
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '19px',
                    }}>
                        <Tooltip
                            title={<span style={{ fontSize: '10px' }}>Settings</span>}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1px',
                                }}
                                onClick={handleOpenUserMenu}
                            >
                                <IconButton>
                                    <Avatar
                                        alt={data.fullname}
                                        src={data.img}
                                        sx={{
                                            height: "55px",
                                            width: "55px",
                                        }}
                                    />
                                </IconButton>
                                <Typography
                                    sx={{
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Admin
                                </Typography>
                            </Box>
                        </Tooltip>

                        <Menu
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="Đổi mật khẩu" onClick={handleChangePassword}>
                                <Typography variant="body1" sx={{ fontSize: "15px" }}>Đổi mật khẩu</Typography>
                            </MenuItem>
                            <MenuItem key="Đăng xuất" onClick={handleLogoutClick}>
                                <Typography variant="body1" sx={{ fontSize: "15px" }}>
                                    Đăng xuất
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
