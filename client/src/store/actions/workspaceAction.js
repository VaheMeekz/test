import axios from "axios";
import {
    ADD_NEW_WORKSPACE,
    DELETE_WORKSPACE,
    GET_WORKSPACES,
    GET_SINGLE_WORKSPACE,
    EDIT_WORKSPACE,
    GET_VARIANTS, GET_CLEAR_WORKSPACE
} from "../types";
import {apiUrl, token} from "../../config/keys";
import Swal from "sweetalert2";

export const getWorkspacesAC = (offset, limit) => {
    return async (dispatch) => {
        axios.get(`${apiUrl}/workspace`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params:{
                offset, limit
            }
        })
            .then(function (response) {
                dispatch({
                    type: GET_WORKSPACES,
                    payload: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

export const createWorkspaceAC = (name, domain, subDomain) => {
    return async (dispatch) => {
        axios.post(`${apiUrl}/workspace`, {
            name, domain, subDomain
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(function (response) {
                if (response.data.newWorkspace) {
                    dispatch({
                        type: ADD_NEW_WORKSPACE,
                        payload: response.data.newWorkspace,
                    });
                    dispatch({
                        type:GET_VARIANTS,
                        payload:false
                    })
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }else if(response.data.variant){
                    dispatch({
                        type:GET_VARIANTS,
                        payload:response.data.variants
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

export const deleteWorkspaceAC = (id) => {
    return async (dispatch) => {
        axios.post(`${apiUrl}/workspace/delete`, {
            id
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(function (response) {
                if (response.data.success) {
                    dispatch({
                        type: DELETE_WORKSPACE,
                        payload: id,
                    });
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

export const getSingleWorkspaceAC = (id) => {
    return async (dispatch) => {
        axios.get(`${apiUrl}/workspace/single`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id
            }
        })
            .then(function (response) {
                dispatch({
                    type: GET_SINGLE_WORKSPACE,
                    payload: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
}

export const editWorkspace = (id, name, domain, subDomain) => {
    return async (dispatch) => {
        axios.put(`${apiUrl}/workspace/edit`, {
            id, name, domain, subDomain
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(function (response) {
                console.log(response.data,"pppppppppppppppppppp")
                if(response.data.variant){
                    dispatch({
                        type:GET_VARIANTS,
                        payload:response.data.variants
                    })
                }else {
                    dispatch({
                        type: EDIT_WORKSPACE,
                        payload: response.data,
                    });
                    dispatch({
                        type:GET_VARIANTS,
                        payload:false
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
}

export const clearWorkspace = () => {
    return ({
        type:GET_CLEAR_WORKSPACE,
        payload:null
    })
}