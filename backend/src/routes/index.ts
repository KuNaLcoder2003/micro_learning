import express from "express"
import student_router from "./student"
import teacher_router from "./teacher"
const router = express.Router()



router.use("/student" , student_router)
router.use("/teacher" , teacher_router)


export default router