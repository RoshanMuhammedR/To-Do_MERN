import React, { useState } from 'react'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Calendar = () => {
    const year = new Date().getFullYear();
    const cur_month = new Date().getMonth()
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    const day_arr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [month,setMonth] = useState(months[cur_month]);
    const [days,setDays] = useState(new Date(year,cur_month+1,0).getDate());
    const handleClick = (dir) => {
        const idx = months.indexOf(month);
        let newidx = (idx + dir + 12) % 12; 
        setMonth(months[newidx]);
        setDays(new Date(year, newidx + 1, 0).getDate());
    }
  return (
    <div className='w-full h-[50rem]'>
        <div className='p-5 w-full h-15 bg-black text-white text-2xl font-bold rounded-t-2xl flex items-center justify-between'>
            <div className='text-4xl' >
                <FaArrowAltCircleLeft onClick={()=>handleClick(-1)}/>
            </div>
            {month}
             <div className='text-4xl'>
                <FaArrowAltCircleRight onClick={()=>handleClick(1)}/>
            </div>
        </div>
        <div className='w-full h-10 flex items-center justify-between font-bold bg-gray-200'>
            {
                day_arr.map((day, index) => (
                    <div key={index} className='basis-1/7 flex items-center justify-center h-10 border border-gray-600'>
                        {day}
                    </div>
                ))  
            }
        </div>
        <div className='w-full flex flex-wrap'>
            {
                [...Array(days)].map((_,index)=>(
                    <div  key={index} className='basis-1/7 h-20 border '>
                        {index+1}
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default Calendar