import { Button } from '@mui/base';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Alert, Box, Snackbar, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import ExerciseList from "./ExerciseList"
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
function ExerciseListPage() {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState('');
  const { bookid } = useParams();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const onCreateExercise = useCallback(async () => {
    if (course)
      await axios.post('http://localhost:8081/exersice/addexercise', {
        bookid: bookid,
        title: course,
      });
    setShowSnackbar(true);
    setOpen(false)
    fetchData()
  }, []);

  const [data, setData] = useState([]);
  const fetchData = useCallback(() => {
    axios
      .get(`http://localhost:8081/exersice/findexersice?bookid=${bookid}`)
      .then((response) => {
        if (response && response.data) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching timeline:", error);
      });
  }, [bookid]);

  useEffect(() => {
    fetchData()
  },[fetchData]);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    padding: 16,
  };
  return (
    <Box
      sx={{
        height: '100%',
        padding: "10px"
      }}
    >
      <Box
        sx={{
          borderRadius: '5px',
          marginBottom: "10px",
          backgroundColor: '#E2D6D6',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{
              fontSize: '40px',
              marginLeft: '2%',
              fontFamily: 'cursive',
              paddingBottom: '20px',
            }}
          >
            Danh sách bài tập
          </Typography>
          <CreateNewFolderIcon
            onClick={() => setOpen(true)}
            sx={{ fontSize: '30px', marginLeft: 'auto', marginRight: '30px', marginTop: '20px' }}
          />
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography
                id='modal-modal-title'
                component='h2'
                sx={{ marginTop: '-80px', width: '250px', fontSize: '15px', fontFamily: 'cursive' }}
              >
                Thêm chương
              </Typography>
              <TextField
                label='Tên chương'
                InputLabelProps={{
                  style: {
                    fontSize: '12px',
                    color: 'rgba(0, 0, 0, 0.54)',
                  },
                }}
                sx={{
                  borderRadius: '11%',
                  width: '200px',
                  marginLeft: '-30px',
                  marginTop: '40px',
                }}
                onChange={(e) => setCourse(e.target.value)}
                InputProps={{
                  style: {
                    fontSize: '14px',
                    height: '45px',
                  },
                }}
              />
              <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Alert severity="success" onClose={handleCloseSnackbar}>
                  Tạo bài tập thành công!
                </Alert>
              </Snackbar>
              <Button
                variant='contained'
                style={{ width: '70px', fontSize: '18px', marginTop: '30px', marginLeft: '20%' }}
                onClick={() => onCreateExercise()}
              >
                Tạo
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
      <Box>
        <ExerciseList data={data} fetchData={fetchData} />
      </Box>
    </Box>
  );
}

export default ExerciseListPage;
