import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Box, Typography, Snackbar, } from '@mui/material';
import { useParams } from 'react-router';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import HomeworkTable from './HomeworkTable';
import { jwtDecode } from 'jwt-decode';
import FileTable from './FileTable';
import VideoTable from './VideoTable';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import ProgesstestTable from './Progesstest';
import none from './../../../assests/none.jpg';
import MuiAlert from '@mui/material/Alert';
import { useCallback } from 'react';
import { format } from 'date-fns';



function ExerciseDetailPage() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const token = localStorage.getItem("token");
  const tutor = jwtDecode(token);
  const [homework, setHomework] = useState([]);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState('');
  const [videos, setVideos] = useState([]);
  const [progess, setProgess] = useState([]);
  const [demo, setDemo] = useState([]);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [generalData, setGeneralData] = useState({});
  const params = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  const fetchHomework = useCallback(() => {
    axios
      .get(`http://localhost:8081/exersice/getHomeworkByExercise?exerciseId=${params.exerciseid}`)
      .then((response) => {
        if (response && response.data) {
          setHomework(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching timeline:', error);
      });
  }, [params.exerciseid]);

  const fetchFile = useCallback(() => {
    axios
      .get(`http://localhost:8081/exersice/getfileexercise?bookid=${params.exerciseid}`)
      .then((response) => {
        if (response && response.data) {
          setFiles(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching timeline:', error);
      });
  }, [params.exerciseid]);

  const fetchVideo = useCallback(() => {
    axios
      .get(`http://localhost:8081/exersice/getvideoexercise?bookid=${params.exerciseid}`)
      .then((response) => {
        if (response && response.data) {
          setVideos(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching timeline:', error);
      });
  }, [params.exerciseid]);
  const fetchProgess = useCallback(() => {
    axios
      .get(`http://localhost:8081/exersice/getclassroomexercise?bookid=${params.exerciseid}`)
      .then((response) => {
        if (response && response.data) {
          setProgess(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching timeline:', error);
      });
  },[params.exerciseid]);

  const fetchDemo = useCallback(() => {
    axios
      .get(`http://localhost:8081/demo/listAllDemo/${params.exerciseid}`)
      .then((response) => {
        if (response && response.data) {
          setDemo(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching timeline:', error);
      });
  }, [params.exerciseid]);
  const fetchData = useCallback(() => {
    axios
      .get(`http://localhost:8081/exersice/getExerciseById/${params.exerciseid}`)
      .then((response) => {
        if (response && response.data) {
          setGeneralData(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching timeline:', error);
      });
  }, [params.exerciseid]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  useEffect(() => {
    setFormData({
      title: '',
      file: '',
      demoid: '',
      startDate: '',
      endDate: '',
    });
    setErrors({
      title: '',
      file: '',
      demoid: '',
      startDate: '',
      endDate: '',
    });
  }, [open]);

  useEffect(() => {
    fetchData();
    fetchHomework();
    fetchDemo();
    fetchFile();
    fetchVideo();
    fetchProgess();
  },[fetchData, fetchHomework, fetchDemo, fetchFile, fetchVideo, fetchProgess]);

  const [formData, setFormData] = useState({
    title: '',
    file: '',
    demoid: '',
    startDate: '',
    endDate: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    file: '',
    demoid: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'file' ? files[0] : value,
    }));
    if (name !== 'file')
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
  };

  const handleUploadFile = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = {};

    for (const key in formData) {
      if (key !== 'file')
        if (formData[key] === null || formData[key] === '') {
          newErrors[key] = `Vui lòng nhập giá trị cho trường ${key}`;
          hasError = true;
        }
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }
    try {
      const dateString = formData.startDate;
      const formattedDate = format(new Date(dateString), 'yyyy/MM/dd');
      const dateStringend = formData.endDate;
      const formattedDateend = format(new Date(dateStringend), 'yyyy/MM/dd');
      const formDatas = new FormData();
      formDatas.append("file", formData.file);
      formDatas.append("exerciseid", params.exerciseid);
      formDatas.append("demoid", formData.demoid);
      formDatas.append("title", formData.title);
      formDatas.append("startDate", formattedDate);
      formDatas.append("endDate", formattedDateend);
      formDatas.append("tutorid", tutor.id);
      const response = await axios.post(
        "http://localhost:8081/exersice/addhomework",
        formDatas,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showSnackbar(response.data.message)
      window.location.reload();
    } catch (error) {
    }
    setOpen(false);
    fetchData();
  };
  const handleSubmitVideo = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post(
        "http://localhost:8081/exersice/addvideo",
        {
          exerciseid: params.exerciseid,
          namevideo: name,
          video: link,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showSnackbar(response.data.message)
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitProgess = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post(
        "http://localhost:8081/exersice/addclassroom",
        {
          exerciseid: params.exerciseid,
          nameclassroom: name,
          link: link,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showSnackbar(response.data.message)
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitFile = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post(
        "http://localhost:8081/exersice/addfile",
        {
          exerciseid: params.exerciseid,
          tutorid: tutor.id,
          nameFile: name,
          file: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showSnackbar(response.data.message)
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    paddingTop: '20px',
    borderRadius: '10px'
  };
  return (
    <Box
      sx={{
        height: '100%',
        padding: '10px',
      }}
    >
      <Box
        sx={{
          borderRadius: '5px',
          marginBottom: '10px',
          backgroundColor: '#E2D6D6',
        }}
      >
        <Typography
          sx={{
            fontSize: '40px',
            marginLeft: '2%',
            fontFamily: 'cursive',
            paddingBottom: '20px',
          }}
        >
          {generalData.title}
        </Typography>
      </Box>
      <Box sx={{ padding: '10px', border: '1px solid gray' }}>
        <Box sx={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: '20px',
              marginRight: '20px',
              fontFamily: 'cursive',
            }}
          >
            Bài tập về nhà
          </Typography>
          <Button
            type='button'
            variant='contained'
            color='success'
            sx={{ marginRight: '10px' }}
            onClick={() => setOpen(true)}
          >
            Thêm bài tập về nhà
          </Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              style={{
                backgroundColor: '#fff',
                height: 'fit-content',
                minWidth: '400px',
                width: '50%',
                padding: 30,
                borderRadius: 10,
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  marginRight: '20px',
                  fontFamily: 'cursive',
                  marginBottom: 2,
                }}
              >
                Thêm bài tập về nhà
              </Typography>
              <form
                onSubmit={handleSubmit}
                style={{
                  fontSize: '16px',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label='Tiêu đề'
                      variant='outlined'
                      fullWidth
                      name='title'
                      value={formData.title}
                      error={!!errors.title}
                      helperText={errors.title}
                      InputLabelProps={{
                        style: {
                          fontSize: '14px',
                        },
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant='contained' component='label'>
                      Upload File
                      <input
                        type='file'
                        name='file'
                        hidden
                        accept='.doc, .docx, .xls, .xlsx, .txt, .ppt, .pptx, application/msword, image/*, video/*'
                        onChange={handleChange}
                      />
                    </Button>
                    <Typography
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: '14px',
                        marginTop: '10px',
                      }}
                    >
                      {formData.file?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant='outlined'>
                      <InputLabel style={{ fontSize: '14px' }}>Chọn mô phỏng</InputLabel>
                      <Select
                        name='demoid'
                        value={formData.demoid}
                        onChange={handleChange}
                      >
                        <MenuItem value={1} sx={{ fontSize: '15px' }}>
                          <Box sx={{ display: 'flex' }}>
                            <img
                              src={none}
                              alt='demo'
                              style={{
                                width: 70,
                                height: 30,
                                objectFit: 'contain',
                                marginRight: '10px',
                              }}
                            />
                            <Typography sx={{ fontSize: '15px', marginLeft: '20px' }}>None</Typography>
                          </Box>
                        </MenuItem>
                        {demo.map((item) => (
                          <MenuItem
                            value={item.demoid}
                            key={item.demoid}
                            style={{ fontSize: '14px' }}
                          >
                            <Box sx={{ display: 'flex' }}>
                              <img
                                src={`http://localhost:8081/edu/file/files/${item.img}`}
                                alt='demo'
                                style={{
                                  width: 70,
                                  height: 30,
                                  objectFit: 'contain',
                                  marginRight: '10px',
                                }}
                              />
                              <Typography sx={{ fontSize: '15px', marginLeft: '20px' }}>{item.demoname}</Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label='Chọn ngày bắt đầu'
                      type='date'
                      variant='outlined'
                      fullWidth
                      error={!!errors.startDate}
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          fontSize: '14px',
                        },
                      }}
                      name='startDate'
                      helperText={errors.startDate}
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label='Chọn ngày kết thúc'
                      type='date'
                      variant='outlined'
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          fontSize: '14px',
                        },
                      }}
                      name='endDate'
                      error={!!errors.endDate}
                      helperText={errors.endDate}
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '16px' }}
                  >
                    <Button type='submit' variant='contained' color='primary' size='large'>
                      Thêm
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Modal>
        </Box>
        <HomeworkTable data={homework} exercise={params.exerciseid} fetchData={fetchHomework} />
      </Box>
      <Box sx={{ padding: '10px', border: '1px solid gray' }}>
        <Box sx={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: '20px',
              marginRight: '20px',
              fontFamily: 'cursive',
            }}
          >
            Videos
          </Typography>
          <Button
            type='button'
            variant='contained'
            color='success'
            sx={{ marginRight: '10px' }}
            onClick={() => setOpen1(true)}
          >
            Thêm Videos
          </Button>
          <Modal
            open={open1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={{ marginTop: '40px' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '15px', fontFamily: 'cursive' }}>Thêm Videos</Typography>
                <TextField
                  sx={{ marginTop: '20px', marginLeft: '26%' }}
                  label='Tên Video'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    style: {
                      fontSize: '14px',
                      height: '45px'
                    },
                  }}

                />
                <TextField
                  sx={{ marginTop: '20px', marginLeft: '26%' }}
                  label='Link Video'
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  InputProps={{
                    style: {
                      fontSize: '14px',
                      height: '45px'
                    },
                  }}
                />

                <Box sx={{ marginTop: "30px", marginLeft: "34%", display: 'flex' }}>
                  <Button type="submit" sx={{ backgroundColor: "green", color: "black", fontSize: "12px", fontWeight: "600" }} onClick={handleSubmitVideo}>Lưu</Button>
                  <Button sx={{ backgroundColor: "red", color: "black", fontSize: "12px", fontWeight: "600", marginLeft: '10px' }} onClick={() => setOpen1(false)} >Huỷ</Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
        <VideoTable data={videos} fetchData={fetchData} />
      </Box>
      <Box sx={{ padding: '10px', border: '1px solid gray' }}>
        <Box sx={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: '20px',
              marginRight: '20px',
              fontFamily: 'cursive',
            }}
          >
            Files
          </Typography>
          <Button
            type='button'
            variant='contained'
            color='success'
            sx={{ marginRight: '10px' }}
            onClick={() => setOpen2(true)}
          >
            Thêm Files
          </Button>
          <Modal
            open={open2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={{ marginTop: '40px' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '15px', fontFamily: 'cursive' }}>Thêm File</Typography>
                <TextField
                  sx={{ marginTop: '20px', marginLeft: '20px', width: '90%' }}
                  label='Tên file'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    style: {
                      fontSize: '14px',
                      height: '45px'
                    },
                  }}

                />
                <Button
                  variant="contained"
                  color="primary"
                  component="label" sx={{ marginLeft: '150px', marginTop: '10px' }}
                  startIcon={<CloudUploadIcon />}
                >
                  Chọn File
                  <VisuallyHiddenInput type="file" onChange={handleUploadFile} />
                </Button>

                <Box sx={{ marginTop: "30px", marginLeft: "34%", display: 'flex' }}>
                  <Button type="submit" sx={{ backgroundColor: "green", color: "black", fontSize: "12px", fontWeight: "600" }} onClick={handleSubmitFile}>Lưu</Button>
                  <Button sx={{ backgroundColor: "red", color: "black", fontSize: "12px", fontWeight: "600", marginLeft: '10px' }} onClick={() => setOpen2(false)} >Huỷ</Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
        <FileTable data={files} fetchData={fetchData} />
      </Box>
      <Box sx={{ padding: '10px', border: '1px solid gray' }}>
        <Box sx={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: '20px',
              marginRight: '20px',
              fontFamily: 'cursive',
            }}
          >
            Kiểm Tra trắc nghiệm
          </Typography>
          <Button
            type='button'
            variant='contained'
            color='success'
            sx={{ marginRight: '10px' }}
            onClick={() => setOpen3(true)}
          >
            Thêm bài kiểm tra
          </Button>
          <Modal
            open={open3}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={{ marginTop: '40px' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '15px', fontFamily: 'cursive' }}>Thêm bài kiểm tra</Typography>
                <TextField
                  sx={{ marginTop: '20px', marginLeft: '26%' }}
                  label='Bài Trắc nghiệm'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    style: {
                      fontSize: '14px',
                      height: '45px'
                    },
                  }}

                />
                <TextField
                  sx={{ marginTop: '20px', marginLeft: '26%' }}
                  label='Link bài kiểm tra'
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  InputProps={{
                    style: {
                      fontSize: '14px',
                      height: '45px'
                    },
                  }}
                />

                <Box sx={{ marginTop: "30px", marginLeft: "34%", display: 'flex' }}>
                  <Button type="submit" sx={{ backgroundColor: "green", color: "black", fontSize: "12px", fontWeight: "600" }} onClick={handleSubmitProgess}>Lưu</Button>
                  <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MuiAlert
                      onClose={handleSnackbarClose}
                      severity={snackbarType}
                      sx={{ width: '100%', fontSize: '15px' }}
                    >
                      {snackbarMessage}
                    </MuiAlert>
                  </Snackbar>
                  <Button sx={{ backgroundColor: "red", color: "black", fontSize: "12px", fontWeight: "600", marginLeft: '10px' }} onClick={() => setOpen3(false)} >Huỷ</Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
        <ProgesstestTable data={progess} fetchData={fetchData} />
      </Box>
    </Box>
  );
}

export default ExerciseDetailPage;
