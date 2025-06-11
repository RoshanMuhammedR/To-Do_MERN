import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'

export const useSidebarStore = create((set)=>({
    isOpen:true,
    isFetching:false,
    choosenMenu:'Today',
    tasks:null,
    searchQuery:'',
    isSearching:false,
    setIsSearching:(value)=>set({isSearching:value}),
    setSearchQuery:(query)=>set({searchQuery:query}),
    toggle:()=>set((state)=>({isOpen:!state.isOpen})),
    open:()=>set({isOpen:true}),
    close:()=>set({isOpen:false}),

    changeMenu : (menu)=>{set({choosenMenu:menu})},
    getData:async ()=>{
        try {
            const res = await axiosInstance.get('/task/fetchdata');
            set({tasks:res.data})
        } catch (error) {
            console.log("Error while fetching the data");
        }
    }
    
}))