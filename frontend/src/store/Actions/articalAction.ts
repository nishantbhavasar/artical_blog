import {  GET_ALL_ARTICALS, GET_ARTICAL, GET_MY_ARTICALS } from "../ActionTypes/articalActionType"

export const triggerGetAllArtical = (payload:any) => {
    return {
        type:GET_ALL_ARTICALS,
        payload:payload,
    }
}
export const triggerGetMyArtical = (payload:any) => {
    return {
        type:GET_MY_ARTICALS,
        payload:payload,
    }
}
export const triggerGetArtical = (payload:any) => {
    return {
        type:GET_ARTICAL,
        payload:payload,
    }
}
