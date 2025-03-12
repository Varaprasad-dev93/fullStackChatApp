import mongoose from "mongoose";
import User from "../models/user.model.js";
import message from '../models/message.model.js';
import { getResponse } from '../lib/getResponseAi.js'
import { getReceiverId, io } from "./socket.js";
export const Users=async (req,res)=>{
    try {
        const loggedId= req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedId}}).select("-password");
        // console.log(filteredUsers)
       return res.status(201).json(filteredUsers);
    } catch (error) {
       return res.status(500).json("Internal error on fetching : "+error);
    }
}
export const messages=async(req,res)=>{
    try {
        const {id}=req.params;
        const toChat=new mongoose.Types.ObjectId(id);
        // console.log(id,toChat)
        const senderId=req.user._id;
        const messages=await message.find({
            $or:[
                {senderId:senderId,receiverId:toChat},
                {senderId:toChat,receiverId:senderId}
                
            ]
        }
        ).sort({createdAt:1})
       return res.status(201).json(messages);
    } catch (error) {
       return res.status(500).json({message:"Internal server error at reading chats : "+error});
    }
}
export const sendMessage=async (req,res)=>{

    try {
        const {text,image}=req.body;
        const {id}=req.params;
        const senderId=req.user._id;
        const receievers=new mongoose.Types.ObjectId(id);
        const AiUser= await User.findOne({email:"AiUser@gmail.com"});
        const chat=await new message({
            text,
            senderId,
            receiverId:receievers
        });
       
        const receiverSocketId=getReceiverId(receievers.toString())
        console.log(receiverSocketId,"  ",receievers)
            
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",chat);
        }
        await chat.save();

        if(receievers.toString()==AiUser._id.toString()){
            const aiResponse = await getResponse(text);
            const chatAI = new message({
                text: aiResponse,
                senderId: receievers,
                receiverId: senderId
            });
            // console.log("Ai user Action")
            setTimeout(async () => {  // **Delay AI response slightly**
               
                

                const senderSocketId = getReceiverId(senderId.toString());
                if (senderSocketId) {
                    io.to(senderSocketId).emit("newMessage", chatAI);
                }
            }, 300);
            await chatAI.save();
        }
        
       
        return res.status(200).json({message:"successful"});
    
    } catch (error) {
        return res.status(500).json({message:"Internal Error at sending message : "+error});
    }
}
export const deleteMessade=async(req,res)=>{
    try{
        const {id}=req.body;
        if(!id) return res.status(401).json({message:"Message not found"})
        await message.findByIdAndDelete(id);
        return res.status(201).json({message:"Successfuly deleted!!"})
    }catch(err){
        return res.status(500).json({message:"Internal error While deleting"})
    }
}