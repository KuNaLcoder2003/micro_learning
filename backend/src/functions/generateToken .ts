import jsonwebtoken from "jsonwebtoken"
const secert = "uhqw89eiue9-LM"

export function generateToken(user_email : string , type : string) : jsonwebtoken.Secret {
    const token = jsonwebtoken.sign({email : user_email , type : type} , secert)

    return token
}