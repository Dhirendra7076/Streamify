import mongoose from 'mongoose'

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected ")
    } catch (error) {
        //resp.status(500).json({message: "Error connecting to MongoDB"})
        console.log(error)
        process.exit(1); //1 means failure
    }
}