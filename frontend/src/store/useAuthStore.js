import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLogingIn:false,



    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data})
        } catch (error) {
            console.log(`Error in checkAuth: ${error.message}`);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    
    signup: async (data) => {
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data})
            toast.success("Account Created Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false})
        }
    },

    login: async(data) => {
        set({isLogingIn:true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success("Loged In Successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isLogingIn:false})
        }
    }
}))