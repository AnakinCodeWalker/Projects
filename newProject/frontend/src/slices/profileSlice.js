//  reducer week

// profile ka data load hua hai tb hi loadmkro nhi to spinner yah loader show krdo

import {createSlice} from "@reduxjs/toolkit"

const initialState ={
     user: null,
     loading: false,
}

const profileSlice = createSlice({
name:"profile",
initialState:initialState,
reducers:{
    setUser(state,value){
        state.user = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
}
})

export const {setUser ,setLoading} = profileSlice.actions
export  default profileSlice.reducer


// const dispatch = useDispatch() 
// dispatch(setLoading(flase))