import { axiosInstance } from "./axios.js"

export const signup = async (signupData) => {
        const response = await axiosInstance.post("/api/v1/auth/signup", signupData)

        return response.data
}


export const getAuthUser = async () => {
        try {
                const response = await axiosInstance.get("/api/v1/auth/me")

                return response.data
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
        const response = axiosInstance.post("/api/v1/auth/login", loginData)
        return response.data
}

export const logout = async () => {
        const response = axiosInstance.post("/api/v1/auth/logout")
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

