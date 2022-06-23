import {CHANGE_STATUS, SUCCESS_REGISTER} from "../types";

const initialState = {
    auth: false, registerSuccess: false
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_REGISTER:
            return {
                ...state, registerSuccess: true
            }
        case CHANGE_STATUS:
            return {
                ...state, auth: true
            }
        default:
            return state
    }
}