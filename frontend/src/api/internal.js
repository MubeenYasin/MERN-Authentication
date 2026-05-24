import axios from "axios"
const api = axios.create({
    // baseURL: "http://localhost:5000" ,
    baseURL: process.env.REACT_APP_INTERNAL_API,
    withCredentials: true, // for cookies
    headers: {
        "Content-Type": "application/json"
    }
})
export const login = async (data) => {
    let response
    try {
        response = await api.post('/login', data)
    } catch (error) {return error}
    return response
}
export const signup = async (data) => {
    let response
    try {
        response = await api.post('/register', data)
    } catch (error) {
        return error
    }
    return response
}
export const signuout = async () => {
    let response
    try {
        response = await api.post('/logout')
    } catch (error) {
        return error;
    }
    return response;
}
export const getAllBlogs = async () => {
    let response
    try {
        response = await api.get('/blog/all')
    }
    catch (error) {
        console.log(error)
    }
    return response
}
export const submitBlog = async (data) => {
    let response
    try {
        response = await api.post('/blog', data)
    } catch (error) {
        return console.log(error)
    }
    return response
}
                                