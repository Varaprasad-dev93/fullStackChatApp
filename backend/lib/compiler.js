import express from 'express'
import cors from 'cors'
import axios from 'axios';
const app=express();
app.use(cors());
app.use(express.json())
export const Compile=async (req,res)=>{
    const {code,lang,input}=req.body;
    console.log(code," ",lang)
    let languages={
        'c':{language:'c',version:'10.2.0'},
        'python':{language:'python',version:'3.10.0'},
        'java':{language:'java',version:'15.0.2'},
        'cpp':{language:'g++',version:'10.2.0'}
    };
    if(!languages[lang]){
        return res.status(401,{message:"Unsupported language"});
    }
    let data={
        "language":languages[lang].language,
        "version":languages[lang].version,
        "files":[
            {
            "name":"main",
            "content":code
            }
        ],
        stdin:input
    };
    let config={
        method:"post",
        url:'https://emkc.org/api/v2/piston/execute',
        headers:{
            'Content-type':'application/json'
        },
        data:data
    };
    try {
        const response = await axios(config);
        res.json(response.data.run); 
    } catch (error) {
        console.error('Error:', error.message || error);
        res.status(500).send({ error: 'Something went wrong on our side 😣' });
    }
}