import { Router } from "express";

import {
    signup,
    signin,
    verifyEmail,
    refreshAccessToken,
    forgetPassword,
    resetPassword,
    getCurrentUser,
    updateDetails,
    logout,
    getUserProfile
} from "../controllers/user.controller.js";

import authMiddleware from "../middleware/auth.middleware.js"
import { emailParams ,userNameParams } from "../types/auth.types.js";

const userRouter = Router()


userRouter.route("/signup").post(signup)
userRouter.route("/signin").post(signin)


//  access token refreshing route
userRouter.post("/refresh-token", authMiddleware ,refreshAccessToken)

userRouter.route("/forget-password").post(authMiddleware,forgetPassword)
userRouter.post("/reset-password", authMiddleware ,resetPassword)

userRouter.get("/me",authMiddleware, getCurrentUser)
userRouter.route("/profile").post(authMiddleware,updateDetails)

userRouter.route("/logout").post(authMiddleware,logout)

// user verification route //when ever you passdata from params you have to pass the generic here as well
userRouter.route("/verify-email/:token").get(verifyEmail)

// dynamic route get user via username
userRouter.route("/:username").get<userNameParams>(getUserProfile)

export default userRouter


/*
// auth
userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.post("/logout", logout)
userRouter.post("/refresh-token", refreshAccessToken)

// password
userRouter.post("/forget-password", forgetPassword)
userRouter.post("/reset-password", resetPassword)

// profile
userRouter.get("/me", getCurrentUser)
userRouter.patch("/profile", updateDetails)

// dynamic route ALWAYS LAST
userRouter.get("/:username", getUserProfile)


Refresh Token

JWT refresh flow ke liye must-have:

POST /refresh-token

userRouter.post("/refresh-token", refreshAccessToken)

🟢 Verify Token / Me Endpoint

Frontend ko current user fetch karna hota:

GET /me

userRouter.get("/me", getCurrentUser)


👉 Ye almost har app me hota hai.

👤 2️⃣ Profile Management
🟢 Update Profile (REST style)

Abhi tum:

POST /update-details


Use kar rahe ho.

Better:

PATCH /profile

userRouter.patch("/profile", updateDetails)

🟢 Get Public Profile
GET /:username


Example:

/api/v1/users/prince


⚠️ Ye route END me rakhna.

🔑 3️⃣ Password Reset Flow (Complete version)

Abhi sirf:

forget-password


Hai.

Real flow:

POST /forget-password
POST /reset-password

🧾 4️⃣ Email Verification (Medium-style)

Optional but realistic:

POST /verify-email
*/