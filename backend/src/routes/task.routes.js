import express from "express";
import { newTask } from "../controller/task.controller.js";
import { protectRoute } from "../midlewear/auth.midlewear.js";


const router=express.Router()

router.post('/newtask',protectRoute,newTask)

export default router