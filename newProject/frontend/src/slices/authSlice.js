//  reducer week

import {createSlice} from "@reduxjs/toolkit"

//  this line could thorw error 
const initialState ={
    token : localStorage.getItem("token") ?JSON.parse(localStorage.getItem("token")):null
}

const authSlice = createSlice({
name:"auth",
initialState:initialState,
reducers:{
    setToken(state,value){
        state.token = value.payload
    }
}
})

export const {setToken}  = authSlice.actions
export default authSlice.reducer