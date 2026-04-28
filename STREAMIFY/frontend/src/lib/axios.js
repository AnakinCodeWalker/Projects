import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true     //send the cookies with the request

})


//   hr request mai axios instance nhi create krna hoga like this
/*
 WITHOUT INSTANCE : 

axios.get("http://localhost:3000/api/v1/auth/me", {
  withCredentials: true
});

axios.post("http://localhost:3000/api/v1/auth/signup", data, {
  withCredentials: true
});

WITH INSTANCE : 

axiosInstance.get("/api/v1/auth/me");
axiosInstance.post("/api/v1/auth/signup", data);

*/


/*
const response = axios.get("http://localhost:3000/api/v1/auth/signup",data,{
    withCredentials: true 
})
*/