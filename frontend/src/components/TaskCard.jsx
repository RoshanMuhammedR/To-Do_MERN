import React, { useState } from 'react'
import { useTaskStore } from '../store/useTaskStore'


const TaskCard = ({ task }) => {
    const {chooseTask} = useTaskStore();
    let time = new Date(task.duedate);
    time = time.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:true})
    const showTaskDetails = (task) => {
        chooseTask(task)
    }
    


    const priorityBorderColors = {
      low: "border-gray-300",
      medium: "border-gray-600",
      high: "border-gray-900"
    };  

    const borderColorClass = priorityBorderColors[task.priority] || "border-gray-300";


  return (
    <div className={`border ${borderColorClass}  rounded-lg p-5 mb-4 hover:shadow-lg 
                    cursor-pointer transition-shadow duration-200 bg-white text-black 
                    w-70 max-h-90 `}
        onClick={()=>showTaskDetails(task)}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <span className="text-sm font-mono">{time}</span>
      </div>
      <p className="text-gray-700 mb-3 whitespace-pre-line">{task.description}</p>
      <div className="flex justify-between text-sm font-medium">
        <span>Priority: {task.priority}</span>
      </div>
    </div>
  )
}

export default TaskCard
