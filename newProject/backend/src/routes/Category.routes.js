//  add  correct in here middleware 

import {Router} from "express"

import {
createCategoryController,
    showAllCategoryController,
    categoryPageDetails
} from "../controllers/Category.controllers.js"

const categoryRouter = Router()

categoryRouter.route("/create").post(createCategoryController)
categoryRouter.route("/getAll").get(showAllCategoryController)
categoryRouter.route("/details").post(categoryPageDetails)


export default categoryRouter 