import mongoose, { mongo } from 'mongoose'

const friendRequestSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true,
        },
        recipient: {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status : {
            type : String,
            enum : ["Pending" , "Accepted"],  //only accept these specific values
            default : "Pending",
        },
    },
    {
        timestamps : true,
    }
)

const FriendRequest = mongoose.model("FriendRequest" , friendRequestSchema)

export default FriendRequest