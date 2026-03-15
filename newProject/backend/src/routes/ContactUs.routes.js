import { Router } from "express";
import contactUsController from "../controllers/ContactUs.controllers.js";

const contactUsRouter = Router()

contactUsRouter.route("/details").post(contactUsController)

export default contactUsRouter