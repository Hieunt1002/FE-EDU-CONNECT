import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Sidebar = () => {
    const [openPrimary, setOpenPrimary] = React.useState(false);
    const [openSecondary, setOpenSecondary] = React.useState(false);
    const [openHighschool, setOpenHighschool] = React.useState(false);
    const [isHomeClicked, setIsHomeClicked] = React.useState(false);
    const [isPrimaryClicked, setIsPrimaryClicked] = React.useState(false);
    const [isSecondaryClicked, setIsSecondaryClicked] = React.useState(false);
    const [isHighsClicked, setIsHighsClicked] = React.useState(false);
    const [isInforClicked, setIsInforClicked] = React.useState(false);

    const handleHomeClick = () => {
        setIsHomeClicked(true);
        setIsPrimaryClicked(false);
        setIsSecondaryClicked(false);
        setIsHighsClicked(false);
        setIsInforClicked(false);
    };

    const handleInforClick = () => {
        setIsHomeClicked(false);
        setIsPrimaryClicked(false);
        setIsSecondaryClicked(false);
        setIsHighsClicked(false);
        setIsInforClicked(true);
      };

    const [data, setData] = React.useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8081/student/class")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handlePrimaryClick = () => {
        setOpenPrimary(!openPrimary);
        setOpenSecondary(false);
        setOpenHighschool(false);
        setIsHomeClicked(false);
        setIsPrimaryClicked(true);
        setIsSecondaryClicked(false);
        setIsHighsClicked(false);
        setIsInforClicked(false);
    };

    const handleSecondaryClick = () => {
        setOpenSecondary(!openSecondary);
        setOpenPrimary(false);
        setOpenHighschool(false);
        setIsHomeClicked(false);
        setIsPrimaryClicked(false);
        setIsSecondaryClicked(true);
        setIsHighsClicked(false);
        setIsInforClicked(false);
    };

    const handleHighschoolClick = () => {
        setOpenHighschool(!openHighschool);
        setOpenPrimary(false);
        setOpenSecondary(false);
        setIsHomeClicked(false);
        setIsPrimaryClicked(false);
        setIsSecondaryClicked(false);
        setIsHighsClicked(true);
        setIsInforClicked(false);
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
                  onClick={handleHomeClick} >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: '16px', marginRight: 'auto', }}><Link to='/' style={{ color: "black", textDecoration: "none" }}>Trang chủ</Link></Typography>
                </ListItemButton>

                <ListItemButton
                sx={{
                    backgroundColor: isPrimaryClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    borderRadius: '10px',
                    transition: 'background-color 0.3s ease',
                  }}
                 onClick={handlePrimaryClick}>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: '16px', marginRight: 'auto', }}>Cấp 1 </Typography>
                    {openPrimary ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openPrimary} timeout='auto' unmountOnExit>
                    <List disablePadding>
                        {data.map((item, index) => (
                            item.levelid === 1 ? (
                                <ListItemButton key={index} sx={{ pl: 3 }}>
                                    <ListItemIcon></ListItemIcon>
                                    <Link to={`/subject/${item.classid}`} style={{ color: "black", textDecoration: "none" }}>
                                        <Typography sx={{ fontSize: '13px', marginRight: 'auto', fontWeight: 'bold' }}>
                                            {item.className}
                                        </Typography>
                                    </Link>
                                </ListItemButton>
                            ) : (
                                <Typography key={index}></Typography>
                            )
                        ))}
                    </List>
                </Collapse>

                <ListItemButton
                sx={{
                    backgroundColor: isSecondaryClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    borderRadius: '10px',
                    transition: 'background-color 0.3s ease',
                  }}
                 onClick={handleSecondaryClick}>
                    <ListItemIcon>
                        <AccountBalanceIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: '16px', marginRight: 'auto', }}>Cấp 2 </Typography>
                    {openSecondary ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openSecondary} timeout='auto' unmountOnExit>
                    <List disablePadding>
                        {data.map((item, index) => (
                            item.levelid === 2 ? (
                                <ListItemButton key={index} sx={{ pl: 3 }}>
                                    <ListItemIcon></ListItemIcon>
                                    <Link to={`/subject/${item.classid}`} style={{ color: "black", textDecoration: "none" }}>
                                        <Typography sx={{ fontSize: '13px', marginRight: 'auto', fontWeight: 'bold' }}>
                                            {item.className}
                                        </Typography>
                                    </Link>
                                </ListItemButton>
                            ) : (
                                <Typography key={index}></Typography>
                            )
                        ))}
                    </List>
                </Collapse>

                <ListItemButton
                sx={{
                    backgroundColor: isHighsClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    borderRadius: '10px',
                    transition: 'background-color 0.3s ease',
                  }}
                 onClick={handleHighschoolClick}>
                    <ListItemIcon>
                        <SchoolIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: '16px', marginRight: 'auto', }}>Cấp 3 </Typography>
                    {openHighschool ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openHighschool} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {data.map((item, index) => (
                            item.levelid === 3 ? (
                                <ListItemButton key={index} sx={{ pl: 3 }}>
                                    <ListItemIcon></ListItemIcon>
                                    <Link to={`/subject/${item.classid}`} style={{ color: "black", textDecoration: "none" }}>
                                        <Typography sx={{ fontSize: '13px', marginRight: 'auto', fontWeight: 'bold' }}>
                                            {item.className}
                                        </Typography>
                                    </Link>
                                </ListItemButton>
                            ) : (
                                <Typography key={index}></Typography>
                            )
                        ))}
                    </List>
                </Collapse>

                <ListItemButton
                sx={{
                    backgroundColor: isInforClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    borderRadius: '10px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onClick={handleInforClick}
                 component={Link} to="https://www.facebook.com/profile.php?id=61554408680276" target="_blank">
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: '16px', marginRight: 'auto', }}>
                        Liên lạc với chúng tôi
                        </Typography>
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Sidebar;
