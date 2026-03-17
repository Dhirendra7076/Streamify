import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Notifications from "./pages/Notifications"
import SignUpPage from "./pages/SignUpPage"
import Onboarding from "./pages/Onboarding"
import ChatPage from "./pages/ChatPage"
import CallPage from "./pages/CallPage"

const App = () => {

  return (
    <div className='h-screen' data-theme = "night">
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path = "/notifications" element = {<Notifications/>}/>
        <Route path="/signup" element = {<SignUpPage/>}/>
        <Route path="/onboarding" element ={<Onboarding/>}/>
        <Route path = "/chatpage" element = {<ChatPage/>}/>
        <Route path = "/callpage" element={<CallPage/>}/>
      </Routes>
    </div>
  )
}

export default App
