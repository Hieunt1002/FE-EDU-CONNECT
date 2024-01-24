import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import NotFound from '../assests/404notfound.png';

function PageNotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box>
        <img src={NotFound} width='300px' alt='NotFound' />
        <Typography sx={{ fontSize: '24px', fontFamily: 'cursive', textAlign: 'center' }}>
          Page Not Found!
        </Typography>
        <Typography sx={{ fontSize: '16px', fontFamily: 'cursive', textAlign: 'center' }}>
          The page you are looking for can’t be found
        </Typography>
        <Typography sx={{ fontSize: '16px', fontFamily: 'cursive', textAlign: 'center' }}>
          <Link href='/'>Back to home</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default PageNotFound;
