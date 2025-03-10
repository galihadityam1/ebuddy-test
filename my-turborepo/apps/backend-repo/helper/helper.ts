import jwt from 'jsonwebtoken'
const secret = 'secret'

export const signToken = (payload: any) => {
    return jwt.sign(payload, secret);
}

export const verifyToken = (token: any) => {
    return jwt.verify(token, secret);
}