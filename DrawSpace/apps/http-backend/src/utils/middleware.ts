//  add a global d.ts for userId 

import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"


import { env } from "../config/env.config.js"
import { ApiError } from "./ApiError.js"
import { prisma } from "@repo/db"


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, " Unauthorized request")

        }
        console.log("VERIFY SECRET:", env.JWT_SECRET_KEY);
        console.log("TOKEN RECEIVED:", token);
        
        const decodedToken = jwt.verify(token, env.JWT_SECRET_KEY) as JwtPayload

        const user = await prisma.user.findFirst({
            where: {
                id: decodedToken.userId
            }
        })

        if (!user)
            throw new ApiError(401, "Invalid access token")

        // @ts-ignore
        req.userId = user
        next()

    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(401, error.message || "Invalid  access token")

        }
    }
}
export default authMiddleware