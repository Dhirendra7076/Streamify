import jwt from 'jsonwebtoken'  
import User from '../models/User.js'


export const protectRoute = async (req, resp, next)=> {
    try {
        const token = req.cookies.jwt; //cant do this unless we import cookie parser package in server.js

        if(!token) {
            return resp.status(401).json({message: "Unauthorized - No token provided"})
        }

        const decode = jwt.verify(token , process.env.JWT_SECRET_KEY)
        req.user = decode.id; //attach user id to request
        next();
    } catch (error) {
        
    }
}