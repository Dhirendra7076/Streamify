import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, resp) {
    try {
        const token = generateStreamToken(req.user.id)

        resp.status(200).json({token})
    } catch (error) {
        console.error("Error in getStreamToken controller: " , error.mesage)
        resp.status(500).json({message : "Internal Server Error"})
    }
}