import React, { useEffect, useRef, useState } from 'react'
import { useSidebarStore } from '../store/useSidebarStore'
import TaskCard from '../components/TaskCard'
import { motion } from 'framer-motion'

const Today = () => {
  const { getData, tasks } = useSidebarStore()
  const containerRef = useRef(null)
  const [positions, setPositions] = useState({})
  const [initialized, setInitialized] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const cardRefs = useRef({})
  const pathRefs = useRef([])

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

  useEffect(() => {
    const draw = () => {
      if (!containerRef.current) return

      pathRefs.current.forEach((path, i) => {
        const currentId = todayTasks[i]?._id
        const nextId = todayTasks[i + 1]?._id
        if (!currentId || !nextId) return

        const current = cardRefs.current[currentId]
        const next = cardRefs.current[nextId]
        if (!current || !next) return

        const currRect = current.getBoundingClientRect()
        const nextRect = next.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()

        const x1 = currRect.left + currRect.width / 2 - containerRect.left
        const y1 = currRect.top + currRect.height / 2 - containerRect.top
        const x2 = nextRect.left + nextRect.width / 2 - containerRect.left
        const y2 = nextRect.top + nextRect.height / 2 - containerRect.top

        const dx = Math.abs(x2 - x1) * 0.5
        const c1x = x1 + dx
        const c1y = y1
        const c2x = x2 - dx
        const c2y = y2

        const d = `M ${x1},${y1} C ${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`
        path.setAttribute('d', d)
      })

      requestAnimationFrame(draw)
    }

    draw()
  }, [todayTasks])

  return (
    <div ref={containerRef} className="relative w-full h-[90%] overflow-hidden">
      <svg
        className="absolute inset-0 pointer-events-none z-0"
        width="100%"
        height="100%"
      >
        <defs>
          <filter id="rope-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        {todayTasks.map((_, i) =>
          i < todayTasks.length - 1 ? (
            <path
              key={`path-${i}`}
              ref={el => (pathRefs.current[i] = el)}
              className="stroke-black stroke-[2] fill-none rope-effect"
            />
          ) : null
        )}
      </svg>

      
      {todayTasks.map(task => {
        const pos = positions[task._id] || { x: 0, y: 0 }

        return (
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            key={task._id}
            ref={el => (cardRefs.current[task._id] = el)}
            className="cursor-grab active:cursor-grabbing absolute z-10"
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
