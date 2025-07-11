import cloudinary from "cloudinary"
const cloud = cloudinary.v2
cloud.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
})

interface Result {
    valid: boolean,
    url?: string,
    err?: any
}

export function uploadAvatar(buffer: Buffer, folder_name: string , resource_type : ("image" | "video")): Promise<Result> {
    return new Promise((res, rej) => {
        const result = cloud.uploader.upload_stream({
            folder: folder_name,
            resource_type : `${resource_type}`

        },
            (err, result) => {
                if (err) rej({ valid: false, error: err })
                else res({ url: result?.secure_url, valid: true })
            })
        result.end(buffer)
    })
}

