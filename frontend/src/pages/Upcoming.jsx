import React, { useEffect } from 'react'
import { useSidebarStore } from '../store/useSidebarStore'
import { FiClock, FiCalendar, FiCornerRightDown } from 'react-icons/fi'
import ShowTaskSmall from '../components/ShowTaskSmall'

const Upcoming = () => {
  const { getData, tasks } = useSidebarStore()

  useEffect(() => {
    const fetchData = async () => {
      await getData()
    }
    fetchData()
  }, [getData, tasks])

  const now = new Date()

  const tmrwStart = new Date()
  tmrwStart.setDate(now.getDate() + 1)
  tmrwStart.setHours(0, 0, 0, 0)

  const tmrwEnd = new Date()
  tmrwEnd.setDate(now.getDate() + 1)
  tmrwEnd.setHours(23, 59, 59, 999)

  const endOfWeek = new Date()
  endOfWeek.setDate(now.getDate() + (7 - now.getDay()))
  endOfWeek.setHours(23, 59, 59, 999)

  return (
    <div className="p-4">
      <div className="w-full h-[42vh] bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden mb-5">
        <div className="bg-black w-full h-[3.5rem] rounded-t-xl flex items-center gap-2 px-4">
          <FiClock className="text-white text-2xl" />
          <span className="text-2xl font-semibold text-white">Tomorrow</span>
        </div>
        <div className="overflow-y-auto h-[calc(42vh-3.5rem)] custom-scroll">
          {tasks &&
            tasks.map((task) => {
              const ddate = new Date(task.duedate)
              if (!task.isCompleted && ddate >= tmrwStart && ddate <= tmrwEnd) {
                return <ShowTaskSmall key={task._id} when="Tomorrow" task={task} />
              }
            })}
        </div>
      </div>

      <div className="w-full h-[40vh] flex gap-5">
        <div className="w-1/2 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
          <div className="bg-black w-full h-14 rounded-t-xl flex items-center gap-2 px-4">
            <FiCalendar className="text-white text-2xl" />
            <span className="text-2xl font-semibold text-white">This Week</span>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(40vh-3.5rem)] custom-scroll">
            {tasks &&
              tasks.map((task) => {
                const ddate = new Date(task.duedate)
                if (
                  !task.isCompleted &&
                  ddate > tmrwEnd &&
                  ddate <= endOfWeek
                ) {
                  return <ShowTaskSmall key={task._id} when="This Week" task={task} />
                }
              })}
          </div>
        </div>

        <div className="w-1/2 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
          <div className="bg-black w-full h-14 rounded-t-xl flex items-center gap-2 px-4">
            <FiCornerRightDown className="text-white text-2xl" />
            <span className="text-2xl font-semibold text-white">Later</span>
          </div>
          <div className="overflow-y-auto h-[calc(40vh-3.5rem)] custom-scroll">
            {tasks &&
              tasks.map((task) => {
                const ddate = new Date(task.duedate)
                if (!task.isCompleted && ddate > endOfWeek) {
                  return <ShowTaskSmall key={task._id} when="Later" task={task} />
                }
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upcoming
