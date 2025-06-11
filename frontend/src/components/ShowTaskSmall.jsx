import React from 'react'
import { useTaskStore } from '../store/useTaskStore.js';

const ShowTaskSmall = ({task,when}) => {
  const {chooseTask} = useTaskStore();
  let date = new Date(task.duedate);
  date = date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:true})
  const showTaskDetails = (task) => {
    chooseTask(task);
  }

  return (
    <div className='flex items-center gap-4 p-5 border-b hover:bg-gray-100' onClick={()=>{showTaskDetails(task)}}>
      <div>
        <span className='text-lg'>{task.title}</span>
      </div>
      <div className='ml-auto text-right'>
        <span className='text-sm text-gray-600'>{when}</span><br />
        <span className='text-md font-medium'>{date}</span>
      </div>

    </div>
  )
}

export default ShowTaskSmall