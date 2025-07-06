import cloudinary from "cloudinary"
const cloud = cloudinary.v2
cloud.config({
    cloud_name: 'doyifognr',
    api_key: '558719477873916',
    api_secret: 'v8ZvCjyKR-CgQwVd9D8qEpBygxw'
})

interface Result {
    valid: boolean,
    url?: string,
    err?: any
}

export function uploadAvatar(buffer: Buffer, folder_name: string): Promise<Result> {
    return new Promise((res, rej) => {
        const result = cloud.uploader.upload_stream({
            folder: folder_name

        },
            (err, result) => {
                if (err) rej({ valid: false, error: err })
                else res({ url: result?.secure_url, valid: true })
            })
        result.end(buffer)
    })
}

