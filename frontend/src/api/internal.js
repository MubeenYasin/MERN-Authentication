import axios from "axios"

// basic configration

const api = axios.create({
    // baseURL: process.env.REACT_APP_INTERNAL_API ,
    baseURL: "http://localhost:5000" ,
    withCredentials: true , // for cookies
    headers:{
        "Content-Type": "application/json"
    }
})
// login method
export const login = async (data) => {
    let response
    try{
        response = await api.post('/login', data)
    }catch(error){
        return error
    }
    return response
}