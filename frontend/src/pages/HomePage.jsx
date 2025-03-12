import React, { useEffect, useState } from 'react'
import styled  from 'styled-components'
import Compiler from '../components/Compiler'
import { useAuthStorer } from '../lib/useAuthStorer'
import { useNavigate } from 'react-router-dom'
import UsersComponent from '../components/UsersComponent'
const Left=styled.div`
width:95%;
height:98vh;
background-color:#394555;
z-index:2;
transition:3s;
border-right:2px solid black;
overflow-y:scroll;
scrollbar-width:none;
position:fixed;
`
const Right=styled.div`
width:98.5%;
left:1.5%;
height:100vh;
position:fixed;
scrollbar-width:5%;
`
const Div=styled.div`
width:100%;
height:100%;
background-color:rgba(0,0,0,0.5);
color:white;
border:1px solid black;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const Linkdiv=styled.div`
width:40%;
`
const Button=styled.button`
align-self:center;
width:100%;
cursor:pointer;
border:1px solid white;
margin:10px;
&:active{
background-color:white;
color:black;
}
`
export default function HomePage() {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStorer();
  const [chatShow,setChatShow]=useState(false)
  const navigate=useNavigate();
  const Users=()=>{
    useEffect(()=>{
      console.log("checking auth")
      checkAuth();
    },[]);
    if(authUser==null){
      return(
        <Div>
          <p>Please login to chat with your friends</p>
          <Linkdiv>
          <Button onClick={()=>{navigate('/login')}}>Login</Button>
          <Button onClick={()=>{navigate('/signup')}}>Signup</Button>
          </Linkdiv>
        </Div>
      )
    }
    else{
      return (<UsersComponent/>)
    }
  }
  return (
    <div className='gap-2 z-1 bg-[#394555] flex pt-15 h-screen '>
      <Left className={` ${chatShow==true?'block':'hidden'}`}>
        {Users()}
      </Left>
      <span className={`absolute pr-0.5 pl-0.5 mt-5
         bg-blue-200 rotate-90 z-10 
         cursor-pointer text-black
         ${chatShow==true?'right-1/37':'left-[-1%]'}
         `}
         onClick={()=>{setChatShow(!chatShow)}}
         >{chatShow==false?'Show':'Hide'}
         
         </span>
      <Right>
          <Compiler/>
      </Right>
    </div>
  )
}
