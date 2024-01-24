import { Box, Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useCallback, useEffect, useState } from "react";
import CreateModal from "../../components/Staff/DiscountManagement/CreateModal";


function ManagerPayment() {
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const [dataDicount, setDicount] = useState([]);
    const [page, setPage] = useState('');
    const [pages, setPages] = useState(1);
    const [open, setOpen] = useState(false);
    const fetchData = useCallback((pageNumber) => {
        axios
            .get(`http://localhost:8081/staffsconnect/payfortutor?staffid=${decodedToken.id}&page=${pageNumber}`)
            .then((response) => {
                setDicount(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [decodedToken.id]);

    useEffect(() => {
        fetchData(pages);
    }, [pages, fetchData]);

    const handlePageChange = (pageNumber) => {
        setPages(pageNumber);
    };

    useEffect(() => {
        axios.get(`http://localhost:8081/staffsconnect/totalpay?staffid=${decodedToken.id}`)
            .then((response) => {
                setPage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [decodedToken.id]);

    const handleClickChange = async (tutorid, event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            await axios.put(
                `http://localhost:8081/staffsconnect/accept/${tutorid}`
            );
            window.location.href = "/managerpayment";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box style={{ width: '100%', padding: '20px' }}>
            <CreateModal isShowModal={open} setOpen={setOpen} />
            <Box style={{ display: 'inline-block', width: '100%' }}>
                <Box style={{ width: '100%', }}>
                    <Box style={{ marginBottom: "20px" }}>
                        <Typography variant="h3" style={{ fontFamily: "cursive", }}>
                            Thanh toán cho gia sư
                        </Typography>
                    </Box>
                </Box>
                <Box style={{ display: 'inline-block', height: 200, width: '100%' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>MSGS</TableCell>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Tên gia sư</TableCell>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Email</TableCell>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Số điện thoại</TableCell>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Số tiền</TableCell>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Số tài khoản</TableCell>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Ngân hàng</TableCell>
                                    <TableCell style={{ fontSize: "15px", fontFamily: "cursive", textAlign: "center" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(dataDicount) ? (
                                    (dataDicount).map((item) => (
                                        <TableRow key={item.tutorid}>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.tutorid}</TableCell>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.nametutor}</TableCell>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.email}</TableCell>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.phone}</TableCell>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>
                                                {item.money.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.banknumber}</TableCell>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>{item.bank}</TableCell>
                                            <TableCell style={{ fontSize: "12px", fontFamily: "cursive", textAlign: "center" }}>
                                                {item.date ? (
                                                    <Typography style={{ marginRight: '10px', fontSize: "12px", fontFamily: "cursive", color: 'green' }}>
                                                        Đã duyệt
                                                    </Typography>
                                                ) : (
                                                    <Button variant="contained" type="danger" style={{ backgroundColor: '#FDE9AF', color: 'black', marginRight: '10px', fontSize: "10px", fontFamily: "cursive", }} onClick={(event) => handleClickChange(item.tutorid, event)}>
                                                        Duyệt
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell style={{ fontSize: "10px", fontFamily: "cursive", textAlign: "center" }} colSpan={8}>No data available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                    <Pagination count={page.length} page={pages} onChange={handlePageChange} sx={{ '& .MuiPaginationItem-root': { fontSize: '15px', minWidth: '50px' } }} />
                </Box>
            </Box>
        </Box>
    );
}

export default ManagerPayment;