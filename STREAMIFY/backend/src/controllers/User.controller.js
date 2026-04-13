import asyncHandler from "../utils/asyncHandler.js"

// import { signupInput, signupInput } from "../validations/User.validation.js"

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

import User from "../models/User.model.js"
// import friendRequest from "../models/FriendRequest.model.js"
import friendRequest from "../models/FriendRequest.model.js"
// import friendRequest from "../models/FriendRequest.model.js"

const getRecommendedUser = asyncHandler(async (req, res) => {

    const userId = req.user.id

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
                _id: {
                    $nin: currentUser.friends // NOT THE FRIENDS OF THIS USER
                } // not my friends as well 
                // exclude my friends 
            },
            { isOnboarded: true }
        ]
    })

    if (!recommendedUser)
        throw new ApiError(500, "Internal server error")
    res.status(200).json(recommendedUser);



})

const getMyFriends = asyncHandler(async (req, res) => {

    const userId = req.user.id

    if (!userId)
        throw new ApiError(400, "Invalid userId")


    const user = await User.findById(userId)
        .select("friends")
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage")

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
        throw  new ApiError(400, "A friend request is already in between you and user")

    const newFriendRequest  = await friendRequest.create({
        sender: userId,
        recipient: id
    })

    if (!newFriendRequest )
        throw new ApiError(500, "can not create  friend request")

    res.status(200).json(new ApiResponse(200, "friend request created", {
        newFriendRequest 
    }))
})

const acceptFriendRequest = asyncHandler(async (req, res) => {

    const { id: requestId } = req.params;

    const request = await friendRequest.findById(requestId);

    if (!request)
        throw new ApiError(404, "friend request not found");

    // verify recipient
    if (request.recipient.toString() !== req.user._id.toString())
        throw new ApiError(403, "Unauthorized to accept the request");

    // update status
    request.status = "accepted";
    await request.save();

    // add both users as friends
    await User.findByIdAndUpdate(request.sender, {
        $addToSet: {
            friends: request.recipient
        }
    });

    await User.findByIdAndUpdate(request.recipient, {
        $addToSet: {
            friends: request.sender
        }
    });

    // send response
    res.status(200).json(
        new ApiResponse(200, "friend request accepted")
    );
});

const getFriendRequest = asyncHandler(async (req, res) => {
    try {
        const incomingReqs = await friendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const acceptedReqs = await friendRequest.find({
            sender: req.user.id,
            status: "accepted",
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({ incomingReqs, acceptedReqs });
    } catch (error) {
        console.log("Error in getPendingFriendRequests controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

const getOutgoingFriendRequest = asyncHandler(async (req, res) => {
    try {
        const outgoingRequests = await friendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.log("Error in getOutgoingFriendReqs controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

export {
    getRecommendedUser,
    getMyFriends,
    sendFriendRequest,
    acceptFriendRequest,
    getFriendRequest,
    getOutgoingFriendRequest
}
