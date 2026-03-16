//  add  correct in here middleware 

import {Router} from "express"

import {
createCategoryController,
    getAllCategoryController,
    categoryPageDetails
} from "../controllers/Category.controllers.js"

const categoryRouter = Router()

categoryRouter.route("/create").post(createCategoryController)
categoryRouter.route("/getAll").get(getAllCategoryController)
categoryRouter.route("/details").post(categoryPageDetails)


export default categoryRouter 