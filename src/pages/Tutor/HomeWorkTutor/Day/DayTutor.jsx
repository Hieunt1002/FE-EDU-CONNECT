import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

export default function DatePickerValue() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <Box sx={{
          '& .MuiInputBase-input': { fontSize: '16px' },
          border: "1px solid #000000", borderRadius: "10px", backgroundColor: "white"
        }}>
          <DatePicker
            label=""
            value={value}
            onChange={(newValue) => setValue(newValue)}
            format="DD/MM/YYYY"
          />
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
}