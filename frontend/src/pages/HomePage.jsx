import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import AppSidebar from '../components/AppSidebar';
import NewTask from '../components/NewTask';
import { useNewtaskStore } from '../store/useNewtaskStore';
import { useSidebarStore } from '../store/useSidebarStore';


import Upcoming from "../pages/Upcoming.jsx";

const HomePage = () => {
  const {taskMenuStatus,} = useNewtaskStore();
  const {isOpen,choosenMenu,tasks,getData} = useSidebarStore()

  

  
  return (
    <div className="h-screen w-screen flex">
    {/* Sidebar */}
      <div className={`${isOpen? "w-64":"w-16"}`}>
        <AppSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* NewTask Modal */}
        {taskMenuStatus && (
          <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm">
            <NewTask />
          </div>
        )}

        <div className='h-screen w-[100%] flex'> 

          <div className='p-5 m-3 w-[100%]  bg-gray-100 rounded'>
            <div className="border-b-5 h-15 mb-5">
              <span className='w-[100%] text-6xl font-bold'>{choosenMenu}</span>
            </div>
            {choosenMenu=='Upcoming'? <Upcoming /> : ""}
          </div>

          <div className=' mt-3 mb-3 mr-3 w-[30%] bg-gray-100 rounded'>
            hello
          </div>
        </div>
      </div>
  </div>

  )
}

export default HomePage