import React, { useEffect } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import { Toaster } from "react-hot-toast";



import {Loader} from 'lucide-react'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage'
import { useAuthStore } from './store/useAuthStore.js'

const App = () => {

  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={authUser? <HomePage/>:<Navigate to='/login'/>} />
        <Route path='/signup' element={authUser? <Navigate to='/'/>:<SignupPage />} />
        <Route path='/login' element={authUser? <Navigate to='/'/>:<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App