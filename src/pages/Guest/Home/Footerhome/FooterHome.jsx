import { Box, Button, Typography } from "@mui/material";
import React from "react";
import IMAGE from "./footerhome.jpg"
import { Link } from "react-router-dom";


function FooterHome() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${IMAGE})`,
            backgroundSize: "100% auto",
        }}>
            <Typography sx={{
                fontSize: "24px",
                textAlign: "center",
                marginTop: "10px"
            }}>
                Để trở thành thành viên mới của EDU-CONNECT
            </Typography>
            <Link to="./SignUp">
                <Button variant="contained" color="success"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "cursive",
                        color: "red",
                        height: "35px",
                        width: "150px",
                        borderRadius: "15px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        backgroundColor: "white"
                    }}>
                    Đăng ký ngay
                </Button>
            </Link>
        </Box>
    );
}

export default FooterHome;
