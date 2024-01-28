import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";


interface CustomError extends Error{
    statusCode:number;
    path?:string;
    name:string;
    code?:number;
    keyValue?:Record<string,any>

}

export const errMiddleware=(err:CustomError,req:Request,res:Response,next:NextFunction)=>{
err.message=err.message||"Internal Server Error",
err.statusCode=err.statusCode||500;

// wrong mongodb id error 

if (err.name==="CastError"&& err instanceof ErrorHandler) {
    const message =`Resource not found - Invalid ${err.path}`;
    err=new ErrorHandler(message,401)
};
//Mongoose duplicate key error

if (err.code===11000) {
    const message=`Duplicate ${Object.keys(err.keyValue || {}).join(',')} Entered`
    err=new ErrorHandler(message,401)
}

//wrong JWT error

if (err.name==="JsonWebTokenError") {
    const message =`Json Web Token is invalid ,try again`
    err=new ErrorHandler(message,401)
};

// wrong JWT Expire error 

if (err.name==="TokenExpiredError") {
    const message =`JWT token is Expired, login or try again `
    err=new ErrorHandler(message,401)
};

if (typeof err === 'string') {
    // Create an error object and assign the message property
    const message =(err as Error).message
    err = new ErrorHandler( message,401)
  }

return res.status(err.statusCode).json({
    successs:false,
    message:err.message
});


}