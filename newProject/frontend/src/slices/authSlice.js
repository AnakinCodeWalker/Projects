import { createSlice } from "@reduxjs/toolkit";

// name initilaState and reducer for the slice

const initialState = { // starting value   

  // like creating the first left side of use state
  signupData: null,
  loading: false,
  // token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
token: localStorage.getItem("token") || null
};

const authSlice = createSlice({
  name: "auth",  // devtools kai liye hota hai 
  initialState: initialState, // starting value   // putting initialize them in the start
  reducers: {
    // putting values like we do via the rhs 
    setSignupData(state, value) {           // state current value hota hai
      state.signupData = value.payload;
    },

    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) { // state.varaible = value.payload
      state.token = value.payload;
    },
  },
});

//  actions ko export kro
export const { setSignupData, setLoading, setToken } = authSlice.actions;

// reducers ko v export krna 
export default authSlice.reducer;

/*
User fills form
   ↓
API call (backend)
   ↓
dispatch(setSignupData(response))
   ↓
Redux store update
   ↓
useSelector → UI update
*/