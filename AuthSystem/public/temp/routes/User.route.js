import { Router } from "express";
import registerUserMiddleware from "../controllers/registerUser.middleware.js";

const router =Router()

// work if there is only one verb on the route.
router.post("/registerUser",registerUserMiddleware)

export default  router 