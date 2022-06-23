import {combineReducers} from "redux";
import {authReducer} from "./reducers/authReducer";
import {workspaceReducer} from "./reducers/workspaceReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    workspace:workspaceReducer
});