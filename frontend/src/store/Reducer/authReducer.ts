import { LOGIN_API, LOGOUT } from "../ActionTypes/atuhActionType"

const initialState = {
    isLogin:false,
    data:{
        email:"",
        id:''
    }
}
export default function authReducer(state=initialState,action:{type:string,payload:any}){
    switch(action.type){
        case LOGIN_API :
            return {
                ...state,
                isLogin:true,
                data:action.payload
            }
        case LOGOUT :
            return initialState
        default :
        return state
    }
}