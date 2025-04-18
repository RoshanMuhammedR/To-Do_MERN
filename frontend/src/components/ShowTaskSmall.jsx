import React from 'react'

const ShowTaskSmall = ({task,when}) => {
  let date = new Date(task.duedate);
  date = date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:true})
  
  const handleTaskCompletion = ()=>{
    
  }
  const handleCheckbox = (e) => {
    console.log(e.target.checked);
    
  }

  return (
    <div className='flex items-center gap-4 p-5 border-b hover:bg-gray-100'>
      <input
        type='checkbox'
        className='accent-black w-7 h-7'
        onChange={handleCheckbox}
      />
      <div>
        <span>{task.title}</span>
      </div>
      <div className='ml-auto text-right'>
        <span className='text-sm text-gray-600'>{when}</span><br />
        <span className='text-md font-medium'>{date}</span>
      </div>

    </div>
  )
}

export default ShowTaskSmall