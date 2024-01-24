import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Modal, Select, Snackbar, TextField, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { jwtDecode } from 'jwt-decode';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Iframe from 'react-iframe';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MuiAlert from '@mui/material/Alert';
import { format } from 'date-fns';


function HomeworkTable(props) {
  const token = localStorage.getItem("token");
  const tutor = jwtDecode(token);
  const [res, setRes] = useState(props.data)
  const [open, setOpen] = useState(false);
  const [demo, setDemo] = useState(null);
  const [demo1, setDemo1] = useState([]);
  const [open1, setOpen1] = useState(false);
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
  const handleOpen1 = (homeworkid) => {
    setDemo(homeworkid);
    setOpen1(true);
  }
  const handleOpen = (link) => {
    setDemo(link);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setRes(props.data)
  }, [props.data]);
  const handleDelete = async (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await axios.delete(
        `http://localhost:8081/exersice/deletehomework/${id}/${tutor.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showSnackbar(response.data)
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const [formData, setFormData] = useState('');
  useEffect(() => {
    if (demo != null) {
      axios.get("http://localhost:8081/exersice/homework/detailhomework?homeworkid=" + demo)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    axios
      .get(`http://localhost:8081/demo/listAllDemo/${props.exercise}`)
      .then((response) => {
        if (response && response.data) {
          setDemo1(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching timeline:', error);
      });
  }, [demo, props.exercise]);
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateString = formData.startdate;
      const formattedDate = format(new Date(dateString), 'yyyy/MM/dd');
      const dateStringend = formData.enddate;
      const formattedDateend = format(new Date(dateStringend), 'yyyy/MM/dd');
      const formDatas = new FormData();
      formDatas.append("homeworkid", formData.homeworkid);
      formDatas.append("file", formData.filesHomework);
      formDatas.append("exerciseid", formData.exerciseid);
      formDatas.append("demoid", formData.demoid);
      formDatas.append("title", formData.titleHomework);
      formDatas.append("startDate", formattedDate);
      formDatas.append("endDate", formattedDateend);
      formDatas.append("tutorid", tutor.id);
      const response = await axios.put(
        "http://localhost:8081/exersice/updatehomework",
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
      console.error(error);
    }
    setOpen1(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 'calc(1.6 * (110vh - 33px))',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  };
  return (
    <TableContainer component={Paper} sx={{}}>
      <Table >
        <TableHead>
          <TableRow style={{ backgroundColor: "#e2d6d6c9" }}>
            <TableCell width={100} style={{ width: 50, fontSize: "14px" }}>ID</TableCell>
            <TableCell style={{ width: 150, fontSize: "14px" }}>Tên bài tập</TableCell>
            <TableCell style={{ minWidth: 130, fontSize: "14px" }}>Tên mô phỏng</TableCell>
            <TableCell style={{ maxWidth: 100, width: 100, minWidth: 100, fontSize: "14px" }}>Mô phỏng</TableCell>
            <TableCell style={{ maxWidth: 150, fontSize: "14px" }}>File</TableCell>
            <TableCell style={{ minWidth: 130, fontSize: "14px" }}>Ngày bắt đầu</TableCell>
            <TableCell style={{ minWidth: 130, fontSize: "14px" }}>Ngày kết thúc</TableCell>
            <TableCell style={{ width: 50, fontSize: "14px" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res.map((row) => (
            <TableRow key={row.homeworkid} style={{ fontSize: "14px" }}>
              <TableCell style={{ fontSize: "14px" }}>{row.homeworkid}</TableCell>
              <TableCell style={{ fontSize: "14px" }}>{row.title}</TableCell>
              {row.demo === null ? (
                <TableCell style={{ fontSize: "14px" }}>None</TableCell>
              ) : (
                <TableCell style={{ fontSize: "14px" }}>{row.demo}</TableCell>
              )}
              <TableCell style={{ fontSize: "14px" }}>
                {row.demo === null ? (
                  <VisibilityOffIcon sx={{ fontSize: "25px", marginLeft: '10px' }} />
                ) : (
                  <RemoveRedEyeIcon sx={{ fontSize: "25px", marginLeft: '10px' }} onClick={() => handleOpen(row.linkDemo)} />
                )}
              </TableCell>
              <TableCell style={{ fontSize: "14px" }}>
                <Link href={`http://localhost:8081/edu/file/fileuser/${row.files}/${tutor.id}`} target="_blank">
                  <InsertDriveFileIcon sx={{ fontSize: "25px", marginLeft: "4%" }} />
                </Link>
              </TableCell>
              <TableCell style={{ fontSize: "14px" }}>{row.startDate}</TableCell>
              <TableCell style={{ fontSize: "14px" }}>{row.endDate}</TableCell>
              <TableCell style={{ fontSize: "14px" }}>
                <Button variant="contained" color="success" sx={{ marginRight: "10px" }} onClick={() => handleOpen1(row.homeworkid)} >
                  Sửa
                </Button>
                <Button variant="contained" color="error" onClick={(e) => handleDelete(row.homeworkid, e)}>
                  Xoá
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Iframe src={demo} styles={{
            height: 'calc(90vh - 33px)',
            width: 'calc(1.6 * (110vh - 33px))',
            border: '1px solid silver',
          }}></Iframe>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={() => setOpen1(false)}
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Tiêu đề'
                variant='outlined'
                fullWidth
                name='title'
                value={formData.titleHomework}
                onChange={(e) => setFormData({ ...formData, titleHomework: e.target.value })}
                InputLabelProps={{
                  style: {
                    fontSize: '14px',
                  },
                }}
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
                  onChange={(e) => setFormData({ ...formData, filesHomework: e.target.files[0] })}
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
                {formData.filesHomework?.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel style={{ fontSize: '14px' }}>Chọn mô phỏng</InputLabel>
                <Select
                  name='demoid'
                  value={formData.demoid}
                  onChange={(e) => setFormData({ ...formData, demoid: e.target.value })}
                >
                  {demo1.map((item) => (
                    <MenuItem
                      value={item.demoid}
                      key={item.demoid}
                      style={{ fontSize: '14px' }}
                    >
                      <img
                        src={`http://localhost:8081/edu/file/files/${item.img}`}
                        alt='demo'
                        style={{
                          width: 100,
                          height: 40,
                          objectFit: 'contain',
                          marginRight: '10px',
                        }}
                      />
                      {item.demoname}
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
                InputLabelProps={{
                  shrink: true,
                  style: {
                    fontSize: '14px',
                  },
                }}
                name='startDate'
                value={formData.startdate}
                onChange={(e) => setFormData({ ...formData, startdate: e.target.value })}
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
                value={formData.enddate}
                onChange={(e) => setFormData({ ...formData, enddate: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '16px' }}
            >
              <Button variant='contained' color='primary' size='large' onClick={(e) => handleUpdateSubmit(e)}>
                Cập nhật
              </Button>
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
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </TableContainer>

  );
}

export default HomeworkTable;
