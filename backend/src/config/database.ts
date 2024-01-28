import mongoose, { Connection }  from "mongoose";

const connectDB=async()=>{
    try {
        const{connection}:{connection:Connection}=await mongoose.connect(process.env.MONGO_URL as string,{
            dbName:"anime_ecommerce"
        });
         console.log(`mongoDB connected to ${connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB