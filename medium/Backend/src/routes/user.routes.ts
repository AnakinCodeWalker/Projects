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

const userRouter = Router()


userRouter.route("/signup").post(signup)
userRouter.route("/signin").post(signin)

// user verification route
userRouter.route("/verify-email").get(verifyEmail)

//  access token refreshing route
userRouter.post("/refresh-token", refreshAccessToken)

userRouter.route("/forget-password").post(forgetPassword)
userRouter.post("/reset-password", resetPassword)

userRouter.get("/me", getCurrentUser)
userRouter.route("/profile").post(updateDetails)

userRouter.route("/logout").post(logout)


// dynamic route get user via username
userRouter.get("/:username", getUserProfile)

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