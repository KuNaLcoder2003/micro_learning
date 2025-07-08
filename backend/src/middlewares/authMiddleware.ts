import express from "express"
import jsonwebtoken from "jsonwebtoken"
const secret = "uhqw89eiue9-LM"

interface verify {
    email : string,
    type : string
}


export function authMiddleware(req : any , res : express.Response , next : express.NextFunction ) {
    const authToken = req.headers.authorization as string

    if(!authToken || !authToken.startsWith("Bearer ")){
        res.status(401).json({
            message : 'Unauthorized'
        })
        return
    }
    const token = authToken.split('Bearer ')[1]
    const verified  = jsonwebtoken.verify(token , secret) as verify
    if(!verified.email ) {
        res.status(401).json({
            message : 'Unauthorized'
        })
        return
    }
    else {
        req.teacher_email = verified.email;
        req.type = verified.type
        next()
    }
}

