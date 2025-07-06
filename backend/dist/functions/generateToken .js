"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secert = "uhqw89eiue9-LM";
function generateToken(user_email, type) {
    const token = jsonwebtoken_1.default.sign({ email: user_email, type: type }, secert);
    return token;
}
