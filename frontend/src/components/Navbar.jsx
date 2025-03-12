import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthStorer } from '../lib/useAuthStorer'
import { Loader2, MessageSquareHeart } from 'lucide-react'
const Main=styled.div`
position:fixed;
z-index:2;
background-color:#99a1af;
width:100%;
height:60px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
`
const Links=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
gap:60px;
margin-right:10px;
font-family: 'Quicksand', sans-serif;
font-size: 17px;
font-weight: 600; /* Slightly bold for better visibility */
text-transform: none; /* Keeps text natural */
letter-spacing: 1px;
// flex-direction:column;
`
const Span=styled.span``
export default function Navbar() {
  const {authUser,checkAuth,logout,isLogginOut}=useAuthStorer();
  useEffect(()=>{
    checkAuth();
  },[])
  return (
    <Main>
      <div style={{display:'flex'}}>
      <h1 className='text-2xl font-bold mt-2'>Chat-app</h1>
      <MessageSquareHeart />
      </div>
      <Links >
        <Link to="/" className='cursor-pointer'><Span>Home</Span></Link>
        {/* <Link to="/settings"><Span>Settings</Span></Link> */}
        {authUser==null?(
          <>
          <Link to="/login" className='cursor-pointer'><Span>Login</Span></Link>
          <Link to="/signup" className='cursor-pointer'><Span>Signup</Span></Link>
          </>
        ):(
          <button onClick={()=>{logout()}} className='cursor-pointer'>
            {isLogginOut===true?(<>
            <Loader2 className='size-5 animate-spin'></Loader2>
            </>):("Logout")}
            </button>
        )}
      </Links>
    </Main>
  )
}
