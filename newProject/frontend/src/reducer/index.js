//  isme slices ko combine krte hai
// root reducers  hai 
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "../slices/authslice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"
//  this is whole state
const rootReducer = combineReducers({
    // state.key.field
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
    viewCourse: viewCourseReducer,

});

export default rootReducer