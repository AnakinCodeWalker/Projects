import { Routes, Route } from "react-router"

import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import NotificationPage from "./pages/NotificationPage"
import CallPage from "./pages/CallPage"
import ChatPage from "./pages/ChatPage"
import OnBoardingPage from "./pages/OnBoardingPage"
import NotFoundPage from "./pages/NotFoundPage"


import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "./lib/axios"
const App = () => {

  // usequery documentation...  instead of manually hitting an api we are using react query
  const {
    data : authData,
    isLoading,
    error
  } = useQuery({queryKey:['authUser'] , // what does this do ?
    queryFn: async ( ) => {
        
      //  this function will hit the api 
      const res = await axiosInstance.get("/auth/me") // of this route
      return res.data
    }
  })

  const authUser = authData?.user
  console.log(authUser);
  console.log(isLoading);
  console.log(error);
  
  return <>
    <Routes>

      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/notification" element={<NotificationPage />}></Route>
      <Route path="/call" element={<CallPage />}></Route>
      <Route path="/chat" element={<ChatPage />}></Route>
      <Route path="/onboarding" element={<OnBoardingPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>

{/* to provide buttons and more , library react-toast */}
 
    </Routes>

    <Toaster/> {/* used to create components */}
  
  </>
}

export default App