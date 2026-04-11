import asyncHandler from "../utils/asyncHandler.js"

// import { signupInput, signupInput } from "../validations/User.validation.js"

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

import User from "../models/User.model.js"
// import friendRequest from "../models/FriendRequest.model.js"
import friendRequest from "../models/FriendRequest.model.js"
// import friendRequest from "../models/FriendRequest.model.js"

const getRecommendedUser = asyncHandler(async (req, res) => {

    const userId = req.user._id

    if (!userId)
        throw new ApiError(400, "invalid userId")

    const currentUser = await User.findById(userId)

    if (!currentUser)
        throw new ApiError(400, "Can not find User")

    const recommendedUser = await User.find({
        $and: [
            {
                _id: {
                    $ne: currentUser._id  // NOT THE CURRENT ID USER
                    // not my id  / exclude my shelf 
                },

            },
            {
                $id: {
                    $nin: currentUser.friends // NOT THE FRIENDS OF THIS USER
                } // not my friends as well 
                // exclude my friends 
            },
            { isOnboarded: true }
        ]
    })

    if (!recommendedUser)
        throw new ApiError(500, "Internal server error")

    res.status(200).json(new ApiResponse(200, "Recommended friends", {
        friends: recommendedUser
    }))


})

const getMyFriends = asyncHandler(async (req, res) => {

    const userId = req.user.id

    if (!userId)
        throw new ApiError(400, "Invalid userId")


    const user = await User.findById(userId)
        .select("friends")
        .populate("friends", "fullName profilepic nativeLanguage learningLanguage")

    if (!user)
        throw new ApiError(400, "can not fetch user")

    res.status(200).json(new ApiResponse(200, "User Details", {
        user: user
    }))


})


const sendFriendRequest = asyncHandler(async (req, res) => {

    const userId = req.user.id

    if (!userId)
        throw new ApiError(400, "Invalid userId")

    const { id } = req.params

    if (!id)
        throw new ApiError(400, "Invalid id")

    // prevent sending request to ourself
    if (id === userId)
        throw new ApiError(400, "you can not send friend request to your self")

    const recipient = await User.findById(id)
    if (!recipient)
        throw new ApiError(404, "Receipent not found")

    // check if already friends..

    if (recipient.friends.includes(userId))
        throw new ApiError(400, "you are already friend with this user")

    //check if req already exists

    const existingRequest = await friendRequest.findOne({
        $or: [
            {
                sender: userId, recipient: id
            },
            {
                sender: id, recipient: userId

            }
        ]
    })

    if (existingRequest)
        new ApiError(400, "A friend request is already in between you and user")

    const friendRequest = await friendRequest.create({
        sender: userId,
        recipient: id
    })

    if (!friendRequest)
        throw new ApiError(500, "can not create  friend request")

    res.status(200).json(new ApiResponse(200, "friend request created", {
        friendRequest
    }))
})


const acceptFriendRequest = asyncHandler(async (req, res) => {

    const { id: requestId } = req.params

    const friendRequest = await friendRequest.findById(requestId);

    if (!friendRequest)
        throw new ApiError(404, "friend request not found")

    //  verify if the current user is receipent 
    if (friendRequest.recipient.toString() !== req.user.id)
        throw new ApiError(403, "Unauthorized to accept the request")

    friendRequest.status = "accepted"
    friendRequest.save()

    // add each user to other 
    //   add to set only add if the element does not exists 
    await User.findByIdAndUpdate(friendRequest.sender, {
        $addToSet: {
            friends: friendRequest.recipient
        }
    })


    await User.findByIdAndUpdate(friendRequest.recipient, {
        $addToSet: {
            friends: friendRequest.sender
        }
    })

    res.status(new ApiResponse(200 , " friend request accepted"))

})

const getFriendRequest = asyncHandler(async (req ,res) => {
    
})

const getOutgoingFriendRequest = asyncHandler(async (req ,res) => {
    
})

export {
    getRecommendedUser,
    getMyFriends,
    sendFriendRequest,
    acceptFriendRequest,
    getFriendRequest,
    getOutgoingFriendRequest
}
