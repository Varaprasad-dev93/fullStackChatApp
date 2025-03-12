import { KeyRound, Loader2, LogIn, Mail } from 'lucide-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuthStorer } from '../lib/useAuthStorer'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Div=styled.div`
color:white;
background-color:#394555;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
height:100vh;
`
const Formdiv=styled.div`
display:flex;
margin-top:30px;
gap:20px;
`
const Input=styled.input`
border:none;
width:100%;
border:1px solid #395655;
padding:2px 10px;
`
export default function LoginPage() {

  const {login,isLoggingIn}=useAuthStorer();

  const [formData,setFormData]=useState({
    email:'',
    password:''
  });


  const handleSubmit=(e)=>{
    e.preventDefault();
    const success=validateForm();
    if(success===true) login(formData)
  }
  const validateForm=()=>{
    if(!formData.email || !formData.password) return toast.error("Fill the fields")
      return true
  }
  return (
    <Div>
      <LogIn /><br/>
      <h2 className='text-2xl font-bold mt-2'>Welcome to our website</h2>
      <p className="opacity-70">Please login</p>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <Formdiv>
          <Mail></Mail>
          <Input 
            type="email" 
            value={FormData.email}
            onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
            placeholder='your@example.com'
          />
        </Formdiv>

        <Formdiv>
        <KeyRound />
        <Input 
          type='password' 
          placeholder='password'
          value={formData.password}
          onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
          />
        </Formdiv>
        <Formdiv>
          <button type='submit' className='w-full px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer' disabled={isLoggingIn}>
            { isLoggingIn?(<>
            <Loader2 className='size-5 animate-spin'/>
            </>):("Sign In")}</button>
        </Formdiv>
      </form>
      <div className='text-center'>
              <p className='text-gray-400'>Don't have an account?{" "}
              <Link to="/signup" className='link cursor-pointer text-blue-600 hover:text-blue-800'>Login</Link>
              </p>
      </div>
    </Div>
  )
}
