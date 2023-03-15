import {createSlice} from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit";


const data={emailname:""}

const storeReducer=createSlice({
name:"colorify",
initialState:data,
reducers:{

    getMail(state,action){
     
        state.email=action.payload
        console.log("emailname",state.email)
    },
    deletemail(state,action){

    }
}


})

 const EmailStore=configureStore({
    reducer:{
        email:storeReducer.reducer
    }
 })
export const emailActions =storeReducer.actions
export default EmailStore;