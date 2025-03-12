import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.rout.js'
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { Compile } from './lib/compiler.js';
import cookieParser from 'cookie-parser'
import { Protected } from './middleware/protected.js';
import messageRout from './routes/message.rout.js';
import {app,server} from './controllers/socket.js'
import path from "path"
dotenv.config();
const PORT=process.env.PORT;
const __dirname=path.resolve();
// const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/compile",Compile);
app.use("/api/messages",Protected,messageRout);
//This if block is executed when we are deploying bith the backend and frontend at a same time with same package.json file
if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    console.log("HII")
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}
server.listen(PORT,()=>{
    console.log("Server runs on PORT:"+PORT);
    connectDB();
})