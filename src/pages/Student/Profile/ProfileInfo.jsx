import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { MenuItem } from '@mui/material';

function ProfileInfo({ wards, userData, city, handleInputChange, isEditing }) {

  return (
    <>
      <TextField
        label='Họ Và Tên'
        fullWidth
        value={userData.fullname}
        onChange={(e) => handleInputChange('fullname', e.target.value)}
        disabled={!isEditing}
        InputLabelProps={{
          shrink: userData.fullname ? true : undefined,
        }}
      />
      <TextField
        label='Email'
        fullWidth
        value={userData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        disabled={!isEditing}
        InputLabelProps={{
          shrink: userData.email ? true : undefined,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: '30px',
        }}
      >
        <TextField
          label='Lớp'
          value={userData.class}
          onChange={(e) => handleInputChange('class', e.target.value)}
          disabled={!isEditing}
          sx={{
            width: '50%',
          }}
          InputLabelProps={{
            shrink: userData.class ? true : undefined,
          }}
        />
        <Box sx={{ width: '50%', m: 0 }}>
          <TextField
            select
            label='Giới Tính'
            value={userData.gender !== undefined ? userData.gender : ''}
            InputLabelProps={{
              shrink: userData.gender ? true : undefined,
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
          value={userData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          disabled={!isEditing}
          sx={{
            width: '50%',
          }}
          InputLabelProps={{
            shrink: userData.phone ? true : undefined,
          }}
        />
      </Box>
    </>
  );
}

export default ProfileInfo;