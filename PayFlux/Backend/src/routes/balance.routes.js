import { Router } from "express";
import { userBalance ,transferMoney } from "../controllers/balance.controller.js";


const balanceRouter = Router()

balanceRouter.route("/balance").get(userBalance)
balanceRouter.route("/transfer").post(transferMoney)

export default balanceRouter