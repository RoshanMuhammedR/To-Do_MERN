import React, { useEffect, useRef, useState } from 'react'
import { useSidebarStore } from '../store/useSidebarStore'
import TaskCard from '../components/TaskCard'
import { motion } from 'framer-motion'

const Today = () => {
  const { getData, tasks } = useSidebarStore()
  const containerRef = useRef(null)
  const [positions, setPositions] = useState({})
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    getData()
  }, [getData])

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const endOfToday = new Date()
  endOfToday.setHours(23, 59, 59, 999)

  const todayTasks = tasks
    ? tasks.filter(task => {
        const ddate = new Date(task.duedate)
        return !task.isCompleted && ddate >= startOfToday && ddate <= endOfToday
      }).sort((a, b) => new Date(a.duedate) - new Date(b.duedate))
    : []

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        setContainerSize({ width, height })
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (initialized || todayTasks.length === 0 || containerSize.width === 0) return

    const newPositions = {}
    todayTasks.forEach(task => {
      const randomX = Math.floor(Math.random() * (containerSize.width - 200))
      const randomY = Math.floor(Math.random() * (containerSize.height - 150))
      newPositions[task._id] = { x: randomX, y: randomY }
    })

    setPositions(newPositions)
    setInitialized(true)
  }, [todayTasks, containerSize, initialized])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[90%] overflow-hidden"
    >
      {todayTasks.map(task => {
        const pos = positions[task._id] || { x: 0, y: 0 }

        return (
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            key={task._id}
            className="cursor-grab active:cursor-grabbing absolute"
            initial={{ x: pos.x, y: pos.y }}
            animate={{
              x: [pos.x, pos.x + 5, pos.x, pos.x - 5, pos.x],
              y: [pos.y, pos.y - 5, pos.y, pos.y + 5, pos.y],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          >
            <TaskCard task={task} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default Today
