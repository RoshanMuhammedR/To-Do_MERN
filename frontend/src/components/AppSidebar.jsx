import { useSidebarStore } from "../store/useSidebarStore";

import { IoIosTrendingUp } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { CiStickyNote } from "react-icons/ci";
import { LuTableOfContents } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { PiSignOut } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { Loader2 } from 'lucide-react'



import SearchBar from "./SearchBar.jsx";
import { useNewtaskStore } from "../store/useNewtaskStore.js";





export const AppSidebar = () => {
    const {isOpen,toggle} = useSidebarStore();
    const {taskMenuStatus,openTaskMenu} = useNewtaskStore()
    const items = [
        {name:"Upcoming",icon:IoIosTrendingUp},
        {name:"Today",icon:LuTableOfContents},
        {name:"Calender",icon:CiCalendar},
        {name:"Sticky Wall",icon:CiStickyNote},
    ]


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
                <a 
                    key={item.name}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                >
                    <item.icon className='w-7 h-7' />
                    {isOpen && <span>{item.name}</span>}
                </a>
            ))}
        </div>
        <div className="my-2 p-2 mt-5">
            {isOpen &&<span className="text-[15px] font-bold">Lists</span>}
        </div>
        <div className="w-full flex flex-col absolute left-0 bottom-0 p-2">
            <div className=" w-full flex gap-2 p-2  hover:bg-gray-200 rounded">
                <CiSettings className="w-7 h-7"/>
                {isOpen && <span>Settings</span>}
            </div>
            <div className="w-full flex gap-2 p-2 hover:bg-gray-200 rounded">
                <PiSignOut className="w-7 h-7"/>
                {isOpen && <span>Log Out</span>}
            </div>
        </div>
    </div>
  )
}

export default AppSidebar