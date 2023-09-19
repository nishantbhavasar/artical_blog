import articalReducer from "./articalRecucer";
import authReducer from "./authReducer";
import {combineReducers} from 'redux'

export default combineReducers({
    authReducer,
    articalReducer
});