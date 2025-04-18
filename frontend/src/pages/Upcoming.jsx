  import React, { useEffect } from 'react'
  import { useSidebarStore } from '../store/useSidebarStore'
  import { FiClock, FiCalendar, FiCornerRightDown } from 'react-icons/fi'
  import ShowTaskSmall from '../components/ShowTaskSmall'

  const Upcoming = () => {
    const { getData,tasks } = useSidebarStore()

    useEffect(() => {
      const fetchData = async () => {
        await getData()
      }
      fetchData()
    }, [getData])

    return (
      <div className="p-4">
        {/* Tomorrow */}
        <div className="w-full h-[42vh] bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden mb-5">
          <div className="bg-black w-full h-[3.5rem] rounded-t-xl flex items-center gap-2 px-4">
            <FiClock className="text-white text-2xl" />
            <span className="text-2xl font-semibold text-white">Tomorrow</span>
          </div>
          <div className="overflow-y-auto h-[calc(42vh-3.5rem)] custom-scroll">
            {tasks && tasks.map((task)=>{
              const ddate = new Date(task.duedate);
              const now = new Date();

              const tmrw = new Date();
              tmrw.setDate(now.getDate()+1);
              tmrw.setHours(0,0,0,0);

              const endOfTmrw = new Date();
              endOfTmrw.setDate(now.getDate()+1);
              endOfTmrw.setHours(23,59,59,999);

              if(!task.isCompleted && 
                ddate>=tmrw && ddate<=endOfTmrw
              ){
                return <ShowTaskSmall key={task._id} when="Tommarow" task={task} />
              }
            })}
          </div>
        </div>

        <div className="w-full h-[40vh] flex gap-5">
          {/* This week */}
          <div className="w-1/2 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
            <div className="bg-black w-full h-14 rounded-t-xl flex items-center gap-2 px-4">
              <FiCalendar className="text-white text-2xl" />
              <span className="text-2xl font-semibold text-white">This Week</span>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(40vh-3.5rem)] custom-scroll">

            </div>
          </div>

          {/* later */}
          <div className="w-1/2 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
            <div className="bg-black w-full h-14 rounded-t-xl flex items-center gap-2 px-4">
              <FiCornerRightDown className="text-white text-2xl" />
              <span className="text-2xl font-semibold text-white">Later</span>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(40vh-3.5rem)] custom-scroll">
              {/* Tasks will go here */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default Upcoming
