import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useDispatch} from "react-redux";
import {DialogActions} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {deleteWorkspaceAC} from "../../../store/actions/workspaceAction";
import {style} from "../../helpers/modal/style";

const DeleteModal = ({open, close,id}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteWorkspaceAC(id))
        close()
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                       Delete ?
                    </Typography>
                    <DialogActions>
                        <Button variant="outlined" onClick={close}>
                            No
                        </Button>
                        <Button  color="error"  variant="contained" onClick={handleDelete}>
                            Yes
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>
        </div>
    )
}

export default DeleteModal;