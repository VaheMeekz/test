import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import AddModal from "./dashboardComponents/AddModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from "./dashboardComponents/DeleteModeal";
import EditModal from "./dashboardComponents/EditModal";
import {useDispatch} from "react-redux";
import {clearWorkspace, getSingleWorkspaceAC} from "../../store/actions/workspaceAction";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const DashboardMain = ({data,page,setPage,pages}) => {
    const dispatch = useDispatch()
    //modals states
    const [open, setOpen] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    //modal functions
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const openDelete = () => setOpenDel(true);
    const closeDelete = () => setOpenDel(false);
    const openEditModal = () => setOpenEdit(true);
    const closeEditModal = () => {
        setOpenEdit(false);
        dispatch(clearWorkspace())
    };

    const handlerOpenEdit = (id) => {
        dispatch(getSingleWorkspaceAC(id));
        openEditModal();
    }
    return (
        <Box m={3} className="workspaceBox">
            <h2 mt={3} mb={3}>
                Workspaces
            </h2>
            <Box mt={3} mb={3}>
                <Button variant="outlined" onClick={handleOpen}><AddIcon/></Button>
            </Box>
            <Box className="tableBox">
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">#</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Domain</TableCell>
                                <TableCell align="left">Subdomain</TableCell>
                                <TableCell align="left">Edit</TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="left">{row.id}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.domain}</TableCell>
                                    <TableCell align="left">{row.subDomain}</TableCell>
                                    <TableCell align="left"><Button variant="outlined"
                                                                    onClick={() => handlerOpenEdit(row.id)}><EditIcon/></Button></TableCell>
                                    <TableCell align="left"><Button variant="outlined"
                                                                    onClick={() => {
                                                                        setCurrentId(row.id);
                                                                        openDelete()
                                                                    }}><DeleteIcon/></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {
              pages.length > 0  ? (
            <Box>
                    <div className="pagBox">
                        <div className="arrowBack">
                            {pages.length - 1 == page ? (<ArrowBackIosIcon
                                onClick={() => {
                                    setPage(page - 1);
                                }}
                            />) : null}
                        </div>
                        {pages.length > 1 && pages.map((s) => {
                            return (<div
                                className={page === s ? "pagItem activePagItem" : "pagItem"}
                                key={s}
                                onClick={() => {
                                    setPage(s);
                                }}
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                {s + 1}
                            </div>);
                        })}
                        <div className="arrowBack">
                            {pages.length - 1 == page ? null : (<ArrowForwardIosIcon
                                onClick={() => {
                                    setPage(page + 1);
                                }}
                            />)}
                        </div>
                    </div>
            </Box>
                ) : null}
            {
                open && <AddModal open={open} close={handleClose}/>
            }
            {
                openDel && <DeleteModal open={openDel} close={closeDelete} id={currentId}/>
            }
            {
                openEdit && <EditModal open={openEdit} close={closeEditModal}/>
            }
        </Box>
    );
};

export default DashboardMain;