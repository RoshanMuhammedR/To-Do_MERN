import { useSidebarStore } from "../store/useSidebarStore";

import { IoIosTrendingUp } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { CiStickyNote } from "react-icons/ci";
import { LuTableOfContents } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { PiSignOut } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { Loader2 } from 'lucide-react'
import { RiTaskLine } from "react-icons/ri";
import toast from 'react-hot-toast';



import SearchBar from "./SearchBar.jsx";
import { useNewtaskStore } from "../store/useNewtaskStore.js";
import { useEffect, useMemo } from "react";
import { axiosInstance } from "../lib/axios.js";
import { useNavigate } from "react-router-dom";





export const AppSidebar = () => {
    const {isOpen,toggle,choosenMenu,changeMenu,tasks,setIsSearching,setSearchQuery} = useSidebarStore();
    const {taskMenuStatus,openTaskMenu} = useNewtaskStore();
    const items = [
        {name:"Upcoming",icon:IoIosTrendingUp},
        {name:"Today",icon:LuTableOfContents},
        {name:"Calendar",icon:CiCalendar},
        {name:"All Tasks",icon:RiTaskLine},
    ]
    
    const all_tags = useMemo(()=>{
        let tags = new Set();
        if(tasks)
        for(const task of tasks){
            if(task.tags.length > 0 ){
                for(const tag of task.tags){
                    tags.add(tag);
                }
            }
        }
        return Array.from(tags);
    },[tasks]) 

    

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/auth/signout');
            toast.success("Logged out successfully");
            setTimeout(() => {
              window.location.reload(); 
            }, 100);
        } catch (error) {
            console.log("Error logging out:", error);
            toast.error("Failed to log out");
        }
    }
    
    const handleNewTask = () => {
        openTaskMenu()
    }
  return (
    <div className={` relative p-2 bg-gray-100 ${!isOpen?"flex flex-col items-center":""} transition-all duration-300 ${isOpen? "w-64":"w-16"} h-screen`}>
        <div className="flex justify-between p-2">
            {/* menu */}
            {isOpen && (<span className="font-extrabold text-3xl">Menu</span>)}

            {/* open close arrow */}
            <div className="flex justify-center items-center w-9 h-9 hover:bg-gray-200 rounded">
                <FaArrowRight className={` w-7 h-7 transform transition-transform duration-300 
                    ${isOpen?"rotate-180":""}`} onClick={toggle}/>
            </div>

        </div>
        {/* search bar */}
        {isOpen && (<SearchBar/>)}

        {/* creat new Task */}
        <div className=" border border-black flex items-center 
                        justify-center w-full h-10 
                        bg-black text-white mt-2 
                        rounded hover:bg-white hover:text-black"
            onClick={handleNewTask}>
            {taskMenuStatus && <Loader2 className='animate-spin'/>}
            {!taskMenuStatus && <FiPlus className=" w-7 h-7"/>}
            {isOpen && <span className="font-bold">Create Task</span>}
        </div>

        {/* task section - today,upcoming etc... */}
        <div className="p-2">
            {isOpen &&<span className="text-[15px] font-bold">Task</span>}
            {items.map((item)=>(
                <div onClick={()=>changeMenu(item.name)} key={item.name}>
                    
                    <a 
                        className={`flex items-center gap-2 p-2 mt-2 rounded
                        ${item.name==choosenMenu? "bg-black text-white":"hover:bg-gray-200"}`}
                    >
                        <item.icon className='w-7 h-7' />
                        {isOpen && <span>{item.name}</span>}
                    </a>
                </div>
                
            ))}
        </div>
        {isOpen && (
            <div className="my-2 p-2 mt-5">
            {isOpen &&<span className="text-[15px] font-bold">Tags</span>}
            <div className="flex flex-wrap gap-2 mt-2">
                {all_tags && all_tags.map((tag,index) => (
                    <div 
                        className="w-auto h-7 bg-black text-white px-2 
                        rounded-2xl flex items-center justify-center
                        hover:bg-white border hover:border-black 
                        hover:text-black"
                        key={index}
                        onClick={()=>{
                            setSearchQuery(tag);
                            setIsSearching(true);
                        }}
                    >
                        {tag}
                    </div>
                ))}
            </div>
        </div>
        )}
        
        <div className="w-full flex flex-col absolute left-0 bottom-0 p-2">
            {/* <div className=" w-full flex gap-2 p-2  hover:bg-gray-200 rounded">
                <CiSettings className="w-7 h-7"/>
                {isOpen && <span>Settings</span>}
            </div> */}
            <div 
                className="w-full flex gap-2 p-2 hover:bg-gray-200 rounded"
                onClick={()=>handleLogout()}
            >
                <PiSignOut className="w-7 h-7"/>
                {isOpen && <span>Log Out</span>}
            </div>
        </div>
    </div>
  )
}

export default AppSidebar