import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/generation.js';
export const signup= async (req,res)=>{
    const {email,fullName,password,profilePic}=req.body;
    const salt=await bcrypt.genSalt(10);
    const AiUserEmail="AiUser@gmail.com";
    const Aiuser=await User.findOne({email:AiUserEmail});
    if(!Aiuser){
        const newAiUser=new User({
            fullName:'Ask Me',
            email:AiUserEmail,
            description:"Hii,I am your AI",
            password:await bcrypt.hash('Aiuser@Nothing',salt)
        })
        await newAiUser.save();
    }
    try{
        if(password.length<6){
            return res.status(400).json({message:"Password length must be greater than 6"});
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User email already exists!!"});
        }
        const hashedPassword=await bcrypt.hash(password,salt);//the password should be different from the password entered
        const newUser=new User({
            fullName,
            email,
            password:hashedPassword,
            profilePic
        });
        if(newUser){
            generateToken(newUser._id,res);//it creates a token
            await newUser.save();//to save the new user to database
            return res.status(201).json({message:"User was created successfully!!"})
        }
        else{
            return res.status(400).json({message:"invalid user"});
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal error!!"});
    }
}
export const login=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(user){
            const isCorrect=await bcrypt.compare(password,user.password);
            if(!isCorrect){
                return res.status(400).json({message:"Invalid credentials!!"});
            }
            generateToken(user._id,res);
            res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic
            })
        }
        else{
            return res.status(400).json({message:"Invalid credentials!!"});
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({message:"Backend error.We're sorry!!"})
    }
}
export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully "})
    }catch(e){
        res.status(500).json({message:"Internal error!!"});
    }
}
export const Check=(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in controller "+error);
        res.status(500).json({message:"Internal server error"});
    }
}