import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
export const Protected=async (req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:'Unauthorized token'});
        }
        const decode=jwt.verify(token,process.env.MySecretKey);
        if(!decode){
            return res.status(401).json({message:"Please relogin "});
        }
        const user=await User.findById(decode.user).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        req.user=user;
        next();
    }
    catch(e){
       return res.status(401).json({message:"Internal error : "+e});
    }
}