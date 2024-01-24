import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FormControl, InputAdornment, List, ListItem, ListItemText, MenuItem } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

function ProfileInfo({city, wards, userData, handleInputChange, isEditing }) {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <TextField
        label='Họ Và Tên'
        fullWidth
        value={userData.fullname || ''}
        onChange={(e) => {
          const inputValue = e.target.value;
          const regex = /^[\p{L}\s]*$/u;
          if (regex.test(inputValue)) {
            handleInputChange('fullname', inputValue);
          }
        }}
        disabled={!isEditing}
        InputLabelProps={{
          shrink: userData.fullname ? true : undefined,
        }}
      />
      <TextField
        label='Email'
        fullWidth
        value={userData.email || ''}
        onChange={(e) => handleInputChange('email', e.target.value)}
        disabled={true}
        InputLabelProps={{ shrink: true }}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: '30px',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '50%' }}>
          <TextField
            select
            label='Giới Tính'
            value={userData.gender !== undefined ? userData.gender : ''}
            InputLabelProps={{
              shrink: true,
            }}
            disabled={!isEditing}
            sx={{
              width: '100%',
            }}
            onChange={(e) => handleInputChange('gender', e.target.value)}
          >
            <MenuItem value={1}>Nam</MenuItem>
            <MenuItem value={0}>Nữ</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ width: '50%' }}>
          <FormControl fullWidth disabled={!isEditing}>
            <List>
              <Box>
                <TextField
                  id='subj'
                  label='Chuyên Môn'
                  value={userData.courseList ? userData.courseList.length.toString() : 'null'}
                  onClick={handleClick}
                  sx={{
                    width: '200px',
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  zIndex: 99,
                  width: '200px',
                }}
              >
                {open &&
                  userData.courseList.map((course) => (
                    <ListItem key={course.classcourseid} disableGutters>
                      <ListItemText primary={`${course.courseName} ${course.class}`} />
                    </ListItem>
                  ))}
              </Box>
            </List>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: '30px',
        }}
      >
        <TextField
          select
          label='Huyện'
          fullWidth
          value={userData.wards || ''}
          onChange={(e) => handleInputChange('wards', e.target.value)}
          disabled={!isEditing}
        >
          {city.map((c) => {
            const code = c.name === userData.city ? c.code : null;
            const filteredWards = code ? wards.filter((item) => item.province_code === code) : [];

            return filteredWards.map((item, index) => (
              <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
            ));
          })}
        </TextField>
        <TextField
          select
          label='Tỉnh / Thành Phố'
          fullWidth
          value={userData.city || ''}
          onChange={(e) => handleInputChange('city', e.target.value)}
          disabled={!isEditing}
        >
          {city.map((item, index) => (
            <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
          ))}
        </TextField>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: '30px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Ngày sinh'
            value={userData.birthdate ? dayjs(userData.birthdate) : null}
            onChange={(date) => handleInputChange('birthdate', date)}
            InputLabelProps={{
              shrink: userData.birthdate ? true : undefined,
            }}
            sx={{ width: '50%' }}
            disabled={!isEditing}
          />
        </LocalizationProvider>
        <TextField
          label='Số Điện Thoại'
          value={userData.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          disabled={!isEditing}
          sx={{
            width: '50%',
          }}
        />
      </Box>
    </>
  );
}

export default ProfileInfo;