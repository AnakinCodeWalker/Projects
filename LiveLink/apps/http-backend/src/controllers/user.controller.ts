import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"
import { signupSchema, signupSchemaType, SigninSchema, SigninSchemaType } from "@repo/common"
import { env } from "../config/env.js";

import { prisma } from "@repo/db"
export const signup = async (req: Request<{}, {}, signupSchemaType, {}>, res: Response) => {
    const result = signupSchema.safeParse(req.body)
    if (!result.success)
        throw new ApiError(400, "validation failed")

    const findUser = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    userName: result.data.userName
                },
                {
                    email: result.data.email
                }
            ]
        }
    })
    if (findUser) {
        if (findUser.email == result.data.email)
            throw new ApiError(403, "userName already exists")
        else
            throw new ApiError(403, "email already exists")
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(result.data.password, 10)
    //  user create
    const newUser = await prisma.user.create({
        data: {
            userName: result.data.userName,
            email: result.data.email,
            password: hashedPassword,
            name: result.data.name,
        }
    })
    // extract password  from the newUser and rest into safeUser 

    const { password, ...safeUser } = newUser
    res.status(201).json(new ApiResponse(201, "user created", {
        user: safeUser
    }))
}



export const signin = async (req: Request<{}, {}, SigninSchemaType, {}>, res: Response) => {
    const result = SigninSchema.safeParse(req.body)

    if (!result.success)
        throw new ApiError(400, "validation failed")

    const findUser = await prisma.user.findFirst({

        where: {
            userName: result.data.userName
        }
    })

    if (!findUser)
        throw new ApiError(400, "can not findUser")
    const isPasswordCorrect = await bcrypt.compare(result.data.password, findUser.password)

    if (!isPasswordCorrect)
        throw new ApiError(304, "Invalid password")

    const jwtPayload = {
        userId: 1
    }

    const accessToken = jwt.sign(jwtPayload, env.JWT_ACCESS_TOKEN, {
        expiresIn: env.JWT_ACCESS_TOKEN_EXPIRY
    })

    // const refreshToken = jwt.sign(jwtPayload, env.JWT_REFRESH_TOKEN, {
    //     expiresIn: env.JWT_REFRESH_TOKEN_EXPIRY
    // })

    res.status(200).json({
        accessToken,
        // refreshToken
    })

}

export const room = async (req: Request, res: Response) => {

    const roomId = 123123

    res.status(200).json(new ApiResponse(200, "RoomId", {
        roomId
    }))
}

/*
export const logout = async (req: Request<{}, {}, {}, {}>, res: Response) => {
await prisma.user.update({
  where: {
    id: req.user.id
  },
  data: {
    refreshToken: null
  }
})
res.clearCookie("refreshToken");
res.status(200).json({ message: "Logged out successfully" });

}

*/