import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Formik} from "formik";
import {workspaceValidateSchema} from "../../helpers/schemas/validate";
import Grid from "@mui/material/Grid";
import Input from "../../helpers/input/Input";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {closeModalAC, createWorkspaceAC} from "../../../store/actions/workspaceAction";
import Typography from "@mui/material/Typography";
import {style} from "../../helpers/modal/style";
import CircularProgress from "@mui/material/CircularProgress";

const AddModal = ({open, close}) => {
    const dispatch = useDispatch();
    const variants = useSelector(state => state.workspace.variants)
    const closeModal = useSelector(state => state.workspace.close)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (variants !== null || variants !== false) {
            setLoading(false)
        }
        if(closeModal){
            close()
            dispatch(closeModalAC(false))
        }
    }, [variants])

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
                        Add New Domain
                    </Typography>

                            <Formik
                                initialValues={{
                                    name: "", domain: "", subDomain: ""
                                }}
                                validationSchema={workspaceValidateSchema}
                                onSubmit={(values) => {
                                    dispatch(createWorkspaceAC(values.name, values.domain, values.subDomain))
                                    setLoading(true)
                                    // variants == null && close()
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
                                                variants?.length || variants !== false ? (
                                                    <div>
                                                        {variants?.map((variant, index) => {
                                                            return (
                                                                <p key={index}>{index+1}. Variant: {variant}</p>
                                                            )
                                                        })}
                                                    </div>
                                                ) : null
                                            }
                                        </Grid>
                                        {
                                          !variants &&  loading ? <CircularProgress/> : (
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                        >
                                            Add
                                        </Button>
                                        )}
                                    </Box>
                                )}
                            </Formik>
                </Box>
            </Modal>
        </div>
    )
}

export default AddModal;