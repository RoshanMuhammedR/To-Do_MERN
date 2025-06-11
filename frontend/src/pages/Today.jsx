import React, { useEffect, useRef, useState } from 'react'
import { useSidebarStore } from '../store/useSidebarStore'
import TaskCard from '../components/TaskCard'
import { motion, AnimatePresence } from 'framer-motion'
import no_task_img from '../assets/no_task_bg.png'
const Today = () => {
  const { getData, tasks } = useSidebarStore()

  const containerRef = useRef(null)
  const cardRefs = useRef({})
  const pathRefs = useRef([])

  const [positions, setPositions] = useState({})
  const [initialized, setInitialized] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [isLoading, setIsLoading] = useState(true)

  // Fetch tasks once
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await getData()
      setIsLoading(false)
    }
    fetchData()
  }, [getData])

  // Define today's bounds
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const endOfToday = new Date()
  endOfToday.setHours(23, 59, 59, 999)

  const todayTasks = tasks
    ? tasks
        .filter(task => {
          const ddate = new Date(task.duedate)
          return !task.isCompleted && ddate >= startOfToday && ddate <= endOfToday
        })
        .sort((a, b) => new Date(a.duedate) - new Date(b.duedate))
    : []

  // Initialize container size immediately
  useEffect(() => {
    if (!containerRef.current) return
    
    // Get initial size immediately
    const rect = containerRef.current.getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) {
      setContainerSize({ width: rect.width, height: rect.height })
    }
    
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        setContainerSize({ width, height })
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Generate random positions function
  const generateRandomPositions = (tasks, containerWidth, containerHeight) => {
    const newPositions = {}
    const cardWidth = 220
    const cardHeight = 160
    const padding = 20
    const availableWidth = Math.max(containerWidth - cardWidth - padding * 2, 100)
    const availableHeight = Math.max(containerHeight - cardHeight - padding * 2, 100)

    // Random positioning with collision avoidance
    const usedPositions = []
    const minDistance = Math.min(280, Math.min(availableWidth, availableHeight) / 3)
    
    tasks.forEach(task => {
      let attempts = 0
      let x, y
      
      do {
        x = Math.random() * availableWidth + padding
        y = Math.random() * availableHeight + padding
        attempts++
      } while (
        attempts < 50 && 
        usedPositions.some(pos => 
          Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2) < minDistance
        )
      )
      
      usedPositions.push({ x, y })
      newPositions[task._id] = { x, y }
    })
    
    return newPositions
  }

  // Random positioning with improved timing
  useEffect(() => {
    if (todayTasks.length === 0) {
      setInitialized(true)
      return
    }

    // Use setTimeout to ensure container is properly rendered
    const timer = setTimeout(() => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const currentWidth = rect.width || containerSize.width
      const currentHeight = rect.height || containerSize.height

      if (currentWidth > 0 && currentHeight > 0 && !initialized) {
        const newPositions = generateRandomPositions(todayTasks, currentWidth, currentHeight)
        setPositions(newPositions)
        setInitialized(true)
      }
    }, 100) // Small delay to ensure DOM is ready

    return () => clearTimeout(timer)
  }, [todayTasks, containerSize, initialized])

  // Reset when tasks change significantly
  useEffect(() => {
    if (initialized && todayTasks.length > 0) {
      const hasNewTasks = todayTasks.some(task => !positions[task._id])
      if (hasNewTasks) {
        setInitialized(false)
        setPositions({})
      }
    }
  }, [todayTasks, positions, initialized])

  // Enhanced connection drawing
  useEffect(() => {
    const drawConnections = () => {
      if (!containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()

      pathRefs.current.forEach((path, i) => {
        const fromId = todayTasks[i]?._id
        const toId = todayTasks[i + 1]?._id
        if (!fromId || !toId) return

        const from = cardRefs.current[fromId]
        const to = cardRefs.current[toId]
        if (!from || !to) return

        const fromRect = from.getBoundingClientRect()
        const toRect = to.getBoundingClientRect()

        const x1 = fromRect.left + fromRect.width / 2 - containerRect.left
        const y1 = fromRect.top + fromRect.height / 2 - containerRect.top
        const x2 = toRect.left + toRect.width / 2 - containerRect.left
        const y2 = toRect.top + toRect.height / 2 - containerRect.top

        const midX = (x1 + x2) / 2
        const midY = (y1 + y2) / 2
        const curve = `M ${x1},${y1} Q ${midX},${midY - 50} ${x2},${y2}`
        path.setAttribute('d', curve)
      })

      requestAnimationFrame(drawConnections)
    }

    if (initialized && todayTasks.length > 0) {
      drawConnections()
    }
  }, [todayTasks, initialized])

  const shufflePositions = () => {
    if (containerRef.current && todayTasks.length > 0) {
      const rect = containerRef.current.getBoundingClientRect()
      const newPositions = generateRandomPositions(todayTasks, rect.width, rect.height)
      setPositions(newPositions)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-[90%] flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="relative w-full h-[90%]  rounded-2xl"
    >
        
      {todayTasks.length > 0 && (
        <button
          onClick={shufflePositions}
          className="absolute top-4 right-4 z-10 px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition-colors"
        >
          Shuffle
        </button>
      )}

      {/* Main Content */}
      <div 
        ref={containerRef} 
        className="relative w-full h-full overflow-hidden pt-20"
      >
        {/* Rope Paths */}
        <svg className="absolute inset-0 pointer-events-none z-0" width="100%" height="100%">
          {todayTasks.map((_, i) =>
            i < todayTasks.length - 1 ? (
              <path
                key={`path-${i}`}
                ref={el => (pathRefs.current[i] = el)}
                className="stroke-black stroke-[3] fill-none opacity-60"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
            ) : null
          )}
        </svg>

        {/* Animated Floating Task Cards */}
        <AnimatePresence>
          {todayTasks.map((task, index) => {
            const pos = positions[task._id] || { 
              x: 50 + (index % 3) * 250, // Fallback grid positioning
              y: 50 + Math.floor(index / 3) * 200 
            }
            const floatOffset = 8
            const delay = index * 2

            return (
              <motion.div
                key={task._id}
                ref={el => (cardRefs.current[task._id] = el)}
                drag
                dragConstraints={containerRef}
                dragElastic={0.1}
                dragMomentum={false}
                className="cursor-grab active:cursor-grabbing absolute z-10"
                initial={{ 
                  x: pos.x, 
                  y: pos.y, 
                  opacity: 0, 
                  scale: 0.8 
                }}
                animate={{
                  x: [pos.x, pos.x + floatOffset, pos.x, pos.x - floatOffset, pos.x],
                  y: [pos.y, pos.y - floatOffset, pos.y, pos.y + floatOffset, pos.y],
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  transition: { duration: 0.2 } 
                }}
                transition={{
                  x: { duration: 12, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay },
                  y: { duration: 12, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay },
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  scale: { duration: 0.5, delay: index * 0.1 }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  zIndex: 20,
                  transition: { duration: 0.2 }
                }}
                whileDrag={{ 
                  scale: 1.1, 
                  zIndex: 30,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <TaskCard task={task} />
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* No Task Fallback */}
        {todayTasks.length === 0 && !isLoading && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <img src={no_task_img} alt="No tasks" className="w-64 opacity-40 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">All caught up!</h3>
              <p className="text-gray-500">No tasks scheduled for today. Time to relax!</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Today