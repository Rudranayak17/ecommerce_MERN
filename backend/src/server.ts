import { app } from "./app.js";
import {config} from"dotenv"
import connectDB from "./config/database.js";
import * as cloudinary from "cloudinary";
config()
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key:process.env.CLOUDINARY_API_KEY as string,
    api_secret:process.env.CLOUDINARY_API_SECRET as string,
})
connectDB()
const port=process.env.PORT|| 5000 as number
app.listen(port,()=>{
    console.log(`server is listening in port http://localhost:${port},It is ${process.env.NODE_ENV} mode`);
    
}).on("error",(err)=>{
    console.log("Error starting in server ",err);
    
})