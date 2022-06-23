import axios from 'axios'
import {apiUrl, clientUrl, token} from "../../config/keys";
import {CHANGE_STATUS, SUCCESS_REGISTER} from "../types";
import Swal from "sweetalert2";

export const registerAC = (firstName, lastName, email, password) => {
    return async (dispatch) => {
        axios.post(`${apiUrl}/users/register`, {
            firstName, lastName, email, password
        })
            .then(function (response) {
                if (response.data.success) {
                    dispatch({
                        type: SUCCESS_REGISTER,
                        payload: true,
                    });
                    window.location.href = `${clientUrl}/sign-in`;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const changeStatusAC = (email, password) => {
    return async (dispatch) => {
        axios.post(`${apiUrl}/users/login`, {
            email, password
        })
            .then(function (response) {
                if (response.data.success) {
                    dispatch({
                        type: CHANGE_STATUS,
                        payload: true,
                    });
                    localStorage.setItem('token', response.data.user.token)
                    window.location.href = `${clientUrl}/`;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const logoutAC = () => {
    return async (dispatch) => {
        axios.post(`${apiUrl}/users/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(function (response) {
                if (response.data.success) {
                    dispatch({
                        type: CHANGE_STATUS,
                        payload: false,
                    });
                    localStorage.removeItem("token")
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    window.location.href = `${clientUrl}/sign-in`;
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

export const authAC = (data) => {
    return {
        type: CHANGE_STATUS,
        payload: data,
    }
}

