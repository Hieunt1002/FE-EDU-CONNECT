import { Box, List, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import React from "react";


function SideBar() {
    const [isHomeClicked, setIsHomeClicked] = React.useState(false);
    const [isInforClicked, setIsInforClicked] = React.useState(false);

    const handleHomeClick = () => {
        setIsHomeClicked(true);
        setIsInforClicked(false);
    };

    const handleInforClick = () => {
        setIsHomeClicked(false);
        setIsInforClicked(true);
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
                  onClick={handleHomeClick}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/admin' style={{ color: "black", textDecoration: "none" }}>Dashboard</Link></Typography>
                </ListItemButton>

                <ListItemButton
                sx={{
                    backgroundColor: isInforClicked ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    borderRadius: '10px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onClick={handleInforClick}
                >
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: '16px', marginRight: 'auto' }}><Link to='/staffmanagement' style={{ color: "black", textDecoration: "none" }}>Quản lý nhân viên</Link></Typography>
                </ListItemButton>

            </List>
        </Box>
    );
}

export default SideBar;