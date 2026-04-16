import { Navigate, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Notifications from "./pages/Notifications"
import SignUpPage from "./pages/SignUpPage"
import Onboarding from "./pages/Onboarding"
import ChatPage from "./pages/ChatPage"
import CallPage from "./pages/CallPage"
import {Toaster} from 'react-hot-toast'
import PageLoader from "./components/PageLoader"
import useAuthUser from "./hooks/useAuthUser.js"
import Layout from "./components/Layout.jsx"
import { Home } from "lucide-react"

const App = () => {

  //axios
  //react query or tanstack query
  //delete => delete, put , post
  //get => useQuery


  //instead of writing the below code again and again in all the page we create a custom hook and put it there

  // const {data: authData , isLoading , error} = useQuery({queryKey : ["authUser"], //querykey should be array and not a string
  //   queryFn : async () => {
  //     const resp = await axiosInstance.get( "/auth/me"); //this async function can be shifted in the api.js file
  //     return resp.data     
  //   },
  //   retry: false, //since this is the auth check 
  // })
  // const authUser = authData?.user //? for if it is undefined then our code shouldn't break //in auth.routes if we say userx: req.user then it should be userx only here 
  
  const {isLoading , authUser} =useAuthUser();
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  if(isLoading) return <PageLoader/>


  return (
    <div className='h-screen' data-theme = "night">
      <Routes>
        <Route path="/" element = 
          {isAuthenticated && isOnboarded? (
            <Layout>
              <HomePage/>
            </Layout>
        ): (
          <Navigate to={!isAuthenticated ? '/login' : '/onboarding'}/>
        )
      
      }/>
        <Route path="/login" element = {!isAuthenticated? <Login/> : <Navigate to = {
          isOnboarded? '/' : '/onboarding'
        }/>
        }  
        />
        <Route path = "/notifications" element = {isAuthenticated ?<Notifications/> : <Navigate to = "/login"/>}/>
        <Route path="/signup" element = {!isAuthenticated ? <SignUpPage/> : <Navigate to = "/"/>}/>
        <Route path = "/chat" element = {isAuthenticated?<ChatPage/> : <Navigate to = "/login"/>}/>
        <Route path = "/call" element={isAuthenticated?<CallPage/>: <Navigate to={"/login"}/>}/>
        <Route
                path="/onboarding"
                element={
                  !isAuthenticated ? (
                    <Navigate to="/login" />
                  ) : isOnboarded ? (
                    <Navigate to="/" />
                  ) : (
                    <Onboarding />
                  )
                }
              />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
