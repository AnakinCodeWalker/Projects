import { Routes, Route, Navigate } from "react-router"

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
    data: authData, // this is destructuring + renaming 
    isLoading,
    error
  } = useQuery({
    queryKey: ['authUser'], // what does this do ?
    queryFn: async () => {

      //  this function will hit the api 
      const res = await axiosInstance.get("/api/v1/auth/me") // of this route
      return res.data
    }
  })

  const authUser = authData?.user //optional chaining so it does not crash
  //user aya from the route we are hitting us me response mai user bhej rhe h u can verify /auth/me 
  console.log(authUser);
  console.log(isLoading);
  console.log(error);

  return <>
    <Routes>

      {/* “Protected Route” concepts */}
      {/* “We fetch the current user from backend using /auth/me. If user exists, allow access; otherwise redirect to login.” */}

      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}> </Route>

      <Route path="/signup" element={(!authUser) ? <SignupPage /> : <Navigate to="/" />}> </Route>

      <Route path="/login" element={(!authUser) ? <LoginPage /> : <Navigate to="/" />}> </Route>

      <Route path="/notification" element={authData ? <NotificationPage /> : <Navigate to="/signup" />}></Route>

      <Route path="/call" element={authData ? <CallPage /> : <Navigate to="/login" />}></Route>

      <Route path="/chat" element={authData ? <ChatPage /> : <Navigate to="/login" />}></Route>

      <Route path="/onboarding" element={authData ? <OnBoardingPage /> : <Navigate to="/login" />}></Route>

      <Route path="*" element={<NotFoundPage />}></Route>

      {/* to provide buttons and more , library react-toast */}

    </Routes>

    <Toaster /> {/* used to create components */}

  </>
}

export default App