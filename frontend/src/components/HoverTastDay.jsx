import React, { useState } from 'react'
import { useTaskStore } from '../store/useTaskStore';

const HoverTastDay = ({ tasksForDate }) => {
    const [showMenu, setShowMenu] = useState(false);
    const {chooseTask} = useTaskStore();

    return (
        <div
            className="w-[70%] h-5 relative flex items-center justify-center"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
        >
            {tasksForDate.length > 0 ? (
                <>
                    <div className="bg-black rounded text-white text-xs flex items-center justify-center w-full h-full">
                        <span>{tasksForDate.length} task{tasksForDate.length > 1 ? 's' : ''}</span>
                    </div>
                    {showMenu && (
                        <div className="absolute z-20 left-1/4 top-full   w-60 bg-white border border-gray-300 rounded shadow-lg p-2 ">
                            <ul>
                                {tasksForDate.map((task, idx) => (
                                    <div key={idx} className="text-xl text-black py-1 border-b last:border-b-0 hover:bg-gray-300 p-2 rounded" onClick={()=>chooseTask(task)}>{task.title || "Untitled Task"}</div>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-gray-300 rounded text-xs flex items-center justify-center w-full h-full">
                    <span>No tasks</span>
                </div>
            )}
        </div>
    );
};

export default HoverTastDay