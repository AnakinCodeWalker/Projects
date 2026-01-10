import { Router } from "express";
import registerUserController, { verifyUser } from "../controllers/registerUser.Controller.js";

const router =Router()

// work if there is only one verb on the route.
router.post("/registerUser",registerUserController)
router.get("/verify/:token",verifyUser)  // this  token can be accessed from the req.params
export default  router 