import FriendRequest from "../models/FriendRequest";
import User from "../models/User";

export async function getRecommendedUsers(req,resp) {
    try {
        const curretUserId = req.user.id;
        const curretUser = req.user

        const recommendedUsers = await User.find({
            $and: [
                {id: {$ne: curretUserId}} ,//exculed current user //ne = not exist
                {id: {$nin:curretUser.friends}} ,//exclude currect users friends
                {isOnboarded : true}
            ]
        })
        resp.json(recommendedUsers)
    } catch (error) {
        console.error("Error in getRecommendedUsers controller" , error.message)
        resp.status(500).json({message: "Internal server error"})
    }
}


export async function getMyFriends(req, resp) {
    try {
        const user = await User.findById(req.user._id).select("friends")
        .populate("friends" , "fullName  profilePic nativeLanguage learningLanguage")

        resp.json(user.friends)
    } catch (error) {
        console.error("Error in getMyFriends controller " , error.message)
        resp.status(500).json("Internal Server Error")      
    }
}

export async function sendFriendRequest(req , resp) {
    try {
        const myId = req.user.id;
        //const { id } = req.params.id //if you would have written something other than idx in user.routes then here also shoyuld write {idx} 
        //you can also rename this id by the following way
        const {id : recipientId} = req.user.id;

        //prevent sending req to yourself 
        if(myId ===recipientId) return resp.status(400).json({message: "You can't send friend request to yourself"})

        const recipient = await User.findById(recipientId)
        if(!recipient) return resp.status(400).json({message : "Recipient  not found"})

         //check if user is already friends   
        if(recipient.friends.includes(myId)) return resp.status(400).json({message: "You are already friends with this user"})

        //check if a request already exist
        const existingRequest = await FriendRequest.findOne({
            $or:[
                {sender : myId , recipient:recipientId},
                {sender : recipientId , recipient : myId}
            ]
        })

        if(existingRequest) 
            return resp.status(400).json({message: "Request already exists please check the inbox"})

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient : recipientId
        });

        resp.json({friendRequest})
    } catch (error) {
        console.error("Error in sendFriendRequest Controller" , error.message)
        resp.status(500).json({message : "Internal server error"})
    }   
}


export async function acceptFriendRequest(req,resp) {
    try {
        const {id : requestId} = req.params
        const friendRequest = await FriendRequest.findById(requestId)

        if(!friendRequest)
            return resp.status(404).json({message : "Friend request not found"})


        //Verify the current user is the recipient
        if(friendRequest.recipient.toString() !==req.user.id)
            return resp.status(403).json({message : "You are not authorized to accept this request"})

        friendRequest.status = "Accepted"
        await friendRequest.save();


        //add each user to the other's friends array
        //$addToSet adds an element to an array only if it they do not already exist
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet  : {friends : friendRequest.recipient},
        })

        await User.findByIdAndUpdate(friendRequest.recipient , {
            $addToSet : {friends  : friendRequest.sender},
        })

        resp.status(400).json({message : "Friend request accepted"})
    } catch (error) {
        console.error("Error in acceptFriendRequest controller" , error.message);
        resp.status(500).json({message : "Internal Server Error"})
    }
}

export async function getFriendRequest(req, resp) {
    
}