
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import { useState } from "react";

const NewTask = () => {
    const [tags,setTags] = useState([]);
    const {authUser} = useAuthStore()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = async (data)=> {
        data = {...data,section:"task",user:authUser._id,tags:tags}
        const res = await axiosInstance.post('/task/newtask',data);
        ///
    }

    const handleTags = (e) => {
        let tags_data = e.target.value
        if (tags_data.length==0){
            setTags([])
            return
        }
        setTags(tags_data.split(" "))
    }

  return (
    <div className='w-[30%] p-3  border shadow-xl'>
        <form className=" p-6 rounded-xl s
                        hadow-md w-full max-w-md mx-auto 
                        space-y-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Task</h2>

            {/* title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                <input 
                type="text"
                placeholder="Enter title"
                {...register("title", { required: "Title is required" })}
                className="border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none p-2 rounded w-full"
                />
                {errors.title && <p className="text-red-500 animate-pulse">{errors.title.message}</p>}
            </div>

            {/* desc */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                <input 
                type="text"
                placeholder="Enter description"
                {...register("description")}
                className="border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none p-2 rounded w-full"
                />
            </div>

            {/* due date & time */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date & Time:</label>
            <input 
                type="datetime-local"
                {...register("ddate")}
                className="border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none p-2 rounded w-full text-gray-700 bg-white placeholder:text-gray-400"
            />
            </div>


            {/* tags */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags:</label>
                <input 
                type="text"
                placeholder="Optional tags"
                {...register("tags")}
                className="border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none p-2 rounded w-full"
                onChange={handleTags}
                />
            </div>

            {tags && 
                <div className="flex flex-wrap gap-2 ">
                    {tags.map((tag,index)=>(
                        <div className={`flex  items-center justify-center
                            bg-amber-600 w-fit h-7 rounded-full p-2
                            ${tags.length == 0 ? "hidden":""}`}
                            key={index}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            }
            {/* submit btn */}
            <button
                type="submit"
                className="bg-black hover:bg-[#333] text-white font-semibold py-2 px-4 rounded w-full transition duration-200"
            >
                Submit
            </button>
        </form>
    </div>
  )
}

export default NewTask