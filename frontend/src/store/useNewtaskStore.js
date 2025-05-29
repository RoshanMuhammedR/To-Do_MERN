import { create } from 'zustand'

export const useNewtaskStore = create((set)=>({
    taskMenuStatus:false,
    tasking:false,
    openTaskMenu:()=>{set({taskMenuStatus:true})},
    closeTaskMenu:()=>{set({taskMenuStatus:false})},
    setTaskingTrue:()=>{set({tasking:true})},
    setTaskingFalse:()=>{set({tasking:false})},
}))