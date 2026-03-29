import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home.jsx"
import Signup from "../Pages/SignupPage.jsx";
import Login from "../Pages/LoginPage.jsx";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage.jsx"
import { useState } from "react";
import DashboardPage from "../Pages/DashboardPage.jsx";
import ContactUsPage from "../Pages/ContactUsPage.jsx";
import AboutUsPage from "../Pages/AboutUsPage.jsx";
import PageNotFound from "../Pages/PageNotFound.jsx"
import ProfilePage from "../Pages/ProfilePage.jsx";
import Layout from "./Layout.jsx";

const AppRoute = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <>
            
            <Routes>
                {/*  this becomes the parent route  which will have the outlets*/}
                <Route path="/" element={<Layout />}>

                  {/*  this will be the default page*/}
                    <Route index element={<Home />}></Route>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
                    <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />}></Route>
                    <Route path="/dashboard" element={<DashboardPage />}></Route>
                    <Route path="/profile" element={<ProfilePage />}></Route>
                    <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
                    <Route path="/about" element={<AboutUsPage />}></Route>
                    <Route path="/contact" element={<ContactUsPage />}></Route>
                    <Route path="/*" element={<PageNotFound />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default AppRoute