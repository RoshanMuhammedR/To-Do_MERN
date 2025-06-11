import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useSidebarStore } from "../store/useSidebarStore";
import { useTaskStore } from "../store/useTaskStore";
import { motion } from "framer-motion";

export const ShowTaskBig = ({ choosenTask }) => {
  const {getData} = useSidebarStore();
  const {chooseTask} = useTaskStore();
  const [task, setTask] = useState({ ...choosenTask });
  const [tagInput, setTagInput] = useState(task.tags.join(', '));

  useEffect(() => {
    setTask({ ...choosenTask });
    setTagInput(choosenTask.tags.join(', '));
  }, [choosenTask]);

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputBlur = () => {
    setTask({ ...task, tags: tagInput.split(',').map(tag => tag.trim()).filter(tag => tag) });
  };

  const handleSave = async () => {
    try {
        const res = await axiosInstance.put('/task/update-task',task);
        toast.success("Task Updated Successfully");
        await getData();
        chooseTask(null);
    } catch (error) {
        toast.error("Task Not Saved");
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete('/task/delete-task', { data: { _id: task._id } });
      toast.success('Task Deleted Successfully');
      await getData();
      chooseTask(null);
    } catch (error) {
      toast.error('Task deletion failed');
    }
  }
  return (
    <motion.div 
      className="w-full flex flex-col justify-between h-full py-6 text-black"
    >
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-y-8">
        <textarea
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          placeholder="Title"
          className="text-4xl font-semibold border-b-2 w-full focus:outline-none resize-none overflow-hidden"
          rows={1}
          spellCheck={false}
        />

        <div>
          <label className="text-xl font-medium block mb-2">Description</label>
          <textarea
            className="border border-gray-400 text-lg w-full p-2 rounded resize-none overflow-hidden focus:outline-none"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
        </div>

        <div className="flex flex-wrap gap-8">
          <div>
            <label className="text-lg font-medium block mb-1">Due Date</label>
            <input
              type="datetime-local"
              className="border border-gray-400 p-2 rounded text-base focus:outline-none"
              value={new Date(task.duedate).toISOString().slice(0, 16)}
              onChange={(e) =>
                setTask({ ...task, duedate: new Date(e.target.value).toISOString() })
              }
            />
          </div>

          <div>
            <label className="text-lg font-medium block mb-1">Priority</label>
            <select
              className="border border-gray-400 p-2 rounded text-base focus:outline-none"
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-lg font-medium block mb-1">Tags (comma-separated)</label>
          <input
            className="w-full p-2 border border-gray-400 rounded focus:outline-none"
            value={tagInput}
            onChange={handleTagInputChange}
            onBlur={handleTagInputBlur}
          />
        </div>

        <div className="flex flex-wrap gap-8">
          <label className="flex items-center gap-2 text-lg">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => setTask({ ...task, isCompleted: !task.isCompleted })}
              className="accent-black"
            />
            Completed
          </label>

          <label className="flex items-center gap-2 text-lg">
            <input
              type="checkbox"
              checked={task.isImportant}
              onChange={() => setTask({ ...task, isImportant: !task.isImportant })}
              className="accent-black"
            />
            Important
          </label>

          <label className="flex items-center gap-2 text-lg">
            <input
              type="checkbox"
              checked={task.pinned}
              onChange={() => setTask({ ...task, pinned: !task.pinned })}
              className="accent-black"
            />
            Pinned
          </label>
        </div>
        <div className="flex justify-between  gap-2">
          <button
            onClick={handleSave}
            className="px-6 py-2 text-lg font-semibold border border-black hover:bg-black hover:text-white transition-all duration-200 rounded w-max"
          >
            Save
          </button>
          <button
            onClick={() => chooseTask(null)}
            className="px-6 py-2 text-lg font-semibold border border-black hover:bg-black hover:text-white transition-all duration-200 rounded w-max"
          >
            Close
          </button>
          <button
            onClick={()=>handleDelete()}
            className="px-6 py-2 text-lg font-semibold border border-black hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-200 rounded w-max"
          >
            Delete
          </button>
        </div>
        
      </form>
  
      <div className="flex justify-end mt-auto pt-6 text-sm text-gray-600">
        <div className="text-right">
          <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
          <p>Last Updated: {new Date(task.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  );
};
