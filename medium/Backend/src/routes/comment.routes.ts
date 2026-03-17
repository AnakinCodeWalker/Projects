import { Router } from "express";
import {
    createComment,
    deleteComment,
    updateComment
} from "../controllers/comments.controller.js";

const commentRouter = Router()

commentRouter.route("/create").post(createComment)
commentRouter.route("/update").patch(updateComment)
commentRouter.route("/delete").delete(deleteComment)

export default commentRouter