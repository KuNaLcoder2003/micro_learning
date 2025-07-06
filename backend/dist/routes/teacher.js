"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const teacher_router = express_1.default.Router();
const cloudinary_1 = require("../functions/cloudinary");
const generateToken_1 = require("../functions/generateToken ");
teacher_router.post('/signup', upload.single('avatar'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = req.body;
        const file = req.file;
        if (!email || !first_name || !last_name || !password || !file) {
            res.status(400).json({
                message: 'Some feilds are missing'
            });
            return;
        }
        const teacher = yield prisma.teacher.findFirst({
            where: { email: email }
        });
        if (teacher) {
            res.status(402).json({
                message: 'Account already exists'
            });
            return;
        }
        const buffer = Buffer.from(file.buffer);
        const result = yield (0, cloudinary_1.uploadAvatar)(buffer, "avatars");
        if (result.err) {
            res.status(400).json({
                message: 'Unable to upload your avatar'
            });
            return;
        }
        const new_teacher = yield prisma.teacher.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                avatar: result.url
            }
        });
        if (!new_teacher) {
            res.status(400).json({
                message: 'Error cretaing account , try again'
            });
            return;
        }
        const token = (0, generateToken_1.generateToken)(new_teacher.email, "teacher");
        res.status(200).json({
            message: 'Account Created successfully',
            token: token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
teacher_router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body.cred;
        if (!email || !password) {
            res.status(400).json({
                message: 'Some feilds are missing'
            });
            return;
        }
        const teacher = yield prisma.teacher.findFirst({
            where: { email: email }
        });
        if (!teacher) {
            res.status(404).json({
                message: 'Teacher not found'
            });
            return;
        }
        const token = (0, generateToken_1.generateToken)(teacher.email, "teacher");
        res.status(200).json({
            message: 'Logged in succesfully',
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
teacher_router.post('/upload_course/:email', upload.single('course_thumbnail'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        if (!email) {
            res.status(401).json({
                message: 'Permission denied'
            });
            return;
        }
        const { course_name, course_description, price } = req.body;
        const file = req.file;
        if (!course_name || !course_description || !price || !file) {
            res.status(400).json({
                message: 'Incomplete course details'
            });
            return;
        }
        const teacher = yield prisma.teacher.findFirst({
            where: { email: email }
        });
        if (!teacher) {
            res.status(401).json({
                message: "You can't upload course , as the account does not exixts or you are unauthorized"
            });
            return;
        }
        const buffer = Buffer.from(file.buffer);
        const upload_result = yield (0, cloudinary_1.uploadAvatar)(buffer, "courses_thumbnail");
        if (upload_result.err) {
            res.status(400).json({
                message: 'Not able to uplaod the thumbnail , please try again'
            });
            return;
        }
        const course = yield prisma.course.create({
            data: {
                course_name: course_name,
                course_description: course_description,
                price: Number(price),
                teacher_email: email,
                thumbnail: upload_result.url
            }
        });
        if (!course) {
            res.status(400).json({
                message: 'Not able to uplaod the course , please try again'
            });
            return;
        }
        res.status(200).json({
            message: 'Succesfully uploaded course',
            course
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
exports.default = teacher_router;
