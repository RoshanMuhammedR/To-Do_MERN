import React, { useEffect, useRef, useMemo } from 'react'
import { useSidebarStore } from '../store/useSidebarStore'
import { motion, scale } from 'framer-motion'
import { useTaskStore } from '../store/useTaskStore'

const searchTasks = (tasks, query) => {
  if (!query.trim()) return tasks

  const lowerQuery = query.toLowerCase()

  return tasks.filter(task => {
    const {
      title,
      description,
      priority,
      tags,
      isImportant,
      isCompleted,
    } = task

    const searchableValues = [
      title,
      description,
      priority,
      isImportant ? 'important' : '',
      isCompleted ? 'completed' : '',
      ...(tags || []),
    ]

    return searchableValues.join(' ').toLowerCase().includes(lowerQuery)
  })
}

const highlightText = (text, query) => {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="bg-gray-400 font-bold">{part}</span>
    ) : (
      part
    )
  )
}

const SearchMenu = () => {
  const inpRef = useRef(null)
  const {
    searchQuery,
    setSearchQuery,
    tasks,
    setIsSearching, 
  } = useSidebarStore()

  const {chooseTask} = useTaskStore()
  const filteredTasks = useMemo(() => searchTasks(tasks, searchQuery), [tasks, searchQuery])

  useEffect(() => {
    inpRef.current.focus()
    let val = inpRef.current.value
    inpRef.current.value = ''
    inpRef.current.value = val
  }, [])

  return (
    <motion.div
      className='relative bg-white w-[50rem] max-w-full h-auto max-h-[50rem] rounded-lg p-5 pt-10 shadow-lg overflow-y-auto'
      initial={{ x: '-50vh', y: '-50vh', opacity: 0, scale: 0.2 }}
      animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      
      <button
        className="absolute top-0 right-3 text-gray-500 hover:text-gray-800 text-5xl"
        onClick={() => {
          setIsSearching(false);
          setSearchQuery('');
        }}
      >
        &times;
      </button>

      <input
        ref={inpRef}
        className='p-2 w-full h-12 rounded-lg border border-gray-300 focus:border-gray-700 transition-all duration-300 mb-4'
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        spellCheck='false'
      />

      <div className="space-y-3 max-h-[30rem] overflow-auto">
        {filteredTasks.map(task => (
          <div key={task._id} 
            className="border p-3 rounded bg-gray-50 shadow-sm hover:bg-gray-200 transition-all"
            onClick={()=>{
              setIsSearching(false);
              setSearchQuery('');
              chooseTask(task);
            }}
          >
            <div className="font-semibold text-lg">
              {highlightText(task.title, searchQuery)}
            </div>
            <div className="text-sm text-gray-700">
              {highlightText(task.description, searchQuery)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Priority: {highlightText(task.priority, searchQuery)} | Tags:{" "}
              {task.tags?.map((tag, i) => (
                <span key={i}>
                  {highlightText(tag, searchQuery)}
                  {i < task.tags.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-gray-400 italic text-sm text-center">No matching tasks found.</div>
        )}
      </div>
    </motion.div>
  )
}

export default SearchMenu
