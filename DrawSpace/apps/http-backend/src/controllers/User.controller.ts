//  add a gloal d.ts

import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { createRoomInput, createRoomInputType, signinInput, signinInputType, signupInput, signupInputType } from "@repo/common";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt"
import { prisma } from "@repo/db"

export const signup = async (req: Request<{}, {}, signupInputType, {}>, res: Response): Promise<void> => {

    try {
        const result = signupInput.safeParse(req.body)

        if (!result.success)
            throw new ApiError(304, "Invalid inputs", result.error.issues)

        const { username, name, password } = result.data


        const foundUser = await prisma.user.findFirst({
            where: {
                email: username
            }
        })
        if (foundUser)
            throw new ApiError(400, "username already exists")


        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email: username, // this is wrong   one side u are getting email and one side username ?  
                name,
                password: hashedPassword
            }
        })

        if (!user)
            throw new ApiError(400, "signup failed")

        console.log("signup successfully");

        res.status(201).json(new ApiResponse(201, "signup successfully", {
            user
        }))
    } catch (error) {
        if (error instanceof Error)
            console.log(error);
    }
}

export const signin = async (req: Request<{}, {}, signinInputType, {}>, res: Response): Promise<void> => {

    const result = signinInput.safeParse(req.body)

    if (!result.success)
        throw new ApiError(400, "Invalid inputs", result.error.issues)

    const { username, password } = result.data

    // find 
    const foundUser = await prisma.user.findFirst({
        where: {
            email: username
        }
    })

    if (!foundUser)
        throw new ApiError(401, "Invalid username")

    const passwordCorrect = await bcrypt.compare(password, foundUser.password)

    if (!passwordCorrect)
        throw new ApiError(401, "invalid password")


    const token = jwt.sign({
        userId: foundUser?.id,
    }, env.JWT_SECRET_KEY, {
        expiresIn: "7d"
    })


    console.log("SIGN SECRET:", env.JWT_SECRET_KEY);
    console.log("TOKEN:", token);

    console.log(token);


    res.status(200).json(new ApiResponse(200, "signin successfully", {
        foundUser,
        token: token
    }))
}

export const room = async (req: Request<{}, {}, createRoomInputType, {}>, res: Response): Promise<void> => {

    const result = createRoomInput.safeParse(req.body)

    if (!result.success)
        throw new ApiError(400, "Invlalid Inputs", result.error.issues)

    const { name } = result.data

    const roomName = await prisma.room.findFirst({
        where: {
            slug: name
        }
    })
    if (roomName)
        throw new ApiError(400, "room with this name already exists")

    // @ts-ignore                      fix this 
    const userId = req.userId

    const createdRoom = await prisma.room.create({
        data: {
            slug: name,
            adminId: userId.id
        }
    })

    console.log("room created successFully");
    console.log(createdRoom);

    res.status(201).json(new ApiResponse(201, "room created successfully", {
        createdRoom
    }))
}

export const chats = async (req: Request, res: Response): Promise<void> => {

    try {

        const roomId = Number(req.params.roomId)


        const messages = await prisma.chat.findMany({
            where: {
                roomId: roomId
            }, take: 50,
            orderBy: {
                id: "desc"
            }
        })

        res.status(200).json(new ApiResponse(200, "chat joined successfully", {
            messages
        }))
    } catch (error) {
        if (error instanceof Error) // api error expects an array of error
            throw new ApiError(400, "some went wrong", [error.message])
    }
}

export const slug = async (req: Request, res: Response): Promise<void> => {

    try {

        const slug = req.params.slug

        if (!slug || typeof slug !== "string")
            throw new ApiError(400, "Invlaid slug")

        // if(typeof slug === Array)
        const room = await prisma.room.findFirst({
            where: {
                slug
            }
        })

        res.status(200).json(new ApiResponse(200, "chat joined successfully", {
            room
        }))
    } catch (error) {
        if (error instanceof Error) // api error expects an array of error
            throw new ApiError(400, "some went wrong", [error.message])
    }
}