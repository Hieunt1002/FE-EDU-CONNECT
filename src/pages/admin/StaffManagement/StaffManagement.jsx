import { useCallback, useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Modal, Avatar, Select } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import styled from "@emotion/styled";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';

const AvatarWrapper = styled('div')({
    position: 'relative',
    height: 150, // Decreased height
    width: 150, // Decreased width
    margin: '20px auto', // Adjusted margin
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '1px 1px 15px -5px black',
    transition: 'all .3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        cursor: 'pointer',
    },
    '&:hover .profile-pic': {
        opacity: 0.5,
    },
});

const ProfilePic = styled(Avatar)({
    height: '100%',
    width: '100%',
    transition: 'all .3s ease',
    '&:after': {
        fontFamily: 'FontAwesome',
        content: '"\f007"',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        fontSize: 190,
        background: '#ecf0f1',
        color: '#34495e',
        textAlign: 'center',
    },
});

const UploadButton = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '50%',
    width: '50%',
});

const FileUpload = styled(Input)({
    display: 'none',
});

function StaffManagement() {

    const [searchName, setSearchName] = useState("");
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [staff, setStaff] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [city, setCity] = useState('');
    const [wards, setWards] = useState('');
    const [salary, setSalary] = useState('');
    const [experience, setExperience] = useState('');
    const handleCloses = () => setOpen(false);
    const handleCloses1 = () => setOpen1(false);

    const handleSearch = (event) => {
        setSearchName(event.target.value);
    };

    const handleLinkClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            axios
                .get(`http://localhost:8081/staffsconnect/ViewInfoStaff?staffId=${staffs}`)
                .then((response) => {
                    setStaff(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            setOpen(true)
        } catch (error) {
            console.error(error);
        }
    };
    const handleOpen = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            axios
                .get(`http://localhost:8081/staffsconnect/ViewInfoStaff?staffId=${staffs}`)
                .then((response) => {
                    setStaff(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            setOpen1(true)
        } catch (error) {
            console.error(error);
        }
    };
    const [data, setData] = useState([]);
    const [pages, setPages] = useState(1);
    const fetchData = useCallback((pageNumber) => {
        axios
            .get(`http://localhost:8081/admin/staff?page=${pageNumber}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        fetchData(pages);
    }, [pages, fetchData]);

    const handlePageChange = (event, pageNumber) => {
        setPages(pageNumber);
    };

    const [page, setPage] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/admin/totalpage`)
            .then((response) => {
                setPage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleClick = (event, staffid) => {
        setAnchorEl(event.currentTarget);
        setStaffs(staffid);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickChange = async (staffid, event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            await axios.put(
                `http://localhost:8081/admin/staff/updatesalary`,
                {
                    staffid: staffid,
                    salary: staff.salary,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            window.location.href = "/staffmanagement";
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (staffid, event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            await axios.delete(
                `http://localhost:8081/admin/staff/deletestaff/${staffid}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            window.location.href = "/staffmanagement";
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
        height: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        paddingTop: '20px'
    };

    const [profilePicSrc, setProfilePicSrc] = useState('');
    const [file, setFile] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setProfilePicSrc(reader.result);
        };
        setFile(file);
        reader.readAsDataURL(file);
    };

    const handleUploadButtonClick = () => {
        document.getElementById('file-upload').click();
    };

    const handleSubmitAdd = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('fullName', name);
            formData.append('email', email);
            formData.append('password', pass);
            formData.append('phone', phone);
            formData.append('gender', gender);
            formData.append('birthdate', birthdate);
            formData.append('file', file);
            formData.append('city', city);
            formData.append('wards', wards);
            formData.append('salary', salary);
            formData.append('experience', experience);

            await axios.post(
                "http://localhost:8081/admin/addstaff",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            window.location.href = "/staffmanagement";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box >
            <Box sx={{
                backgroundColor: "#D9D9D9",
                height: "100px",
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "20px",
                borderRadius: "5px",
                border: '1px solid #000000', p: 2
            }}>
                <Box sx={{
                    textAlign: "center",
                }}>
                    <Typography sx={{
                        fontSize: "40px",
                        fontFamily: "cursive"
                    }}>
                        Danh sách nhân viên
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                backgroundColor: "#D9D9D9",
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "20px",
                borderRadius: "5px",
                border: '1px solid #000000', p: 2,
            }}>
                <Box sx={{
                    marginLeft: '80%',
                    marginTop: '10px',
                }}>
                    <TextField
                        label="Tìm Kiếm"
                        sx={{
                            borderRadius: '11%',
                            width: '200px',
                        }}
                        InputProps={{
                            style: {
                                height: '45px',
                                fontSize: "14px"
                            },
                        }}
                        value={searchName}
                        onChange={handleSearch}
                    />
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "15px",
                }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>STT</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Tên nhân viên</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Số điện thoại</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Ngày đăng ký</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Lương</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>Trạng thái</TableCell>
                                    <TableCell sx={{ fontSize: "20px", fontFamily: "cursive", textAlign: "center" }}>
                                        <AddBoxIcon sx={{ fontSize: "25px" }} onClick={handleOpenModal} />
                                        <Modal
                                            open={openModal}
                                            onClose={handleCloseModal}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Box sx={{ backgroundColor: "#D9D9D9", width: "400px", height: "570px", borderRadius: "10px", border: '2px solid #000000', p: 2, }}>
                                                <form onSubmit={handleSubmitAdd}>
                                                    <AvatarWrapper>
                                                        <ProfilePic alt="Profile Pic" src={profilePicSrc} className="profile-pic" />
                                                        <UploadButton>
                                                            <IconButton
                                                                color="primary"
                                                                aria-label="Upload File"
                                                                component="span"
                                                                className="fa-arrow-circle-up"
                                                                onClick={handleUploadButtonClick}
                                                            >
                                                                <CloudUploadIcon sx={{ fontSize: 130 }} />
                                                            </IconButton>
                                                        </UploadButton>
                                                        <FileUpload
                                                            id="file-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                        />
                                                    </AvatarWrapper>
                                                    <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between" }}>Nhân viên:
                                                        <TextField
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            InputProps={{
                                                                style: {
                                                                    fontSize: "14px",
                                                                    height: "28px",
                                                                },
                                                            }}
                                                        />
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between" }}>Email:
                                                        <TextField
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            InputProps={{
                                                                style: {
                                                                    fontSize: "14px",
                                                                    height: "28px",
                                                                },
                                                            }}
                                                        />
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between" }}>Mật khẩu:
                                                        <TextField
                                                            value={pass}
                                                            onChange={(e) => setPass(e.target.value)}
                                                            type="password"
                                                            InputProps={{
                                                                style: {
                                                                    fontSize: "14px",
                                                                    height: "28px",
                                                                },
                                                            }}
                                                        />
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between" }}>Số điện thoại:
                                                        <TextField
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            InputProps={{
                                                                style: {
                                                                    fontSize: "14px",
                                                                    height: "28px",
                                                                },
                                                            }}
                                                        />
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between" }}>
                                                        Giới tính:
                                                        <Select
                                                            sx={{
                                                                fontSize: "14px",
                                                                height: "28px",
                                                                width: "202px"
                                                            }}
                                                            value={gender}
                                                            onChange={(e) => setGender(e.target.value)}
                                                        >
                                                            <MenuItem value={1}>Nam</MenuItem>
                                                            <MenuItem value={0}>Nữ</MenuItem>
                                                        </Select>
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between" }}>Ngày sinh:
                                                        <TextField
                                                            value={birthdate}
                                                            onChange={(e) => setBirthdate(e.target.value)}
                                                            InputProps={{
                                                                style: {
                                                                    fontSize: "14px",
                                                                    height: "28px",
                                                                },
                                                            }}
                                                        />
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between" }}>Thành phố:
                                                        <TextField
                                                            value={city}
                                                            onChange={(e) => setCity(e.target.value)}
                                                            InputProps={{
                                                                style: {
                                                                    fontSize: "14px",
                                                                    height: "28px",
                                                                },
                                                            }}
                                                        />
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between" }}>Huyện/Phường:
                                                        <TextField
                                                            value={wards}
                                                            onChange={(e) => setWards(e.target.value)}
                                                            InputProps={{
                                                                style: {
                                                                    fontSize: "14px",
                                                                    height: "28px",
                                                                },
                                                            }}
                                                        />
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between" }}>Lương:
                                                        <TextField
                                                            value={salary}
                                                            onChange={(e) => setSalary(e.target.value)}
                                                            InputProps={{
                                                                style: {
                                                                    fontSize: "14px",
                                                                    height: "28px",
                                                                },
                                                            }}
                                                        />
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "17px", display: "flex", justifyContent: "space-between" }}>Kinh nghiệm:
                                                        <TextField
                                                            value={experience}
                                                            onChange={(e) => setExperience(e.target.value)}
                                                            InputProps={{
                                                                style: {
                                                                    fontSize: "14px",
                                                                    height: "28px",
                                                                },
                                                            }}
                                                        />
                                                    </Typography>
                                                    <Box sx={{ marginTop: "30px", marginLeft: "64%" }}>
                                                        <Button type="submit" sx={{ backgroundColor: "green", color: "black", fontSize: "12px", fontWeight: "600" }}>Lưu</Button>
                                                        <Button sx={{ backgroundColor: "red", color: "black", fontSize: "12px", fontWeight: "600" }} onClick={handleCloseModal}>Huỷ</Button>
                                                    </Box>
                                                </form>
                                            </Box>
                                        </Modal>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.staffid}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.fullname}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.phone}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>{item.createdate}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                            {item.salary.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center", color: item.status === 1 ? 'green' : 'red' }}>
                                            {item.status === 1 ? 'còn hoạt động' : 'ngừng hoạt động'}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>
                                            <MoreVertIcon sx={{ fontSize: "25px" }} onClick={(event) => handleClick(event, item.staffid)} />
                                            <Menu
                                                id={`actions-${item.staffid}`}
                                                keepMounted
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={(event) => handleLinkClick(event)}>Thông tin</MenuItem>
                                                <MenuItem onClick={(event) => handleOpen(event)}>Sửa</MenuItem>
                                                <MenuItem onClick={(event) => handleDelete(event)}>Xoá</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>
                    <Modal
                        open={open}
                        onClose={handleCloses}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Avatar src={`http://localhost:8081/edu/file/files/${staff.img}`} sx={{ width: '90px', height: '90px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px' }} />
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>Tên Nhân viên: {staff.fullName} - {staff.staffid}</Typography>
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>Ngày Sinh: {staff.birthdate}</Typography>
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>SĐT: {staff.phone}</Typography>
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>Email: {staff.email}</Typography>
                            <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>Địa chỉ: {staff.wards}-{staff.city}</Typography>
                        </Box>
                    </Modal>
                    <Modal
                        open={open1}
                        onClose={handleCloses1}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Box sx={{ marginTop: '40px' }}>
                                <form onSubmit={(event) => handleClickChange(staff.staffid, event)}>
                                    <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>Tên Nhân viên: {staff.fullName}</Typography>
                                    <Typography sx={{ fontSize: '15px', fontFamily: 'cursive', textAlign: 'center' }}>MSNV: {staff.staffid}</Typography>
                                    <TextField
                                        sx={{ marginTop: '20px', marginLeft: '26%' }}
                                        label='Lương'
                                        value={staff.salary}
                                        onChange={(e) => setStaff({ ...staff, salary: e.target.value })}
                                        InputLabelProps={{
                                            shrink: staff.salary ? true : undefined,
                                        }}
                                        InputProps={{
                                            style: {
                                                fontSize: '14px',
                                                height: '45px'
                                            },
                                        }}
                                    />

                                    <Box sx={{ marginTop: "30px", marginLeft: "34%", display: 'flex' }}>
                                        <Button type="submit" sx={{ backgroundColor: "green", color: "black", fontSize: "12px", fontWeight: "600" }}>Lưu</Button>
                                        <Button sx={{ backgroundColor: "red", color: "black", fontSize: "12px", fontWeight: "600", marginLeft: '10px' }} onClick={handleCloses1}>Huỷ</Button>
                                    </Box>
                                </form>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                    <Pagination count={page.length}
                        page={pages}
                        onChange={handlePageChange} sx={{ '& .MuiPaginationItem-root': { fontSize: '15px', minWidth: '50px' } }} />
                </Box>
            </Box>
        </Box>
    );
}

export default StaffManagement;