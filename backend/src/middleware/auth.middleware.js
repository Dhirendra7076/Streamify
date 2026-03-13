import jwt from 'jsonwebtoken'  
import User from '../models/User.js'


export const protectRoute = async (req, resp, next)=> {
    try {
        const token = req.cookies.jwt; //cant do this unless we import cookie parser package in server.js

        if(!token) {
            return resp.status(401).json({message: "Unauthorized - No token provided"})
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)

        if(!decoded) {
            return resp.status(401).json({message: "Unauthorized - Invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password") //we dont want to send password back to client

        if(!user) {
            return resp.status(401).json({message: "Unauthorized - User not found"})
                }
        req.user = user; //attach user id to request
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware" , error)
        return resp.status(500).json({message: "Internal Server Error"})
        
    }
}