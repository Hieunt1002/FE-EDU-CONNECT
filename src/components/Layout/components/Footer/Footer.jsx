import * as React from 'react';
import { Box, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';

function Footer() {
  const handleMailClick = () => {
    const to = encodeURIComponent("capstoneeduconnect@gmail.com");
    const subject = encodeURIComponent("Tiêu đề email");
    const body = encodeURIComponent("Nội dung email");

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`, "_blank");
  };

  return (
    <Box
      sx={{
        height: '77px',
        background: '#D1BD7F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        bottom: '0',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
        <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>EDU-CONNECT</Typography>
        <Typography sx={{ fontSize: "13px" }}>Đến với EDU-CONNECT để nhận được kết quả học tập tốt hơn.</Typography>
      <Box>
        <Link href="https://www.facebook.com/profile.php?id=61554408680276" target="_blank" color="inherit">
          <FacebookIcon sx={{ fontSize: "18px", marginRight:"5px"}} />
        </Link>
        <Link component="button" color="inherit" onClick={handleMailClick}>
          <MailIcon sx={{ fontSize: "18px", marginBottom:"6px"}} />
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;