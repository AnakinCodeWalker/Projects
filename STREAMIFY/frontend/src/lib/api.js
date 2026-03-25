import {axiosInstance} from "./axios.js"

export const signup = async (signupData) => {
    const response = await axiosInstance.post("/api/v1/auth/signup",signupData)

    return response.data
}


