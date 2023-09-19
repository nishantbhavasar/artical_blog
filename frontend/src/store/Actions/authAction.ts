import { LOGIN_API,LOGOUT } from "../ActionTypes/atuhActionType"

export const triggerLogin = (payload:any) => {
    return {
        type:LOGIN_API,
        payload:payload,
    }
}
export const triggerLogout = () => {
    return {
        type:LOGOUT,
    }
}