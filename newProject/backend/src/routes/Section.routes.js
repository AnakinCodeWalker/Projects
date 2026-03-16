//  import correct middlewares here


import { Router } from "express";

import {
     createSection,
    updateSection,
    deleteSection
} from "../controllers/Section.controllers.js"

const sectionRouter = Router()

sectionRouter.route("/create").post(createSection)
sectionRouter.route("/update").post(updateSection)
sectionRouter.route("/delete/:sectionId").delete(deleteSection)

export default sectionRouter