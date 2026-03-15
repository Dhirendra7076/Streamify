import {StreamChat} from 'stream-chat'
import 'dotenv/config.js'



const apiKey= process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if(!apiKey || !apiSecret) {
    console.log("Steam api key or secret is missing" , )
    process.exit(1);
}


const streamClient = StreamChat.getInstance(apiKey , apiSecret) //with the help of this stream cliet we can communicate and interact with our stream application

export const upsertStreamUser = async (userData) => {
    try {
       await streamClient.upsertUser(userData) //upsert means either create or if it does exist just update it 
       return userData;
    } catch (error) {
        console.error("Error upserting stream user" , error)
    }
}


export const generateStreamToken = (userId)=>{
    try {
        //ensure user id is a string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr)
    } catch (error) {
        console.error("Error generating stream token" , error)
    }
}