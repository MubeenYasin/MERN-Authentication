import axios from "axios"

// basic configration

const api = axios.create({
    // baseURL: "http://localhost:5000" ,
    baseURL: process.env.REACT_APP_INTERNAL_API ,
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
// register Method
export const signup = async (data) => {
    let response
    try{
        response = await api.post('/register', data)
    }catch(error){
        return error
    }
    return response
}
// logout Method
export const signuout = async () => {
    let response
    try{
        response = await api.post('/logout')
    }catch(error){
        return error;
    }
    return response;
}