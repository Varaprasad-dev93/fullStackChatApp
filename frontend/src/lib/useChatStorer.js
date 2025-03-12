import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "./axios";
import { useAuthStorer } from "./useAuthStorer";
export const useChatStorer=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isSending:false,
    message:null,
    getUsers:async()=>{
        set({isUsersLoading:true})
        try {
            const res= await axiosInstance.get('/messages/users');
            set({users:res.data})
            // console.log(res.data)
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading:false})
        }
    },
    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessage:async(data)=>{
        set({isSending:true})
        const {selectedUser}=get()
        try {
            if(selectedUser)
            await axiosInstance.post(`/messages/send/${selectedUser._id}`,{text:data})
            const newMessage = {
                text: data,
                senderId: useAuthStorer.getState().authUser._id,
                receiverId: selectedUser._id,
                createdAt: new Date().toISOString(),
            };
            set((state)=>({messages:[...state.messages,newMessage]}))
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }finally{
            set({isSending:false})
        }
    },
    deleteMessage:async(message,authUser)=>{
        try{
            if(message.senderId==authUser._id){
                await axiosInstance.post('/messages/delete',{id:message._id})
                set((state) => ({
                      messages: state.messages.filter((msg) => msg._id !== message._id)
                    }));
                toast.success("Deleted Successful")
            }
        }catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }
    },

    subscribeToMessages:()=>{
        const {selectedUser}=get()
        console.log(get().messages)
        const socket=useAuthStorer.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            set((state)=>({
                messages:[...state.messages,newMessage]
            }));
        })
    },
    unSubscribeToMessages:()=>{
        const socket=useAuthStorer.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser:(selectedUser)=>set({selectedUser})
}));