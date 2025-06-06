import React, { useEffect, useRef, useState } from 'react'
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";
import { useAuthStore } from '../store/useAuthStore';
import { useSidebarStore } from '../store/useSidebarStore';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios'

const Stats = () => {
    const inputRef = useRef(null);
    const { authUser,quote } = useAuthStore();
    const { tasks ,getData} = useSidebarStore();
    const [url, setUrl] = useState(null);

    useEffect(()=>{
        getData();
    },[tasks])


    const completedNo = tasks?.filter(task => task.isCompleted).length;
    const pendingNo = tasks?.filter(task => !task.isCompleted).length;
    const dueNo = tasks?.filter(task =>
        !task.isCompleted && new Date(task.duedate) < new Date()
    ).length;

    const handDpClick = () => {
        inputRef.current.click();
    }

    const handleDpUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axiosInstance.post('/upload/dp', formData);
            toast.success("Image updated successfully");
            setUrl(res.data.url);
        } catch (error) {
            console.log("Error while uploading image: ", error);
            toast.error("error while uploading image");
        }
    }

    const chartData = [
        { name: 'Pending', value: pendingNo },
        { name: 'Completed', value: completedNo },
        { name: 'Due', value: dueNo }
    ];

    const COLORS = ['#000000', '#ffffff', '#808080'];

    return (
        <div className='w-[100%] h-[100%]'>
            <div className="h-54 w-full flex flex-col items-center">
                <div className='size-45 rounded-[50%] cursor-pointer border-2 border-black' onClick={handDpClick}>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleDpUpload}
                        ref={inputRef}
                        className='hidden'
                    />
                    {url && (
                        <img
                            src={url}
                            alt="Profile"
                            className="w-full h-full rounded-[50%] object-cover"
                        />
                    )}
                </div>
                <div className="text-4xl font-semibold text-black my-2">{authUser.name}</div>
            </div>

            <div className="grid grid-rows-2 grid-cols-2 gap-4 mt-4">
                <div className='col-span-2 w-full h-full'>
                    <div className="flex flex-col justify-center items-center h-full">
                        <span className='text-lg text-gray-700'>Pending</span>
                        {pendingNo}
                    </div>
                </div>
                <div className='w-full h-30'>
                    <div className="flex flex-col justify-center items-center h-full">
                        <span className='text-lg text-gray-700'>Completed</span>
                        {completedNo}
                    </div>
                </div>
                <div className='w-full h-30'>
                    <div className="flex flex-col justify-center items-center h-full">
                        <span className='text-lg text-gray-700'>Due</span>
                        {dueNo}
                    </div>
                </div>
            </div>

            <div className="w-full h-50 my-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={80}
                            innerRadius={40}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="w-full h-38 bg-gray-700 my-4 flex items-center justify-center text-white">
                {quote}
            </div>
        </div>
    )
}

export default Stats;
