import { createSlice } from "@reduxjs/toolkit";

const initialState = { // starting value 
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",  // devtools kai liye hota hai 
  initialState: initialState, // starting value 
  reducers: {
    setSignupData(state, value) {           // state current value hota hai
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

//  actions ko export kro
export const { setSignupData, setLoading, setToken } = authSlice.actions;

// reducers ko v export krna 
export default authSlice.reducer;