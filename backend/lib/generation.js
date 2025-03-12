import jwt from "jsonwebtoken";
export const generateToken=(user,res)=>{
    const token=jwt.sign({user},process.env.MySecretKey,{
        expiresIn:"7d",
    });
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,//means it expires in 7 days
        httpOnly:true,//it is for securing purpose.Prevent attacks cross site scripting attacks
        sameSite:"strict",
        secure:process.env.NODE_ENV!=="development",
    });
    return token;
}