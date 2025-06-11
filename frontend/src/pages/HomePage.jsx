import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import AppSidebar from '../components/AppSidebar';
import NewTask from '../components/NewTask';
import { useNewtaskStore } from '../store/useNewtaskStore';
import { useSidebarStore } from '../store/useSidebarStore';

import { AnimatePresence, motion } from 'framer-motion';


import Upcoming from "../pages/Upcoming.jsx";
import { useTaskStore } from '../store/useTaskStore.js';
import { ShowTaskBig } from '../components/ShowTaskBig.jsx';
import Today from './Today.jsx';
import Stats from './Stats.jsx';
import Calendar from './Calendar.jsx';
import AllTask from './AllTask.jsx';
import SearchMenu from '../components/SearchMenu.jsx';

const HomePage = () => {
  const {taskMenuStatus,} = useNewtaskStore();
  const {isOpen,choosenMenu,tasks,getData,searchQuery,isSearching} = useSidebarStore()
  const {choosenTask} = useTaskStore();


  
  return (
    <div className="h-screen w-screen flex">
    {/* Sidebar */}
      <div className={`${isOpen? "w-64":"w-16"}`}>
        <AppSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* search menu */}
        {isSearching && (
          <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm">
            <SearchMenu />
          </div>
        )}
        {/* NewTask Modal */}
        {taskMenuStatus && (
          <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm">
            <NewTask />
          </div>
        )}

        <div className='h-screen w-[100%] flex transition-all duration-1000'> 

          <motion.div 
            key={choosenMenu}
            className='p-5 m-3 w-[100%] bg-linear-to-b from-gray-100 to-gray-200 rounded '
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "97.5%",
              opacity: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 20,
              duration:0.1
            }}
          >
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
                        case 'All Tasks':
                          return <AllTask />
                        default:
                            return null;
                    }
                })()
            }
          </motion.div>

          <AnimatePresence mode="wait">
            {choosenTask ? (
              <motion.div
                key={choosenTask.id}
                className=' p-5 mt-3 mb-3 mr-3 w-[40%] bg-gray-100 rounded overflow-y-auto max-h-[100%]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration:0.1 }}
              >
                <ShowTaskBig choosenTask={choosenTask}/>
              </motion.div>
            ) : (
              <motion.div
                key="stats"
                className=' p-5 mt-3 mb-3 mr-3 w-[40%] bg-gray-100 rounded overflow-y-auto max-h-[100%]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration:0.1 }}
              >
                <Stats/>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
  </div>

  )
}

export default HomePage