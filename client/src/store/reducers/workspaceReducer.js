import {
    ADD_NEW_WORKSPACE,
    DELETE_WORKSPACE,
    EDIT_WORKSPACE, GET_CLEAR_WORKSPACE,
    GET_SINGLE_WORKSPACE,
    GET_VARIANTS,
    GET_WORKSPACES
} from "../types";

const initialState = {
    workspaces: null,
    count: null,
    loading: false,
    single: null,
    singleLoading: true,
    variants: null
}


export const workspaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WORKSPACES:
            return {
                ...state, workspaces: action.payload.workspaces, count: action.payload.count, loading: false
            }
        case ADD_NEW_WORKSPACE:
            return {
                ...state, workspaces: [...state.workspaces, action.payload]
            }
        case DELETE_WORKSPACE:
            return {
                ...state,
                workspaces: [...state.workspaces.filter(i => i.id !== action.payload)]
            }
        case GET_SINGLE_WORKSPACE:
            return {
                ...state,
                single: action.payload,
                singleLoading: false
            }
        case EDIT_WORKSPACE:
            const newArr = state.workspaces.map(obj => {
                if (obj.id === action.payload.id) {
                    return {
                        ...obj,
                        name: action.payload.name,
                        domain: action.payload.domain,
                        subDomain: action.payload.subDomain
                    };
                }
                return obj;
            });
            return {
                ...state,
                workspaces: newArr
            }
        case GET_VARIANTS:
            return {
                ...state,
                variants: action.payload
            }
        case GET_CLEAR_WORKSPACE:
            return {
                ...state,
                single: action.payload,
                singleLoading: true
            }
        default:
            return state
    }
}