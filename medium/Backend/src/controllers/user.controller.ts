import { Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { signupInput, signupType, signinInput, signinType } from "@anakincodewalker/common";
import { SignOptions, JwtPayload } from "jsonwebtoken";
const signup = async (req: Request, res: Response): Promise<void> => {


}


const signin = async (req: Request, res: Response): Promise<void> => {

}

const verifyEmail = async (req: Request, res: Response): Promise<void> => {

}

const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {

}


const updateDetails = async (req: Request, res: Response): Promise<void> => {

}

const forgetPassword = async (req: Request, res: Response): Promise<void> => {

}

const resetPassword = async (req: Request, res: Response): Promise<void> => {

}
const getCurrentUser = async (req: Request, res: Response): Promise<void> => {

}
const logout = async (req: Request, res: Response): Promise<void> => {

}

const getUserProfile = async (req: Request, res: Response): Promise<void> => {

}

export {
    signup,
    signin,
    verifyEmail,
    refreshAccessToken,
    updateDetails,
    forgetPassword,
    resetPassword,
    getCurrentUser,
    logout,
    getUserProfile
}