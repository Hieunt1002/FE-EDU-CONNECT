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
import BackHandIcon from '@mui/icons-material/BackHand';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useRef } from 'react';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LOGO from "../../../../assests/logo.png";
import MuiAlert from '@mui/material/Alert';


function Header() {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const getAmountDisplay = () => {
        if (isVisible) {
            return data.salary.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        } else {
            return "********";
        }
    };

    const getIcon = () => {
        if (isVisible) {
            return <VisibilityOffIcon sx={{ marginTop: '4px', fontSize: '20px', marginLeft: 'auto', marginRight: '15px' }} onClick={toggleVisibility} />;
        } else {
            return <RemoveRedEyeIcon sx={{ marginTop: '4px', fontSize: '20px', marginLeft: 'auto', marginRight: '15px' }} onClick={toggleVisibility} />;
        }
    };

    const wavingAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(15deg);
    }
    50% {
        transform: rotate(0deg);
    }
    75% {
        transform: rotate(-15deg);
    }
    100% {
        transform: rotate(0deg);
    }
    `;
    const WavingHand = styled(BackHandIcon)`
    animation: ${wavingAnimation} 0.7s infinite;
    `;
    const Phone = styled(PhoneIcon)`
    animation: ${wavingAnimation} 0.5s infinite;
    `
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();

    const handleChangePassword = () => {
        navigate('/changepass');
    }

    const handleFeedback = () => {
        navigate('/feedbacktutors');
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
    const location = useLocation();
    const [checkProfile, setCheckProfile] = useState(true);
    const [data, setData] = useState([]);
    const [check, setCheck] = useState('');
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [open1, setOpen1] = useState(false);
    const handleClose1 = () => setOpen1(false);
    const handleOpen1 = () => setOpen1(true);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        paddingTop: '20px',
        borderRadius: '10px'
    };
    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        paddingTop: '20px',
        borderRadius: '10px'
    };

    const [money, setMoney] = useState('');
    const [valid, setValid] = useState(true);
    const [banks, setBanks] = useState([]);

    const handleMoneyChange = (e) => {
        const value = e.target.value;
        setMoney(value);
        setValid(value >= 100000);
    };

    const handleClickPay = async (event, tutorid) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            await axios.post(
                `http://localhost:8081/educonnect/paymenttutor`,
                {
                    tutorid: tutorid,
                    money: money,
                    banknumber: show.banknumber,
                    bank: show.bank,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const [show, setShow] = useState([]);
    const [history, setHistory] = useState([]);

    const checkUserProfile = async (role) => {
        try {
            if (role === 1) {
                const check = await axios.get(
                    `http://localhost:8081/student/checkstudent?studentid=${decodedTokenRef.current.id}`,
                );
                setCheckProfile(check.data);
            }
            if (role === 2) {
                const check = await axios.get(
                    `http://localhost:8081/educonnect/checktutor?tutorid=${decodedTokenRef.current.id}`,
                );
                setCheckProfile(check.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        try {
            if (token !== null) {
                decodedTokenRef.current = jwtDecode(token);
                const role = decodedTokenRef.current.role;
                setCheck(role);
                checkUserProfile(role);
                if (role === 1) {
                    axios
                        .get(`http://localhost:8081/student/viewstudent?email=${decodedTokenRef.current.id}`)
                        .then((response) => {
                            setData(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else if (role === 2) {
                    axios
                        .get(`http://localhost:8081/educonnect/viewTutor?tutorId=${decodedTokenRef.current.id}`)
                        .then((response) => {
                            setData(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    axios
                        .get(`http://localhost:8081/educonnect/showbank?tutorid=${decodedTokenRef.current.id}`)
                        .then((response) => {
                            setShow(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    axios
                        .get(`http://localhost:8081/educonnect/historypay?tutorid=${decodedTokenRef.current.id}`)
                        .then((response) => {
                            setHistory(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    axios
                        .get('https://api.vietqr.io/v2/banks')
                        .then((response) => {
                            setBanks(response.data.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else if (role === 3) {
                    axios
                        .get(`http://localhost:8081/staffsconnect/ViewInfoStaff?staffId=${decodedTokenRef.current.id}`)
                        .then((response) => {
                            setData(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        } catch (error) {
            console.error('Error decoding the token:', error);
        }
    }, [token]);

    const handleProfileClick = () => {
        decodedTokenRef.current = jwtDecode(token);
        const role = decodedTokenRef.current.role;
        handleCloseUserMenu();
        if (role === 1) {
            navigate('/profile-student');
        } else if (role === 2) {
            navigate('/profile-teacher');
        } else if (role === 3) {
            navigate('/profile-staff');
        }
    };
    const profileLink =
        check === 1 ? '/profile-student' : check === 2 ? '/profile-teacher' : check === 2 ? '/profile-staff' : null;
    if (token != null) {
        decodedTokenRef.current = jwtDecode(token);
    }
    return (
        <AppBar position='fixed' sx={{
            width: '100%',
            background: "#D1BD7F",
            zIndex: "5",
            boxShadow: 'none',
            height: '70px'
        }}>
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
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            <Phone sx={{
                                height: "30px",
                                width: "30px",
                            }} />
                            <Typography sx={{
                                fontSize: '15px',
                                fontWeight: 'bold',
                            }}>0904692410</Typography>
                        </Box>
                        <WavingHand sx={{
                            height: "30px",
                            width: "30px",
                        }} />
                        {check === 2 ? (
                            <Box sx={{ height: '30px', width: '140px', backgroundColor: '#1B3752', borderRadius: '15px', display: 'flex' }}>
                                <Typography sx={{ textAlign: 'left', marginLeft: '15px', fontSize: '15px', fontWeight: '700', marginTop: '4px' }}>
                                    {getAmountDisplay()}
                                </Typography>
                                {getIcon()}
                            </Box>
                        ) : (
                            <Typography></Typography>
                        )}
                        {
                            check ? (
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
                                            {data.img && decodedTokenRef.current ? (
                                                <Avatar
                                                    alt={data.fullname}
                                                    src={`http://localhost:8081/edu/file/fileuser/${data.img}/${decodedTokenRef.current.id}`}
                                                    sx={{
                                                        height: "55px",
                                                        width: "55px",
                                                    }}
                                                />
                                            ) : (
                                                <Avatar
                                                    alt={data.fullname}
                                                    sx={{
                                                        height: "55px",
                                                        width: "55px",
                                                    }}
                                                />
                                            )}
                                        </IconButton>
                                        <Typography
                                            sx={{
                                                fontSize: '15px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {data.fullname}
                                        </Typography>
                                    </Box>
                                </Tooltip>
                            ) : (
                                <Box>
                                    <Link to="/login"><Button sx={{ color: "black", fontSize: "13px", fontWeight: "600", marginRight: "5px" }}>Đăng nhập</Button></Link>
                                    <Link to="/signup"><Button sx={{ backgroundColor: "#C6D331", color: "black", fontSize: "13px", fontWeight: "600" }}>Đăng ký</Button></Link>
                                </Box>
                            )
                        }

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
                            {[
                                <MenuItem key="profile" onClick={handleProfileClick}>
                                    <Typography variant="body1" sx={{ fontSize: "15px" }}>Thông tin cá nhân</Typography>
                                </MenuItem>,
                                check === 2 && (
                                    <MenuItem key="withdraw" onClick={handleOpen}>
                                        <Typography variant="body1" sx={{ fontSize: "15px" }}>Rút tiền</Typography>
                                    </MenuItem>
                                ),
                                check === 2 && (
                                    <MenuItem key="withdraw-history" onClick={handleOpen1}>
                                        <Typography variant="body1" sx={{ fontSize: "15px" }}>Lịch sử rút tiền</Typography>
                                    </MenuItem>
                                ),
                                check === 1 && (
                                    <MenuItem key="feedback" onClick={handleFeedback}>
                                        <Typography variant="body1" sx={{ fontSize: "15px" }}>Đánh giá gia sư</Typography>
                                    </MenuItem>
                                ),
                                <MenuItem key="change-password" onClick={handleChangePassword}>
                                    <Typography variant="body1" sx={{ fontSize: "15px" }}>Đổi mật khẩu</Typography>
                                </MenuItem>,
                                <MenuItem key="logout" onClick={handleLogoutClick}>
                                    <Typography variant="body1" sx={{ fontSize: "15px" }}>Đăng xuất</Typography>
                                </MenuItem>
                            ]}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={(event) => handleClickPay(event, data.tutorid)}>
                    <Box sx={style}>
                        <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center', marginTop: '15px' }}>Tên Gia sư</Typography>
                        <Typography sx={{ fontSize: '20px', fontFamily: 'cursive', textAlign: 'center', marginTop: '5px' }}>{data.fullname}</Typography>
                        <TextField
                            value={money}
                            onChange={handleMoneyChange}
                            label='Nhập số tiền cần rút'
                            type='number'
                            inputProps={{
                                min: 100000,
                                max: data.salary,
                                style: {
                                    fontSize: '14px'
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    fontSize: '12px',
                                    color: 'rgba(0, 0, 0, 0.54)',
                                },
                            }}
                            error={!valid}
                            helperText={!valid ? <span style={{ fontSize: '12px' }}>Tối thiểu là 100.000 VND</span> : ''}
                            sx={{ marginLeft: '25%', width: '200px', marginTop: '20px' }}
                        />
                        <TextField
                            select
                            value={show.bank || ''}
                            onChange={(e) => {
                                setShow({ ...show, bank: e.target.value });
                            }}
                            sx={{ marginTop: '20px', marginLeft: '26%', width: "202px" }}
                            label='Tên ngân hàng'
                            InputLabelProps={{
                                style: {
                                    fontSize: '12px',
                                    color: 'rgba(0, 0, 0, 0.54)',
                                },
                            }}
                            InputProps={{
                                style: {
                                    fontSize: '14px',
                                    height: '45px'
                                },
                            }}
                        >
                            {banks.map((item, index) => (
                                <MenuItem key={index} value={item.shortName}>
                                    {item.shortName}
                                </MenuItem>
                            ))}
                        </TextField>
                        
                        <TextField
                            value={show.banknumber || ''}
                            onChange={(e) => {
                                setShow({ ...show, banknumber: e.target.value });
                            }}
                            sx={{ marginTop: '20px', marginLeft: '26%' }}
                            label='Số tài khoản'
                            InputLabelProps={{
                                style: {
                                    fontSize: '12px',
                                    color: 'rgba(0, 0, 0, 0.54)',
                                },
                            }}
                            InputProps={{
                                style: {
                                    fontSize: '14px',
                                    height: '45px'
                                },
                            }}
                        />


                        <Box sx={{ marginTop: "30px", marginLeft: "34%", display: 'flex' }}>
                            <Button type="submit" variant='contained' color='success' sx={{ backgroundColor: "green", color: "white", fontSize: "12px", fontWeight: "600" }} >Rút</Button>
                            <Button variant='contained' color='error' sx={{ backgroundColor: "red", color: "white", fontSize: "12px", fontWeight: "600", marginLeft: '10px' }} onClick={handleClose}>Huỷ</Button>
                        </Box>
                    </Box>
                </form>
            </Modal>
            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...styles, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                    <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>Lịch sử rút tiền</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Số tiền rút</TableCell>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Số tài khoản</TableCell>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Ngân hàng</TableCell>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Ngày thanh toán</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(history) ? (
                                    (history).map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>
                                                {item.money.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.banknumber}</TableCell>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.bank}</TableCell>
                                            {item.date !== null ? (
                                                <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.date}</TableCell>
                                            ) : (
                                                <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>Đợi duyệt</TableCell>
                                            )}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell style={{ fontSize: "10px", fontFamily: "cursive", textAlign: "center" }} colSpan={4}>No data available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
            {location.pathname !== '/profile-student' &&
                location.pathname !== '/profile-teacher' &&
                location.pathname !== '/profile-staff' &&
                !checkProfile && (
                    <MuiAlert
                        severity='error'
                        sx={{
                            width: '400px',
                            fontSize: '15px',
                            color: 'red',
                            position: 'fixed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: '90px',
                            right: "20px",
                            backgroundColor: "#FAFF06"
                        }}
                    >
                        Đây là tài khoản mới! Vui lòng cập nhập thông tin cá nhân{' '}
                        <Link to={profileLink} style={{ color: 'red', textDecoration: 'underline' }}>
                            tại đây
                        </Link>
                    </MuiAlert>
                )}
        </AppBar>
    );
}
export default Header;
