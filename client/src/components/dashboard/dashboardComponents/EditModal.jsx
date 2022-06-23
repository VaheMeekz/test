import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import {DialogActions} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import {style} from "../../helpers/modal/style";
import {Formik} from "formik";
import {workspaceValidateSchema} from "../../helpers/schemas/validate";
import { editWorkspace} from "../../../store/actions/workspaceAction";
import Grid from "@mui/material/Grid";
import Input from "../../helpers/input/Input";

const EditModal = ({open, close}) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.workspace.single);
    const loading = useSelector(state => state.workspace.singleLoading);
    const variants = useSelector(state => state.workspace.variants)
    const [loadingVariants, setLoadingVariants] = useState(false)
    useEffect(() => {
        if (variants !== null || variants !== false) {
            setLoadingVariants(false)
        }else if(variants == false){
            close()
        }
    }, [variants])

    console.log(variants,"++++++++++")

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
                        Edit
                    </Typography>
                    {
                        loading ? <CircularProgress/> : (
                            <Box>
                                <Formik
                                    initialValues={{
                                        name: data.name, domain: data.domain, subDomain: data.subDomain
                                    }}
                                    validationSchema={workspaceValidateSchema}
                                    onSubmit={(values) => {
                                        dispatch(editWorkspace(data.id,values.name, values.domain, values.subDomain))
                                    }}>
                                    {({
                                          values, errors, touched, handleChange, handleBlur, handleSubmit,
                                      }) => (
                                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                            <Grid item xs={12}>
                                                <Input name={"name"} type={"text"} fullWidth={true} label={"Name"}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Input name={"domain"} type={"text"} fullWidth={true} label={"Domain"}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Input name={"subDomain"} type={"text"} fullWidth={true}
                                                       label={"Subdomain"}/>
                                                {
                                                    variants != null || variants !== false ? (
                                                        <div>
                                                            <h3>Subdomain Already Exist</h3>
                                                            {variants?.map((variant, index) => {
                                                                return (
                                                                    <p key={index}>{index+1}. Variant: {variant}</p>
                                                                )
                                                            })}
                                                        </div>
                                                    ) : null
                                                }
                                            </Grid>
                                            <DialogActions>
                                                <Button variant="outlined" onClick={close}>
                                                    Cancel
                                                </Button>
                                                {
                                                    !variants &&  loadingVariants ? <CircularProgress/> : (
                                                        <Button variant="contained" type="submit">
                                                            Edit
                                                        </Button>
                                                    )}
                                            </DialogActions>
                                        </Box>
                                    )}
                                </Formik>
                            </Box>
                        )
                    }

                </Box>
            </Modal>
        </div>
    )
}

export default EditModal;