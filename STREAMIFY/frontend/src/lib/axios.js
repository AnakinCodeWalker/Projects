import axios from "axios";

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

export const axiosInstance = axios.create({
   baseURL: "http://localhost:3000",
   withCredentials: true     //send the cookies with the request

})   

/*
const response = axios.get("http://localhost:3000/api/v1/auth/signup",data,{
    withCredentials: true 
})
*/