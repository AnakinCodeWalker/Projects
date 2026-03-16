// import correct middlewares here

import { Router } from "express";

const subSectionRouter = Router()

import {
    createSubSection,
        updateSubSection,
        deleteSubSection
} from "../controllers/SubSection.controller.js"
import upload from "../config/multer.config.js";


subSectionRouter.route("/create").post(upload.single("video"),createSubSection)
subSectionRouter.route("/update").patch(upload.single("video"),updateSubSection)
subSectionRouter.route("/delete/:subSectionId").delete(deleteSubSection)


export default subSectionRouter