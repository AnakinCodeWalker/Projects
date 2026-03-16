import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const paymentRouter = Router()

paymentRouter.route().post(authMiddleware)


export default paymentRouter