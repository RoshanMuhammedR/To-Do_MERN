import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import AppSidebar from '../components/AppSidebar';
import NewTask from '../components/NewTask';
import { useNewtaskStore } from '../store/useNewtaskStore';

const HomePage = () => {
  const {taskMenuStatus,openTaskMenu,closeTaskMenu} = useNewtaskStore()
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Appbar */}
      <div className="fixed top-0 left-0 h-full z-10">
        <AppSidebar />
      </div>

      {/* NewTask component */}
      {taskMenuStatus && (
        <div className="fixed inset-0 z-30 flex items-center 
                        justify-center backdrop-blur-sm"
            // onClick={()=>closeTaskMenu()}
        >
          <NewTask />
        </div>
      )}
  </div>
  )
}

export default HomePage