import React, { useEffect, useRef, useState } from 'react'
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";
import { useAuthStore } from '../store/useAuthStore';
import { useSidebarStore } from '../store/useSidebarStore';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import logo from '../assets/default_dp.jpeg'; 

const Stats = () => {
    const inputRef = useRef(null);
    const { authUser,checkAuth } = useAuthStore();
    const { tasks ,getData } = useSidebarStore();
    // const [url, setUrl] = useState(null);
    const [quote, setQuote] = useState({});

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axiosInstance.get('/quote');
                setQuote({ q: response.data[0].q, a: response.data[0].a });
            } catch (error) {
                console.error('Error fetching quote:', error);
                setQuote({ q: "Keep pushing forward!" });
            }
        };
        fetchQuote();
    }, []);

    const completedNo = tasks?.filter(task => task.isCompleted).length;
    const pendingNo = tasks?.filter(task => !task.isCompleted).length;
    const dueNo = tasks?.filter(task =>
        !task.isCompleted && new Date(task.duedate) < new Date()
    ).length;

    const handDpClick = () => {
        inputRef.current.click();
    };

    const handleDpUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axiosInstance.post('/upload/dp', formData);
            toast.success("Image updated successfully");
            await checkAuth();
        } catch (error) {
            console.log("Error while uploading image: ", error);
            toast.error("error while uploading image");
        }
    };

    const chartData = [
        { name: 'Pending', value: pendingNo },
        { name: 'Completed', value: completedNo },
        { name: 'Due', value: dueNo }
    ];

    const COLORS = ['#000000', '#ffffff', '#808080'];

    return (
        <div className='w-full h-full px-4 pt-10'>
            {/* Profile Image */}
            <div className="h-54 w-full flex flex-col items-center">
                <div
                    className='size-45 rounded-full cursor-pointer border-2 border-black shadow-md hover:shadow-lg transition-shadow duration-300'
                    onClick={handDpClick}
                >
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleDpUpload}
                        ref={inputRef}
                        className='hidden'
                    />
                    {authUser.dp ? (
                        <img
                            src={authUser.dp}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    ): (
                        <img
                            src={logo}
                            alt="Default Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    )}
                </div>
                {authUser.dp && (
                    <button
                        className="mt-2 text-xs black-500 hover:text-black transition-colors duration-300"
                        onClick={async (e) => {
                            e.stopPropagation();
                            try {
                                await axiosInstance.post('/upload/remove-dp');
                                toast.success("Profile picture removed");
                                await checkAuth();
                            } catch (error) {
                                toast.error("Failed to remove profile picture");
                            }
                        }}
                    >
                        Remove DP
                    </button>
                )}
                <div className="text-4xl font-extrabold text-black mt-3 mb-4 drop-shadow-sm">
                    {authUser.name}
                </div>
            </div>

            

            {/* Task Stats */}
            <div className="grid grid-cols-3 gap-6 mt-18 text-center">
                <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
                    <span className="text-lg font-medium text-gray-500 mb-2">Pending</span>
                    <span className="text-4xl font-extrabold  drop-shadow">{pendingNo}</span>
                </div>
                <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
                    <span className="text-lg font-medium text-gray-500 mb-2">Completed</span>
                    <span className="text-4xl font-extrabold drop-shadow">{completedNo}</span>
                </div>
                <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
                    <span className="text-lg font-medium text-gray-500 mb-2">Due</span>
                    <span className="text-4xl font-extrabold drop-shadow">{dueNo}</span>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-56 mt-6 flex items-center justify-center">
                <ResponsiveContainer width="80%" height="100%">
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

            {/* Quote */}
            <div className="w-full mt-6 text-center text-black">
                {quote.q && (
                    <blockquote className="italic text-lg font-light tracking-wide leading-relaxed">
                        “{quote.q}”
                        {quote.a && <footer className="mt-2 text-sm font-semibold">&mdash; {quote.a}</footer>}
                    </blockquote>
                )}
            </div>
        </div>
    );
}

export default Stats;
