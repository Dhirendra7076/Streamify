//getstream.io


import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js' //" Import the default export from this file and store it in a variable called authRoutes."
import { connectDB } from './lib/db.js';
import mongoose from 'mongoose';
//You could actually name it anything:
import cookieParser from 'cookie-parser'

dotenv.config(); // or we can directly write imoport "dotenv/config";

const app = express() //Think of it like this:
// express = a factory
// express() = builds a new server
// app = the server you’ll control
const PORT = process.env.PORT 

// app.get("/api/auth/login" ,(req , resp)=>{
//     resp.send("Login route")
// })

// app.get("/api/auth/signup" , (req, resp) => {
//     resp.send("Signup route")
// })

// app.get("/api/auth/Logout" , (req, resp)=> {
//     resp.send("Logout Route")
// })

app.use(express.json()) //it tells express that If the client sends JSON data in the request body, convert it into a JavaScript object so I can use it
app.use(cookieParser())
app.use("/api/auth" , authRoutes)
app.use("api/users" , userRoutes)



app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log("Connected to DB: " , mongoose.connection.name)
    connectDB()
})