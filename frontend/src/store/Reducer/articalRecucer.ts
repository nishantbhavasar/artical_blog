import {  GET_ALL_ARTICALS, GET_ARTICAL, GET_MY_ARTICALS } from "../ActionTypes/articalActionType";

const initialState = {
    articals:[],
    myArticals:[],
    post:{}
}
export default function articalReducer(state=initialState,action:{type:string,payload:any}){
    switch(action.type){
        case GET_ALL_ARTICALS :
            return {
                ...state,
                articals:action.payload
            }
        case GET_MY_ARTICALS :
            return {
                ...state,
                myArticals:action.payload
            }
        case GET_ARTICAL :
            return {
                ...state,
                post:action.payload
            }
        default :
        return state
    }
}