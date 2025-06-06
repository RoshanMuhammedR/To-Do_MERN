import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import AppSidebar from '../components/AppSidebar';
import NewTask from '../components/NewTask';
import { useNewtaskStore } from '../store/useNewtaskStore';
import { useSidebarStore } from '../store/useSidebarStore';



import Upcoming from "../pages/Upcoming.jsx";
import { useTaskStore } from '../store/useTaskStore.js';
import { ShowTaskBig } from '../components/ShowTaskBig.jsx';
import Today from './Today.jsx';
import Stats from './Stats.jsx';
import Calendar from './Calendar.jsx';
import AllTask from './AllTask.jsx';

const HomePage = () => {
  const {taskMenuStatus,} = useNewtaskStore();
  const {isOpen,choosenMenu,tasks,getData} = useSidebarStore()
  const {choosenTask} = useTaskStore();


  
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
            {
                (() => {
                    switch (choosenMenu) {
                        case 'Upcoming':
                            return <Upcoming />;
                        case 'Today':
                            return <Today />;
                        case 'Calendar':
                            return <Calendar />;
                        case 'All Task':
                          return <AllTask />
                        default:
                            return null;
                    }
                })()
            }
          </div>



          {choosenTask ?  (
            <div className=' p-5 mt-3 mb-3 mr-3 w-[40%] bg-gray-100 rounded overflow-y-auto max-h-[100%]'>
              <ShowTaskBig choosenTask={choosenTask}/>
            </div>
          ): <div className=' p-5 mt-3 mb-3 mr-3 w-[40%] bg-gray-100 rounded overflow-y-auto max-h-[100%]'>
              <Stats/>
            </div>}
          
        </div>
      </div>
  </div>

  )
}

export default HomePage