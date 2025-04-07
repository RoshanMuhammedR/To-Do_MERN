import { create } from 'zustand'

export const useNewtaskStore = create((set)=>({
    taskMenuStatus:false,
    openTaskMenu:()=>{set({taskMenuStatus:true})},
    closeTaskMenu:()=>{set({taskMenuStatus:false})},
}))