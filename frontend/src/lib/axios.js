import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "http://localhost:3100/api",
    withCredentials: true //when we send a request we want to send the cookie too with the request since in cookies we have tokens for the authentication
})