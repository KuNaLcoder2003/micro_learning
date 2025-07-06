import express, { Request, Response } from "express"
import multer from "multer"
import { PrismaClient } from "../../generated/prisma"
const prisma = new PrismaClient()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const teacher_router = express.Router()
import { uploadAvatar } from "../functions/cloudinary"
import { generateToken } from "../functions/generateToken "

teacher_router.post('/signup', upload.single('avatar'), async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const file = req.file as Express.Multer.File
        if (!email || !first_name || !last_name || !password || !file) {
            res.status(400).json({
                message: 'Some feilds are missing'
            })
            return
        }
        const teacher = await prisma.teacher.findFirst({
            where: { email: email }
        })
        if (teacher) {
            res.status(402).json({
                message: 'Account already exists'
            })
            return
        }
        const buffer = Buffer.from(file.buffer)

        const result = await uploadAvatar(buffer, "avatars")
        if (result.err) {
            res.status(400).json({
                message: 'Unable to upload your avatar'
            })
            return
        }
        const new_teacher = await prisma.teacher.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                avatar: result.url
            }
        })

        if (!new_teacher) {
            res.status(400).json({
                message: 'Error cretaing account , try again'
            })
            return
        }
        const token = generateToken(new_teacher.email, "teacher")

        res.status(200).json({
            message: 'Account Created successfully',
            token: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post('/signin', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body.cred;

        if (!email || !password) {
            res.status(400).json({
                message: 'Some feilds are missing'
            })
            return
        }
        const teacher = await prisma.teacher.findFirst({
            where: { email: email }
        })
        if (!teacher) {
            res.status(404).json({
                message: 'Teacher not found'
            })
            return
        }
        const token = generateToken(teacher.email, "teacher")
        res.status(200).json({
            message: 'Logged in succesfully',
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post('/upload_course/:email', upload.single('course_thumbnail'), async (req: express.Request, res: express.Response) => {
    try {
        const email = req.params.email;
        if (!email) {
            res.status(401).json({
                message: 'Permission denied'
            })
            return
        }
        const { course_name, course_description, price } = req.body
        const file = req.file as Express.Multer.File
        if (!course_name || !course_description || !price || !file) {
            res.status(400).json({
                message: 'Incomplete course details'
            })
            return
        }
        const teacher = await prisma.teacher.findFirst({
            where: { email: email }
        })
        if (!teacher) {
            res.status(401).json({
                message: "You can't upload course , as the account does not exixts or you are unauthorized"
            })
            return
        }
        const buffer = Buffer.from(file.buffer)
        const upload_result = await uploadAvatar(buffer, "courses_thumbnail")
        if (upload_result.err) {
            res.status(400).json({
                message: 'Not able to uplaod the thumbnail , please try again'
            })
            return
        }
        const course = await prisma.course.create({
            data: {
                course_name: course_name,
                course_description: course_description,
                price: Number(price),
                teacher_email: email,
                thumbnail : upload_result.url
            }
        })
        if (!course) {
            res.status(400).json({
                message: 'Not able to uplaod the course , please try again'
            })
            return
        }
        res.status(200).json({
            message : 'Succesfully uploaded course',
            course
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

export default teacher_router