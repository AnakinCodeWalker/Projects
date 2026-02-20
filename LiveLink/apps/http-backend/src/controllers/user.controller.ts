import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"
import { signupSchema, signupSchemaType, SigninSchema, SigninSchemaType, createRoomSchema, createRoomSchemaType } from "@repo/common"
import { env } from "../config/env.js";

import { prisma } from "@repo/db"
export const signup = async (req: Request<{}, {}, signupSchemaType, {}>, res: Response) => {

    // parse willl crash , safeparse will not throw an exception.
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
        user: safeUser,
        userId: safeUser.id
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
        userId: findUser.id    // objectId
    }

    const accessToken = jwt.sign(jwtPayload, env.JWT_ACCESS_TOKEN, {
        expiresIn: env.JWT_ACCESS_TOKEN_EXPIRY    // random token
    })

    // const refreshToken = jwt.sign(jwtPayload, env.JWT_REFRESH_TOKEN, {
    //     expiresIn: env.JWT_REFRESH_TOKEN_EXPIRY
    // })

    // ?? cookie ??

    res.status(200).json(new ApiResponse(200, "user sign up", {
        token: accessToken  //randomtoken send
    }))
}


export const room = async (req: Request<{},{},createRoomSchemaType,{}>, res: Response) => {


    const result =  createRoomSchema.safeParse(req.body) 
    

    if (!result.success)
        throw new ApiError(400, "Incorrect Inputs")

    //@ts-ignore    // for that specific user 
    const userId = req.userId

// room ki id..
    const createdRoomId = await prisma.room.create({
        data:{                                        // MIGRATE THE DB.
         slug : result.data.name, // considering the provieded name as slug.
         adminId : userId      //  specific admin ki id from the model        
        }
    }) 
    
    if(!createdRoomId)
        throw new ApiError(304,"can not create room")
    
    res.status(200).json(new ApiResponse(200, "room created", {
        roomId : createdRoomId ,    // room id jo v room created hua hai ..
        adminId : userId   // check ki userId and middleware is same or not .
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