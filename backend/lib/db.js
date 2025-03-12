import mongoose from "mongoose";
export const connectDB=async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGODB);
    }
    catch(err){
        console.log("Database error : "+err);
    }
}