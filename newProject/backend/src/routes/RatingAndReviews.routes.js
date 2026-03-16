import { Router } from "express";

const ratingAndReviewsRouter = Router()

import authMiddleware from "../middlewares/authMiddleware.js";
import {
    createRating,
    getAverageRating,
    getAllRating
} from "../controllers/RatingAndReviews.controllers.js"

ratingAndReviewsRouter.route("/create").post(authMiddleware,createRating)
ratingAndReviewsRouter.route("/averageRating").post(authMiddleware,getAverageRating)
ratingAndReviewsRouter.route("/allRating").post(getAllRating)

export default ratingAndReviewsRouter