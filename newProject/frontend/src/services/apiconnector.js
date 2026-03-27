//button hit - controll here - backend - response

//  review this method  
// slices 
// reducers
// 
import axios from "axios"

export const axiosInstance = axios.create({
baseURL: "http://localhost:3000",
    withCredentials: true
})

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null
    })
}