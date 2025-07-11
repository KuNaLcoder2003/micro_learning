import express, { Request, Response, Router } from "express"
import multer from "multer"
import { PrismaClient } from "../../generated/prisma"
import { authMiddleware } from "../middlewares/authMiddleware"
import { uploadAvatar } from "../functions/cloudinary"

const prisma = new PrismaClient()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const course_router = express.Router();
course_router.get('/details/:id', authMiddleware, async (req: any, res: Response) => {
    const email = req.teacher_email
    const courseId = req.params.id
    try {
        if (!courseId) {
            res.status(200).json({
                message: 'Bad request'
            })
            return
        }
        const course = await prisma.course.findFirst({
            where: { id: Number(courseId) }
        })
        if (!course) {
            res.status(404).json({
                message: 'Course not found'
            })
        }
        const weeks = await prisma.week.findMany({
            where: { course_id: Number(courseId) }
        })
        const week_ids = weeks.map((obj) => {
            return obj.id
        })
        const videos = await prisma.video.findMany({
            where: {
                week_id: {
                    in: week_ids
                }
            }
        })
        console.log(videos)
        res.status(200).json({
            course,
            videos,
            weeks
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})
course_router.post('/newWeek/:id', authMiddleware, async (req: any, res: Response) => {
    const course_id = req.params.id
    const teacher_email = req.teacher_email
    try {
        const { week_number } = req.body
        if (!week_number) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        // check if the course exists , before adding a new week
        const course = await prisma.course.findFirst({
            where: { id: Number(course_id) }
        })
        if (!course) {
            res.status(404).json({
                message: 'Course not found'
            })
            return
        }
        const new_week = await prisma.week.create({
            data: {
                week_number: week_number,
                course_id: Number(course_id)
            }
        })
        if (!new_week) {
            res.status(402).json({
                message: 'Unable to add course at the moment'
            })
            return
        }
        res.status(200).json({
            message: 'Succesfully added a new week , now you can add videos to it',
            valid: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

course_router.post('/addVideo/:courseId/:weekId', authMiddleware, upload.single('video'), async (req: any, res: Response) => {
    const courseId = Number(req.params.courseId)
    const weekId = Number(req.params.weekId)
    const file = req.file as Express.Multer.File
    try {
        if (!weekId || !courseId || !file) {
            res.status(400).json({
                message: 'Bad requests'
            })
            return
        }
        const course = await prisma.course.findFirst({
            where: {
                id: courseId
            }
        })
        if (!course) {
            res.status(402).json({
                message: 'The course does not exists'
            })
            return
        }
        const week = await prisma.week.findFirst({
            where: {
                id: weekId,
                course_id: courseId
            }
        })
        if (!week) {
            res.status(402).json({
                message: 'The week does not exists'
            })
            return
        }
        const buffer = Buffer.from(file.buffer)
        const upload = await uploadAvatar(buffer , "course_videos" , "video")
        if(!upload.valid) {
            res.status(402).json({
                message : 'Error uploading video'
            })
            return
        }
        const new_video = await prisma.video.create({
            data : {
                course_id : courseId,
                week_id : weekId,
                video_url : upload.url
            }
        })
        if(!new_video) {
            res.status(400).json({
                message : 'Unable to uplaod video'
            })
            return
        }

        res.status(200).json({
            message : 'Succesfully uploaded video',
            video : new_video
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})



export default course_router