import { Routes, Route, Navigate } from "react-router"

import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import NotificationPage from "./pages/NotificationPage"
import CallPage from "./pages/CallPage"
import ChatPage from "./pages/ChatPage"
import OnBoardingPage from "./pages/OnBoardingPage"
import NotFoundPage from "./pages/NotFoundPage"


import { Toaster } from "react-hot-toast"
// import { getAuthUser } from "./lib/api"
import useAuthUser from "./hooks/useAuthUser"
import Layout from "./components/Layout"

const App = () => {

  const { isLoading, authUser } = useAuthUser()

  // const authUser = authData?.user //optional chaining so it does not crash
  //user aya from the route we are hitting us me response mai user bhej rhe h u can verify /auth/me 

  console.log(authUser);
  console.log(isLoading);
  // console.log(error);

  const isAuthenticated = Boolean(authUser)

  const isOnboarded = authUser?.isOnboarded

  return <>
    <Routes>

      {/* “Protected Route” concepts */}
      {/* “We fetch the current user from backend using /auth/me. If user exists, allow access; otherwise redirect to login.” */}

      <Route path="/" element={isAuthenticated && isOnboarded ?
        (

          <Layout showSideBar={true}>
            <HomePage />
          </Layout>
        )
        :
        (<Navigate to={
          !isAuthenticated ? ("/login")
            : ("/onboarding")
        } />)
      }> </Route>


      <Route
        path="/signup"
        element={
          !isAuthenticated ? <SignupPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
        }
      />

      <Route path="/notification" element={isAuthenticated ? <NotificationPage /> : <Navigate to="/signup" />}></Route>

      <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}></Route>

      <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}></Route>

      <Route path="/onboarding" element={<OnBoardingPage />} ></Route>

      <Route path="*" element={<NotFoundPage />}></Route>

      {/* to provide buttons and more , library react-toast */}

    </Routes>

    <Toaster /> {/* used to create components */}

  </>
}

export default App


// flow of routing 
/*

isAuthenticated -- yes -- isOnboarded -- yes --good to go 
                yes -- isOnboarded -- no  -- navigate to onboard page
                
                not authenticated --navigate to login page
                
*/