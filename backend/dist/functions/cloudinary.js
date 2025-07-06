"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = uploadAvatar;
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloud = cloudinary_1.default.v2;
cloud.config({
    cloud_name: 'doyifognr',
    api_key: '558719477873916',
    api_secret: 'v8ZvCjyKR-CgQwVd9D8qEpBygxw'
});
function uploadAvatar(buffer, folder_name) {
    return new Promise((res, rej) => {
        const result = cloud.uploader.upload_stream({
            folder: folder_name
        }, (err, result) => {
            if (err)
                rej({ valid: false, error: err });
            else
                res({ url: result === null || result === void 0 ? void 0 : result.secure_url, valid: true });
        });
        result.end(buffer);
    });
}
