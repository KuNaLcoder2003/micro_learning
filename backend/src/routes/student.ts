import express, { Request, Response } from "express"
import multer from "multer"
import { PrismaClient } from "../../generated/prisma"
const prisma = new PrismaClient()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const student_router = express.Router()
import { uploadAvatar } from "../functions/cloudinary"
import { generateToken } from "../functions/generateToken "

student_router.post('/signup', upload.single('avatar'), async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password } = req.body.details;
        const file = req.file as Express.Multer.File
        if (!email || !first_name || !last_name || !password || !file) {
            res.status(400).json({
                message: 'Some feilds are missing'
            })
            return
        }
        const student = await prisma.student.findFirst({
            where: { email: email }
        })
        if (student) {
            res.status(402).json({
                message: 'Account already exists'
            })
            return
        }
        const buffer = Buffer.from(file.buffer)

        const result = await uploadAvatar(buffer, "avatars" , "image")
        if (result.err) {
            res.status(400).json({
                message: 'Unable to upload your avatar'
            })
            return
        }

        const new_student = await prisma.student.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                avatar: result.url
            }
        })

        if (!new_student) {
            res.status(400).json({
                message: 'Error cretaing account , try again'
            })
            return
        }
        const token = generateToken(new_student.email, "student")

        res.status(200).json({
            message: 'Account Created successfully',
            token: token
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

student_router.post('/signin', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body.cred;

        if (!email || !password) {
            res.status(400).json({
                message: 'Some feilds are missing'
            })
            return
        }
        const student = await prisma.student.findFirst({
            where: { email: email }
        })
        if (!student) {
            res.status(404).json({
                message: 'Student not found'
            })
            return
        }
        const token = generateToken(student.email, "student")
        res.status(200).json({
            message: 'Account Created successfully',
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

student_router.post('/enroll/:courseId', async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        if (!courseId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const course = await prisma.course.findFirst({
            where: { id: Number(courseId) }
        })
        if (!course) {
            res.status(402).json({
                message: 'No course exists'
            })
            return
        }
        const teacher = await prisma.teacher.findFirst({
            where: { email: course.teacher_email }
        })
        // payment check -> integrate stripe (will do afterwards)
        // first check if already exists
        const s = await prisma.student.findFirst({
            where: { email: "riday1234@gmail.com" }
        })
        if (!s) {
            const student = await prisma.student.create({
                data: {
                    first_name: "Riday",
                    last_name: "singh",
                    email: "riday1234@gmail.com",
                    password: "kunal",
                    courses: {
                        create: [
                            {
                                courseId: course.id,
                                courseName: course.course_name,
                            }
                        ]
                    }
                },

            })
            res.status(200).json({
                message: 'Sucessfully enrolled in course',
                student
            })
            return
        }

        const updated = await prisma.studentCourses.create({
            data: {
                studentEmail: "riday1234@gmail.com",
                courseId: Number(courseId),
                courseName: course.course_name,
            }
        })
        res.status(200).json({
            message: 'Sucessfully enrolled in course',
            student: updated
        })


    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})


export default student_router