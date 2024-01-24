import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DatePickerValue from "./Day/DayTutor";



function HomeWorkTutor() {
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
    return (
        <Box sx={{
            backgroundColor: "#D9D9D9",
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "90px",
            marginBottom: "50px",
            borderRadius: "5px",
            border: '1px solid #000000', p: 2,
        }}>
            <Box >
                <Typography sx={{
                    fontSize: "22px",
                    marginBottom: "10px",
                    marginLeft: "5%"
                }}>
                    Tên tiêu đề của bài tập:
                </Typography>
                <TextField sx={{
                    width: "60%",
                    marginLeft: "20%",
                    border: "1px solid #000000",
                    backgroundColor: "white",
                    "& .MuiInputBase-input": {
                        fontSize: "20px",
                    },
                }}
                    placeholder="Tên bài tập"
                ></TextField>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px"
            }}>
                <Button component="label" variant="contained" color="success" startIcon={<CloudUploadIcon />} sx={{ backgroundColor: "#E28888", fontSize: "14px" }}>
                    Upload file
                    <VisuallyHiddenInput type="file" />
                </Button>
                <Button component="label" variant="contained" sx={{ height: "37px", backgroundColor: "#E28888", fontSize: "14px" }} color="success">
                    Chọn mô phỏng
                </Button>
            </Box>
            <Box sx={{
                marginTop: "20px",
            }}>
                <Typography sx={{
                    fontSize: "22px",
                    marginBottom: "10px",
                    marginLeft: "5%"
                }}>
                    NOTES:
                </Typography>
                <Typography sx={{
                    fontSize: "22px",
                    marginBottom: "10px",
                    marginLeft: "15%"
                }}>
                    Note
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                marginTop: "20px",
            }}>
                <Typography sx={{
                    fontSize: "22px",
                    marginLeft: "5%",
                    marginTop: "15px",
                    paddingRight: "40px"
                }}>Bắt đầu:</Typography>
                <DatePickerValue />
            </Box>
            <Box sx={{
                display: "flex",
                marginTop: "20px",
            }}>
                <Typography sx={{
                    fontSize: "22px",
                    marginLeft: "5%",
                    marginTop: "15px",
                    paddingRight: "40px"
                }}>Kết thúc:</Typography>
                <DatePickerValue />
            </Box>
            <Button component="label" variant="contained" sx={{ height: "37px", backgroundColor: "green", fontSize: "14px", marginLeft: "85%", marginTop: "20px" }} color="success">
                Lưu
            </Button>
        </Box>
    );
}

export default HomeWorkTutor;