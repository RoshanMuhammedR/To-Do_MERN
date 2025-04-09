import {create} from 'zustand'

export const useSidebarStore = create((set)=>({
    isOpen:true,
    choosenMenu:'Today',
    toggle:()=>set((state)=>({isOpen:!state.isOpen})),
    open:()=>set({isOpen:true}),
    close:()=>set({isOpen:false}),
    changeMenu:(menu)=>{set({choosenMenu:menu})}
}))