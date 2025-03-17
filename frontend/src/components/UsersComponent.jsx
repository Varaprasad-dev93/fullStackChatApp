import React, { useEffect, useState } from 'react'
import { useChatStorer } from '../lib/useChatStorer'
import styled from 'styled-components';
import { Cog, CogIcon, MessageCircle, User, Users } from 'lucide-react';
import { useAuthStorer } from '../lib/useAuthStorer';
import ChatContainer from './ChatContainer';
const Div=styled.div`
color:white;
margin-left:10px;
boder:1px solid white;
padding-top:10px;
`
const Span=styled.span`
margin-left:-20px;
`
const ODiv=styled.div`
position:fixed;
width:70%;
scroll-width:none;
left:35%;
@media(max-width:600px){
width:100%;
}
`
const Cdiv=styled.div`
width:30%;
border:1px solid black;
position:fixed;
// overflow:scroll;
border-radius:5%;
margin:5px;
transition:2s;
border-top:none;
padding:10px;
height:100vh;
@media(max-width:600px){
width:100%;
}
`
export default function UsersComponent() {
    const {users,getUsers,isUsersLoading,isMessagesLoading,selectedUser,setSelectedUser}=useChatStorer();
    const {onlineUsers}=useAuthStorer();
    // const [showUsers,setShowUsers]=useState(true)
    //To get Users
    useEffect(()=>{
        getUsers();
    },[]);
    // console.log(users)
    if(isUsersLoading){
        return(
            <div className='flex justify-center h-full items-center'>
                <Cog className='animate-spin size-15' />
            </div>
        )
    }


    const EmptyContainer=()=>{
        return(
        <div className='flex justify-center items-center h-lvh flex-col'>
            <MessageCircle className='animate-bounce'></MessageCircle>
            Click any user to chat
        </div>
        )
    }

    const Contacts=()=>{
        return (
            <div className=' p-3 space-y-3 cursor-pointer '>
            {users?.map((user) => (
                <button 
                    key={user._id}
                    className={`flex items-center w-full p-3 rounded-lg shadow-sm transition-all duration-300 ${
                        user._id === selectedUser?._id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      }`}
                    onClick={()=>{setSelectedUser(user)}}
                >
                    <div className="relative">
                        <User className="w-10 h-10 border-2 border-blue-100 rounded-full" />
                        {onlineUsers.includes(user._id) && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border border-gray-900 rounded-full"></span>
                    )}
                    </div>
                    <div className='flex justify-between w-full ml-4'>
                    <div>
                    <p className='gap-5 w-full font-semibold'>{user.fullName}</p>

                    <p className='text-sm text-gray-400'>{user.description}</p>
                    </div>
                    <span className={`text-sm font-semibold ${
                            onlineUsers.includes(user._id) ? "text-green-400" : "text-red-400"
                            }`}>
                        {onlineUsers.includes(user._id)?(<span style={{color:"green"}}>Online</span>):(<span style={{color:"red"}}>Offline</span>)}
                    </span>

                    </div>
                </button>
            ))}
            </div>
        )
    }
  return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {/* Contacts Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-700 overflow-y-auto max-h-[90vh] p-4">
        <p className="flex items-center gap-2 text-lg font-semibold">
          <Users className="w-6 h-6" />
          Contacts
        </p>
        <Contacts />
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4">
        {selectedUser == null ? <EmptyContainer /> : <ChatContainer />}
      </div>
    </div>
  )
}
