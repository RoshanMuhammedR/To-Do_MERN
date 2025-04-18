import express from "express";
import { getTasks, newTask, toggleTaskCompletion } from "../controller/task.controller.js";
import { protectRoute } from "../midlewear/auth.midlewear.js";


const router=express.Router()

router.post('/newtask',protectRoute,newTask)

router.get('/fetchdata',protectRoute,getTasks);

router.patch('/toggle-completion/:id'.protectRoute,toggleTaskCompletion);

export default router