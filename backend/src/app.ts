import express, { Request, Response } from "express";
import userRoute from "./router/userRoute.js";
import { errMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app =express()
app.use(cors({
    origin: 'http://localhost:5173',  // Replace with the actual origin of your react app or url
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",userRoute)

//middlerware
app.use(errMiddleware)

app.get("/",(req:Request,res:Response)=>{
res.send("Server is working properly")
})

