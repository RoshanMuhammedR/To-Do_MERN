import React, { useState } from 'react'
import logo from '../assets/logo_light.png'

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useAuthStore } from '../store/useAuthStore'
import { Loader2 } from 'lucide-react'

const SignupPage = () => {
  const {signup,isSigningUp} = useAuthStore();
  const [showPassword,setShowPassword] = useState(false)
  const [userFormData,setUserFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userFormData.name || !userFormData.email || !userFormData.password) {
      return;
    }
    signup(userFormData);
  }



  return (
    <div className='m-0 p-0 h-screen'>
      <div className=" h-screen flex">
      <div className="flex-1 bg-[repeating-linear-gradient(45deg,_white_0%_,_white_8%,_#2B2B2B_8%,_#2B2B2B_16%)]"/>
      <div className='flex-1 bg-white'>
        {/* logo */}
        <div className='w-[100%] flex justify-center items-center'>
          <img src={logo} alt="logo_light" className="h-[300px] w-auto" />
        </div>
        <div className='w-[100%] flex justify-center items-center'>
          <div id='form_holder' className='flex flex-col w-[50%]'>
            <form className='flex flex-col gap-10' onSubmit={handleSubmit} >
              <Input  
                placeholder="Username" 
                className='h-[50px] text-xl' 
                onChange={(e)=>setUserFormData({...userFormData,name:e.target.value})}
              />

              <Input 
                type="email" 
                placeholder="Email" 
                className='h-[50px]'
                onChange={(e)=>setUserFormData({...userFormData,email:e.target.value})}
              />
              
              {/* <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium"
                >
                  Remember me
                </label>
              </div> */}

              <div className='flex'>
                <Input 
                  type={`${showPassword?"text":"password"}`} 
                  placeholder="Password" 
                  className='h-[50px] border'
                  onChange={(e)=>setUserFormData({...userFormData,password:e.target.value})}
                />

                <button 
                  type='button' 
                  className=' flex items-center justify-center h-[50px] w-[50px]' 
                  onClick={()=>setShowPassword(!showPassword)}>
                  {showPassword ? <IoMdEye className='text-xl'/> : <IoMdEyeOff className='text-xl'/>}
                </button>

              </div>
              <Button
                disabled={isSigningUp}
                type='submit'
                className='h-[50px]'
              > 
                {isSigningUp && <Loader2 className='animate-spin'/>}
                Sign Up
              </Button>
            </form>
          </div>
        </div>
        
      </div>

      </div>
    </div>
  )
}

export default SignupPage