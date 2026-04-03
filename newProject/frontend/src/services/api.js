// links

// const BASE_URL = "http://localhost:3000" //backend url



export const user = {
    SIGNUP_API:  "/api/v1/users/signup",
    SIGNIN_API:  "/api/v1/users/signin",


    LOGOUT_API: "/api/v1/users/logout",
}

export const contactUs ={
      CONTACTUS_API:   "/api/v1/contactUs/details",
    
} 

export const Profile = {
    UPDATE_API : "/api/v1/profile/update"
}

export const resetPassword ={
    RESET_PASSWORD_API : "/api/v1/users/resetPassword"

}

export const confirmResetPassword ={
   CONFIRM_RESET_PASSWORD_API: "/api/v1/users/confirmResetPassword"
}

/*

userRouter.route("/sendOtp").post(sendOtp)
userRouter.route("/signup").post(signupController)
userRouter.route("/signin").post(signinController)

userRouter.route("/refreshAccessToken").post(refreshAccessToken)

userRouter.route("/changePassword").post(authMiddleware,changePassword)
userRouter.route("/resetPassword").post(resetpasswordToken)
userRouter.route("/confirmResetPassword").post(resetpassword)

userRouter.route("/logout").post(authMiddleware, logoutUser)



export default userRouter

*/