import express from 'express'
import {Request,Response,NextFunction} from 'express';
import { ApiError } from '../utils/ApiError.js';


//  in a middleware you dont throw the error u pass it into next .
const userMiddleware =(req:Request ,res:Response ,next:NextFunction)=>void{


    




}
export {userMiddleware}