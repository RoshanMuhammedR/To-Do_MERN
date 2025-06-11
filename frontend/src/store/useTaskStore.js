import { create } from "zustand";

export const useTaskStore = create((set)=>({
    choosenTask: null,
    chooseTask:(task)=>{set({choosenTask:task})}    
}))