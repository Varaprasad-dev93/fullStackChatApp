import React, { useEffect } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import { useAuthStorer } from './lib/useAuthStorer'
import {Toaster} from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
export default function App() {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStorer();
  useEffect(()=>{
    checkAuth();
  },[])
  if(isCheckingAuth===true){
    return (
      <div className='flex justify-center items-center h-dvh text-2xl'>
        <Loader2 className='animate-spin size-15'></Loader2>
      </div>
    )
  }
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}
