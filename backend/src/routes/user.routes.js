import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {sendFriendRequest,acceptFriendRequest, getFriendRequests, getoutgoingFriendRequests , getRecommendedUsers , getMyFriends} from '../controllers/user.controller.js';

const router = express.Router();

//Apply auth middleware to all the routes
router.use(protectRoute)

router.get("/" ,protectRoute, getRecommendedUsers) //instead of writing protectRoute in every route just do the above one
router.get("/friends" ,protectRoute , getMyFriends)

router.post("/friend-request/:id" ,sendFriendRequest) //this too protected becuase of above line
router.put("/friend-request/:id/accept" , acceptFriendRequest);

router.get("/friend-requests" , getFriendRequests)
router.get("outgoing-friend-requests" , getoutgoingFriendRequests) 

export default router;