// auth.route.js or auth.js ek hi baat hai

import express from 'express'
import {signup , login , logout, onboard} from "../controllers/auth.controllers.js"
import { protectRoute } from '../middleware/auth.middleware.js'
import User from '../models/User.js'

const router = express.Router()  //This lets you define routes separately (like signup, login, etc.) instead of writing everything inside app.js. It helps keep code clean and modular.

router.post("/signup" , signup)

router.post("/login" , login)

router.post("/logout" , logout)

router.post("/onboarding" , protectRoute , onboard)

//checks if user is logged in or not
router.get("/me" , protectRoute , (req,resp)=> {
    resp.status(200).json({succuess: true , user: req.user})
})

export default router