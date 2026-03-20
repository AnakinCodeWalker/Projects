import {axiosInstance} from "./axios.js"

export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/v1/signup",signupData)

    return response.data
}