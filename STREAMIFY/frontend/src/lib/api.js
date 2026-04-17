import { axiosInstance } from "./axios.js"

export const signup = async (signupData) => {
        const response = await axiosInstance.post("/api/v1/auth/signup", signupData)

        return response.data
}


export const getAuthUser = async () => {
        try {
                const response = await axiosInstance.get("/api/v1/auth/me")

                return response?.data?.data?.user
        } catch (error) {

                console.log(error);
                return null
        }

}

export const completeOnBoarding = async (formState) => {
        const response = await axiosInstance.post("/api/v1/auth/onBoarding", formState)

        return response.data
}

export const login = async (loginData) => {
        const response = await axiosInstance.post("/api/v1/auth/login", loginData)
        return response.data
}

export const logout = async () => {
        const response =  await axiosInstance.post("/api/v1/auth/logout")
        return response.data
}

export const getUserFriends = async () => {
        const response =  await axiosInstance.get("/api/v1/users/friends")
        return response.data.data.user.friends
}


export async function getRecommendedUsers() {
  const response = await axiosInstance.get("api/v1/users");
  return response.data;
}

export const getOutgoingFriendReqs = async () => {
        const response =  await axiosInstance.get("/api/v1/users/outgoing-friend-requests")
        return response.data
}



export const sendFriendRequest = async (userId) => {
        const response =  await axiosInstance.post(`/api/v1/users/friends-request/${userId}`)
        return response.data
}

export const getFriendRequests = async () => {
        const response =  await axiosInstance.get(`/api/v1/users/friends-request`)
        return response.data
}

export const acceptFriendRequest = async (userId) => {
        const response =  await axiosInstance.put(`/api/v1/users/friends-request/${userId}/accept`)
        return response.data
}

export const getStreamToken = async () => {
        const response =  await axiosInstance.put(`/api/v1/chat/token`)
        return response.data
}

/*
handleSignup trigger hua
        ↓
signupMutation(signupData)
        ↓
signup function call hua (API call)
        ↓
axiosInstance.post("/auth/signup", signupData)
        ↓
Backend pe data gaya
        ↓
Response aaya
*/

/*
 axiosInstance.get("/auth/signup", {
  params: data
});
*/

