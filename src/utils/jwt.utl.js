import jwt from 'jsonwebtoken'
import 'dotenv/config'

const SECRET_KEY=process.env.SECRET_KEY_TOKEN

export const generateToken =(payload)=>{
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn:'1h'})

    return {token};
}


export const verifyToken = (token)=>{
    const decoded = jwt.verify(token, SECRET_KEY)
    return decoded

}