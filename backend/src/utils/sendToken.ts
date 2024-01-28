import { Response } from "express"
import { IUser } from "../model/userModel"


interface MyCookieOption{
    maxAge:number,
    sameSite:"lax"|"strict"|"none"
    httpOnly:boolean,
    secure:boolean
}


const sendToken=<T extends IUser>(
    user:T,
    statusCode:number=200,
    res:Response
)=>{
    const token=user.getJWTToken();

    //Option for the cookie

    const cookieExpireDays=parseInt(process.env.COOKIE_EXPIRE || "1",10)||1;
const option:MyCookieOption={
    maxAge:cookieExpireDays*24*60*60*1000,
    sameSite:process.env.NODE_ENV==="Developement"?"lax":"none",
    httpOnly:true,
    secure:true
}
res.status(statusCode).cookie("token",token,option).json({
    success:true,
    user,
    token
})

}

export default sendToken