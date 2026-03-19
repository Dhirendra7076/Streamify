import { Navigate, Route, Routes } from "react-router"
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

  const {data: authData , isLoading , error} = useQuery({queryKey : ["authUser"], //querykey should be array and not a string
    queryFn : async () => {
      const resp = await axiosInstance.get( "/auth/me");
      return resp.data     
    },
    retry: false, //since this is the auth check 
  })
  const authUser = authData?.user //? for if it is undefined then our code shouldn't break //in auth.routes if we say userx: req.user then it should be userx only here 

  return (
    <div className='h-screen' data-theme = "night">
      <Routes>
        <Route path="/" element = {authUser? <HomePage/> : <Navigate to= "/login"/>}/>
        <Route path="/login" element = {!authUser? <Login/> : <Navigate to = "/"/>}/>
        <Route path = "/notifications" element = {authUser ?<Notifications/> : <Navigate to = "/login"/>}/>
        <Route path="/signup" element = {!authUser ?<SignUpPage/> : <Navigate to = "/"/>}/>
        <Route path="/onboarding" element ={authUser?<Onboarding/> : <Navigate to={"/login"}/>}/>
        <Route path = "/chat" element = {authUser?<ChatPage/> : <Navigate to = "/login"/>}/>
        <Route path = "/call" element={authUser?<CallPage/>: <Navigate to={"/login"}/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
