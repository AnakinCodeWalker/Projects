import { Router } from "express";
import { login , register} from "../controllers/User.controllers.js";
const router = Router()


//use this type of routing when u want to perform multiple http  method on the same route.

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/add-to-activity")
router.route("/get-all-activity")

export default router 