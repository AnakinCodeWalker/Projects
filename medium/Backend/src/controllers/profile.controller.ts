
import { Request, Response } from "express"
import prisma from "../lib/prisma.js"

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

import { updateDetailsType, updateDetailsInput } from "../validation/Profile.validation.js"


const updateProfile = asyncHandler(async (req: Request<{}, {}, updateDetailsType, {}>, res: Response): Promise<void> => {

    // @ts-ignore
    const userId = req.userId

    if (!userId)
        throw new ApiError(401, "Unauthorized")




    const result = updateDetailsInput.safeParse(req.body)

    if (result.success == false)
        throw new ApiError(400, "Validation error")

    const { profileId, firstName,
        lastName,
        image,
        gender,
        dateOfBirth,
        contactNumber,
        about } = result.data;


    if (!profileId)
        throw new ApiError(400, "Invalid User/ profile Id")


    const updatedUser = await prisma.user.update({
        where: {
            id: userId,
        }, data: {  //on code directory check object.js
            // if user has given some input then update else dont update it.
            ...(firstName && { firstName }),    // user provided  value && {key : value  } in db..
            ...(lastName && { lastName }),
        },
    })

    if (!updatedUser)
        throw new ApiError(400, "Cannot update User Detail")

    const updatedProfile = await prisma.profile.update({
        where: {
            id: profileId
        }, data: {
            ...(contactNumber && { contactNumber }),
            ...(gender && { gender }),
            ...(dateOfBirth && { dateOfBirth }),
            ...(about && { about }),

            // profile image baki hai .......................

        }
    })
    if (!updatedProfile)
        throw new ApiError(400, "Can not update profile")
    res.status(200)
        .json(new ApiResponse(200, "User details updated successfully", {
            user: updatedUser,
            profile: updatedProfile
        }))


})

const getUserProfile = asyncHandler(async (req: Request<{}, {}, {}, {}>, res: Response): Promise<void> => {

    //@ts-ignore
    const { userId } = req.body as {
        userId: string
    }

    const finduser = await prisma.profile.findUnique({
        where: {
            id: userId
        }
    })

    if (!finduser)
        throw new ApiError(404, "User does not exist")

    res.status(200).json(new ApiResponse(200, "user Details", {
        userProfile: finduser
    }))
})

const deleteProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {


    //@ts-ignore
    const userId = req.userId

    if (!userId)
        throw new ApiError(400, "Invalid User")


    const deletedProfile = await prisma.$transaction([
        prisma.profile.deleteMany({ where: { userId } }), // even there is no profile it will throw an error and it does not need the where clause as well
        prisma.user.delete({ where: { id: userId } })

    ])

    if (!deletedProfile)
        throw new ApiError(409, "cannot delete profile")

    res.status(200)
        .json(new ApiResponse(200, "profile deleted successfully", {
            deletedProfile
        }))
})

export {
    updateProfile,
    getUserProfile,
    deleteProfile
}