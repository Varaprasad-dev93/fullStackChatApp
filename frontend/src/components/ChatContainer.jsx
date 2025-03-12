import React, { useEffect, useRef, useState } from 'react'
import { useChatStorer } from '../lib/useChatStorer';
import { useAuthStorer } from '../lib/useAuthStorer';
import { CogIcon, LoaderPinwheelIcon, SendHorizontal, Trash, User } from 'lucide-react';
import styled from 'styled-components';
const Input=styled.textarea`
border:none;
width:48%;
border:1px solid #395655;
padding:2px 10px;
border-radius:5%;
background-color:#395655;
`
const Button=styled.button`
background-color:#395655;
height:65px;
width:65px;
margin-left:-2%;
`
const Span=styled.span`
`
const MessagesDiv=styled.div`
// width:100%;
`
const Mdiv=styled.div`
position:relative;
left:40%;
`
export default function ChatContainer() {
    const {messages,getMessages,
            isMessagesLoading,selectedUser,
            sendMessage,deleteMessage,
            subscribeToMessages,
            unSubscribeToMessages,
            isSending
        }=useChatStorer();
    const {onlineUsers,authUser}=useAuthStorer();
    const [input,setInput]=useState('');
        console.log(onlineUsers)
    const messageRef=useRef();
    // formatting-Time
    const formatTime = (mongoTime) => {
        return new Date(mongoTime).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
    

   useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
            subscribeToMessages();
        }
        return ()=>unSubscribeToMessages()
    }, [selectedUser]);

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth" });
            messageRef.current.scrollTop=messageRef.current.scrollHeight;
        }
      }, [messages]);
``    

    if(isMessagesLoading===true){
        return(
            <div className='flex justify-center h-full items-center'>
            <CogIcon className='animate-spin size-15' />
        </div>
        )
    }
    const handleMessage=(e)=>{
        e.preventDefault();
        sendMessage(input)
        setInput('')
    }
    const delete1=(Id)=>{
        console.log(Id)
        deleteMessage(Id,authUser)
    }

    return(
        <div className=' flex w-[100%]'>
            <div className='flex border-1 justify-items-center w-[80%] z-10 bg-[#395565] border-gray-800'>
            <User className='w-10 h-10  m-3  border-2 border-blue-100 rounded-full'/>
            {onlineUsers.includes(selectedUser._id)&&(
                <Span className='w-2 h-3 bg-green-500
                rounded-full ring-2 ring-zinc-900 ml-[-3%]
                '/>
            )}
            <p className='gap-10 ml-5 w-full font-semibold'>{selectedUser.fullName}</p>
            </div>
            



                {/* Messages-field */}


            <div className=' z-9 w-[60%] overflow-x-auto fixed h-[70vh]' ref={messageRef}>
            {messages.map((message,index)=>(
                <div key={index} className=''>
                    {message.senderId==selectedUser._id?
                    (<div 
                        style={{scrollbarWidth:"1px"}}
                        className='flex justify-items-end mt-20 '>
                        <div>
                        <pre className='border-1 p-2 break-words bg-gray-800 text-green-400 rounded-md whitespace-pre-wrap w-auto max-w-150 overflow-auto'>
                        {message.text}
                        </pre>
                        <p className='text-xs text-gray-400 mt-1'>{formatTime(message.createdAt)}</p>
                        </div>
                    </div>):
                    (<div 
                        style={{scrollbarWidth:"2px"}}
                        className='flex justify-end  mr-20 '>
                        <br/>
                        <div className='flex-row items-start '>
                        <pre className='border-1 p-2 break-words bg-gray-900 text-blue-600 rounded-md whitespace-pre-wrap w-auto max-w-150 overflow-auto'>
                        {message.text}
                        </pre>
                        <p className='text-xs text-gray-400 mt-1 '>{formatTime(message.createdAt)}</p>
                        </div>
                        <button className=' z-30 cursor-pointer flex items-end size-8 ml-2 text-red-400 hover:text-red-500' onClick={(e)=>{delete1(message)}}><Trash /></button>
                    </div>)}
                </div>
            ))}
            </div>

            {/* input Filed */}


            <div className='flex gap-5 w-full h-15 fixed bottom-10 z-20'>
            <Input 
            type='text' 
            placeholder='Type here..'
            value={input}
            onChange={(e)=>{setInput(e.target.value)}}
            className='focus:outline-none hover:none '
            />
            <Button onClick={handleMessage} className='z-10 cursor-pointer ml-3 p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition '>
            {isSending==false?(<SendHorizontal className='w-7 h-7 z-0'/>):(<LoaderPinwheelIcon className='w-7 animate-spin h-7 z-0'/>)}
            </Button>
            </div>
        </div>
    )
}
