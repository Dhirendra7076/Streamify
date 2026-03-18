import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Notifications from "./pages/Notifications"
import SignUpPage from "./pages/SignUpPage"
import Onboarding from "./pages/Onboarding"
import ChatPage from "./pages/ChatPage"
import CallPage from "./pages/CallPage"
import {Toaster} from 'react-hot-toast'
import { useQuery } from "@tanstack/react-query"
import axios from 'axios'
import { axiosInstance } from "../../backend/src/lib/axios"

const App = () => {

  //axios
  //react query or tanstack query
  //delete => delete, put , post
  //get => useQuery

  const {data , isLoading , error} = useQuery({queryKey : ["todos"], //querykey should be array and not a string
    queryFn : async () => {
      const resp = await axiosInstance.get( "/auth/me");
      return resp.data     
    },
    retry: false, //since this is the auth check 
  })
  console.log({data})

  return (
    <div className='h-screen' data-theme = "night">
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path = "/notifications" element = {<Notifications/>}/>
        <Route path="/signup" element = {<SignUpPage/>}/>
        <Route path="/onboarding" element ={<Onboarding/>}/>
        <Route path = "/chat" element = {<ChatPage/>}/>
        <Route path = "/call" element={<CallPage/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
