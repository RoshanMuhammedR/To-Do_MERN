import express from "express";
import { deleteTask, getTasks, newTask, toggleTaskCompletion, updateTask } from "../controller/task.controller.js";
import { protectRoute } from "../midlewear/auth.midlewear.js";


const router=express.Router()

router.post('/newtask',protectRoute,newTask);

router.get('/fetchdata',protectRoute,getTasks);

router.patch('/toggle-completion/:id',protectRoute,toggleTaskCompletion);

router.put('/update-task',protectRoute,updateTask)

router.delete('/delete-task',protectRoute,deleteTask);

export default router