import { Router } from "express";
import  {registerUserController,  verifyUserController,userLoginController , userLogOutController, resetPasswordController ,resetPasswordConfirmController } from "../controllers/registerUser.Controller.js";
import userMiddleware from "../middleware/User.middleware.js"
import zodvalidateMiddleware from "../middleware/zodvalidate.middleware.js";
import {zodRegisterSchema , zodLoginSchema} from "../validations/auth.validation.js"
const router =Router()

// work if there is only one verb on the route for mulitple http verb use another syntax .

// adding zod validation.

router.post("/registerUser",zodvalidateMiddleware(zodRegisterSchema) ,registerUserController)

router.get("/verify/:token",verifyUserController)  // this  token can be access it from the req.params

router.post("/login",zodvalidateMiddleware(zodLoginSchema),userLoginController)

//  this is for logged out users..
router.post("/forget-password" ,resetPasswordController)
router.post("/reset-password/:token" ,resetPasswordConfirmController)

router.post("/logout" ,userMiddleware,userLogOutController)

export default  router 


//  use params /: when the resource is neccessary bina params kai url ka koi meaning na ho 

//  use query ? when iske bina v kam chl jaye and it is extra information in the url