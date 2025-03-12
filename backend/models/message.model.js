import mongoose from "mongoose";
const messageSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
    },
},
{timestamps:true}
);
messageSchema.index({createdAt:1},{expiresAfterSeconds:60*60*24*30});
const message=mongoose.model('Message',messageSchema);
export default message;