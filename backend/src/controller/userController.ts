import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsycFunc from "../middleware/catchAsyncFunc.js";
import User, { IUser } from "../model/userModel.js";
import sendToken from "../utils/sendToken.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import fs from "fs";
import { sendMail } from "../utils/sendMail.js";

interface AuthRequest extends Request {
    user?: IUser;
  }


//registertion of user
export const register = catchAsycFunc(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;

    const avatar = req.file?.path
    if (!avatar) {
        return next(new ErrorHandler('Profile is missing', 401));
    }
    if (!email || !password || !name) {
        return next(new ErrorHandler("Please fill all the input", 401))
    }

    let user: IUser | null = await User.findOne({ email });

    if (user) {
        fs.unlinkSync(avatar)
        return next(new ErrorHandler("User already exist", 401))
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'anime_ecommerce'
    });
    fs.unlinkSync(avatar)
    const otp = Math.floor(Math.random() * 1000000);
    user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        },
        otp,
        otp_expiry: new Date(Date.now() + Number(process.env.OTP_EXPIRE) * 60 * 1000),
    })
    const message = `Your OTP for verify the  ${otp}. If you did not request for this ,please ignore the email`
    await sendMail(email, "Account verification", message);
    sendToken(user, 201, res)
})

//login

export const login = catchAsycFunc(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please fill all the input", 401))
    }

    let user: IUser | null = await User.findOne({ email }).select("+password") as IUser;

    if (!user) {
        return next(new ErrorHandler("Email or password doesn't exist ", 401))
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Email or password doesn't exist ", 401))
    }



    sendToken(user, 201, res)
})

//logout

export const logout = catchAsycFunc(async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token",
        null,
        {
            expires: new Date(Date.now()), httpOnly: true
        })

    res.status(200).json({
        success: true,
        message: "Logout sucessfully"
    })
})


//forgetPassword


export const forgetPassword = catchAsycFunc(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
        return next(new ErrorHandler("please enter your email", 401))
    }

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("Invaild Email", 401))
    }

    const otp: number = Math.floor(Math.random() * 1000000)

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save()

    const message = `Your OTP for reseting the password ${otp}. If you did not request for this ,please ignore the email`
    await sendMail(email, "Request for Reseting Password", message);

    res.status(200).json({
        success: true,
        message: `Otp sent to ${email}`
    })

})

//verify
export const verify = catchAsycFunc(async (req: AuthRequest, res: Response, next: NextFunction) => {
    
    const {otp}=req.body

    const user: IUser | null = await User.findById(req.user?._id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    
    if (user.otp !== Number(otp)) {
        return next(new ErrorHandler("Invalid OTP or has Been expired", 401));
    }

    user.verified = true;
    user.otp = null ;
    user.otp_expiry = null ;
    await user.save();
  
    
    res.status(200).json({
        success: true,
        message: `Account Verified`
    })
});
