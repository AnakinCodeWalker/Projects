//button hit - controll here - backend - response

//  review this method  
// slices 
// reducers
// 
import axios from "axios"

export const axiosInstance = axios.create()

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        bodyData: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null
    })
}