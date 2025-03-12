import React, { useState } from 'react'
import styled from 'styled-components'
import { KeyRound, Loader2, Mail, MessageCircleCode, TextQuote, User } from 'lucide-react'
import { useAuthStorer } from '../lib/useAuthStorer'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
const Div=styled.div`
background-color:#394555;
color:white;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:100vh;
`
const Form=styled.form`
`
const Input=styled.input`
border:none;
width:100%;
border:1px solid #395655;
padding:2px 10px;
`
const Formdiv=styled.div`
display:flex;
margin-top:30px;
gap:20px;
`
export default function SignUpPage() {

  const [formData,setFormData]=useState({
    fullName:"",
    email:"",
    password:"",
    description:""
  });


  const {signup,isSigningUp}=useAuthStorer();

  const handleSubmit=(e)=>{
    e.preventDefault();
    const success=validateForm();
    if(success===true) signup(formData)
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm=(e)=>{
      if(!formData.fullName.trim()) return toast.error("Full name is required!")
      if (!formData.email || !isValidEmail(formData.email)) return toast.error("Invalid Email format!")
      if(!isValidPassword(formData.password)) 
        return toast.error("Password should be atleast 8 characters having capital letters,small letters,numbers,special characters")
      
      return true;
    }


  return (
    <Div>
      <MessageCircleCode/><br/>
      <h2 className='text-2xl font-bold mt-2'>Create your Account</h2>
      <p className="opacity-70">Get start for free</p>
      <Form onSubmit={handleSubmit} className='space-y-6'>
        <Formdiv>
          <User></User>
          <Input 
            type="text"
            placeholder='Fullname'
            value={formData.fullName}
            onChange={(e)=>{setFormData({...formData,fullName:e.target.value})}}
            />
        </Formdiv>

        <Formdiv>
          <Mail></Mail>
          <Input 
            type='email' 
            placeholder='example@gmail.com' 
            value={formData.email}
            onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
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
          <TextQuote />
          <Input 
          type='text' 
          maxLength={20} 
          placeholder='Description'
          value={formData.description}
          onChange={(e)=>{setFormData({...formData,description:e.target.value})}}
          />
        </Formdiv>


        <Formdiv>
          <button type='submit' className='w-full cursor-pointer px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors' disabled={isSigningUp}>
            { isSigningUp?(<>
            <Loader2 className='size-5 animate-spin'/>
            </>):("Create Account")}</button>
        </Formdiv>
      </Form>
      <div className='text-center'>
              <p className='text-gray-400'>Already have an account?{" "}
              <Link to="/login" className='link text-blue-600 hover:text-blue-800'>Sign In</Link>
              </p>
      </div>
    </Div>
  )
}
