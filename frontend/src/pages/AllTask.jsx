import React, { useEffect } from 'react'
import { useSidebarStore } from '../store/useSidebarStore'
import { FiCheckCircle } from 'react-icons/fi'
import { useTaskStore } from '../store/useTaskStore';
import { MdOutlinePendingActions } from "react-icons/md";


const AllTask = () => {
  const { getData, tasks } = useSidebarStore();
  const {chooseTask} = useTaskStore()

  useEffect(() => {
    getData()
  }, [getData])

  const incompleteTasks = tasks?.filter(task => !task.isCompleted) || []
  const completedTasks = tasks?.filter(task => task.isCompleted) || []

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    let time = new Date(dateStr);
    time = time.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:true});
    return time
  };

  return (
    <div className="p-4 overflow-y-auto max-h-[85vh]">
      {incompleteTasks.length === 0 && completedTasks.length === 0 && (
        <div className="text-center text-black text-lg">No tasks found.</div>
      )}

      {incompleteTasks.length > 0 && (
        <div>
          <div className="text-black font-bold mb-3 text-xl tracking-wide border-b border-black pb-1 flex items-center gap-2">
            <MdOutlinePendingActions te/>
            Pending
          </div>
          {incompleteTasks.map(task => (
            <div
              key={task._id}
              className="mb-3 bg-white border border-black rounded-lg shadow flex flex-col px-4 py-2 transition hover:scale-[1.01] hover:shadow-lg"
              onClick={()=>chooseTask(task)}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{task.title || "Untitled Task"}</span>
                <span className="text-xs text-black opacity-70 ml-2 px-2 py-1 border border-black rounded">
                  {formatTime(task.duedate)}
                </span>
              </div>
              <div className="text-xs text-black opacity-60 ml-1 mt-1">
                {formatDate(task.duedate)}
              </div>
            </div>
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="mt-8">
          <div className="text-black font-bold mb-3 text-xl tracking-wide border-b border-black pb-1 flex items-center gap-2">
            <FiCheckCircle className="text-black" />
            Completed
          </div>
          {completedTasks.map(task => (
            <div
              key={task._id}
              className="mb-3 bg-white border border-black rounded-lg flex flex-col px-4 py-2 opacity-60 line-through"
              onClick={()=>chooseTask(task)}  
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{task.title || "Untitled Task"}</span>
                <span className="text-xs text-black opacity-80 ml-2 px-2 py-1 border border-black rounded">
                  {formatTime(task.duedate)}
                </span>
              </div>
              <div className="text-xs text-black opacity-60 ml-1 mt-1">
                {formatDate(task.duedate)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllTask