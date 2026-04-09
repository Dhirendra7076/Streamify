//getstream.io

import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js' //" Import the default export from this file and store it in a variable called authRoutes."
import userRoutes from './routes/user.routes.js'
import chatRoutes from './routes/chat.route.js'
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



app.use(express.json()) //it tells express that If the client sends JSON data in the request body, convert it into a JavaScript object so I can use it
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true, //allows frontend to send cookies
})
);

app.use("/api/auth" , authRoutes)
app.use("api/users" , userRoutes)
app.use("/api/chats" , chatRoutes)



app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log("Connected to DB: " , mongoose.connection.name)
    connectDB()
})