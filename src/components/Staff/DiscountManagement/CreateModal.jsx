import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, Grid, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default function CreateModal(props) {
  const decodedToken = jwtDecode(localStorage.getItem('token'));
  const { isShowModal, setOpen } = props;
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState('');

  const handleClose = () => setOpen(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      // Define the allowed file types
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];

      // Check if the selected file type is in the allowed types
      if (!allowedTypes.includes(selectedImage.type)) {
        alert('Please select a valid image file (JPG, JPEG, GIF, PNG, SVG).');
        // Clear the input if an invalid file is selected
        e.target.value = null;
        return;
      }

      // Set the file to state if needed
      setImage(selectedImage);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Clear the form fields after submission if needed
    const formData = new FormData();
    formData.append('file', image)
    const myObject = {
      discount,
      description,
      img: image.name,
      startDate,
      endDate,
      title,
      desciption: description,
      staffid: decodedToken.id,
    };
    try {
      //Upload image
      const responseUploadImage = await axios.post('http://localhost:8081/edu/file/uploadImages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (responseUploadImage.status === 200) {
        const response = await axios.post('http://localhost:8081/discount/adddiscount', myObject);
        alert(response.data.message);
        handleClose();
        window.location.reload();
      } else {
        // Handle image upload failure
        console.error('Image upload failed');
      }
      // onSubmit(myObject);
    } catch (error) {
      console.error('An error occurred during the API call', error);
    }
  };
  const handleStartDateChange = (e) => {
    setStartDate(e);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e);
  };
  // const onChangeCallback = ({ target }) => {
  //   // a callback function when user select a date
  // };

  return (


    <Modal
      open={!!isShowModal}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Container maxWidth='lg' style={{ marginTop: '10px', padding: '10px' }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid style={{ float: 'left' }}>
                <Typography variant='h3' style={{ fontFamily: 'cursive' }}>
                  Thêm Mã Giảm Giá
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Giảm Giá'
                  variant='outlined'
                  style={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Tiêu Đề'
                  variant='outlined'
                  sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  accept="image/*"
                  fullWidth
                  variant='outlined'
                  style={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}
                  type="file"
                  id="contained-button-file"
                  onChange={handleImageChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Ngày Bắt Đầu'
                    fullWidth
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: '100%' }}>
                  <DatePicker
                    label='Ngày Kết Thúc'
                    fullWidth
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Mô Tả'
                  variant='outlined'
                  multiline
                  rows={4}
                  style={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                  style={{ float: 'right' }}
                  onClick={handleSubmit}
                >
                  Lưu
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Modal>
  );
}
