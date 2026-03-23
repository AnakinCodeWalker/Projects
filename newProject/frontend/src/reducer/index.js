//  isme slices ko combine krte hai
// isme reducers hote hai 
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "../slices/authslice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"

const rootReducer = combineReducers({

    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer
});

export default rootReducer