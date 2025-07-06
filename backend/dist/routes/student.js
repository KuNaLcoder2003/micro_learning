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
const student_router = express_1.default.Router();
const cloudinary_1 = require("../functions/cloudinary");
const generateToken_1 = require("../functions/generateToken ");
student_router.post('/signup', upload.single('avatar'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = req.body.details;
        const file = req.file;
        if (!email || !first_name || !last_name || !password || !file) {
            res.status(400).json({
                message: 'Some feilds are missing'
            });
            return;
        }
        const student = yield prisma.student.findFirst({
            where: { email: email }
        });
        if (student) {
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
        const new_student = yield prisma.student.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                avatar: result.url
            }
        });
        if (!new_student) {
            res.status(400).json({
                message: 'Error cretaing account , try again'
            });
            return;
        }
        const token = (0, generateToken_1.generateToken)(new_student.email, "student");
        res.status(200).json({
            message: 'Account Created successfully',
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
student_router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body.cred;
        if (!email || !password) {
            res.status(400).json({
                message: 'Some feilds are missing'
            });
            return;
        }
        const student = yield prisma.student.findFirst({
            where: { email: email }
        });
        if (!student) {
            res.status(404).json({
                message: 'Student not found'
            });
            return;
        }
        const token = (0, generateToken_1.generateToken)(student.email, "student");
        res.status(200).json({
            message: 'Account Created successfully',
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
}));
exports.default = student_router;
