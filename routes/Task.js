import express from "express"
import { DeleteTask, UpdateTask, getUserTask, newTask } from "../Controllers/TaskControllers.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router=express.Router()

router.post("/new",isAuthenticated,newTask)

router.get("/my",isAuthenticated,getUserTask)

router.put("/:id",isAuthenticated,UpdateTask)

router.delete("/:id",isAuthenticated,DeleteTask)

export default router
