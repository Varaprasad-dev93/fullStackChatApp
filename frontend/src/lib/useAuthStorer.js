import { create } from 'zustand'
import { axiosInstance } from './axios.js'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
const BASEURL="http://localhost:5001/api";
export const useAuthStorer=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    socket:null,
    onlineUsers:['67b2f3e68390358b09e59a36'],
    
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth:",error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },
    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post('/auth/signup',data);
            set({authUser:res.data});
            console.log("Socket signup")
            toast.success("User was added to our family!")
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp:false})
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try{
            const res=await axiosInstance.post('/auth/login',data);
            set({authUser:res.data})
            toast.success("Log In successful!!")
            console.log("Socket Login")
            get().connectSocket()
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingIn:false});
        }
    },
    logout:async()=>{
        set({isLoggingOut:true})
        try {
            await axiosInstance.post('/auth/logout',"");
            set({authUser:null});
            toast.success("Log out successful!")
            get().disConnectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingOut:false});
        }
    },
    
    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected) return
        const socket=io(BASEURL,{
            query:{
                userId:authUser._id,
            }
        })
        socket.connect()
        set({socket:socket})
        console.log("A user connected",socket.id)
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds+'67b2f3e68390358b09e59a36'})
        });
    },
    disConnectSocket:()=>{
        if(get().socket?.connected) get().socket().disconnect()
        
    },
}))