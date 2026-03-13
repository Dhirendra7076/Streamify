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