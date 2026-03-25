// links

const BASE_URL = "http://localhost:3000" //backend url

export const categories = {

    CATEGORIES_API: BASE_URL + "/api/v1/category/getAll"
}

export const user = {
    SIGNUP_API: BASE_URL + "/api/v1/users/signup",
    SIGNIN_API: BASE_URL + "/api/v1/users/signin",


    LOGOUT_API: BASE_URL + "/api/v1/users/logout",
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