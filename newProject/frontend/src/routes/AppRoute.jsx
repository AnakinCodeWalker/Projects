import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home.jsx"
import NavBar from "../Components/Common/NavBar.jsx";
import Signup from "../Pages/SignupPage.jsx";
import Login from "../Pages/LoginPage.jsx";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage.jsx"
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import DashboardPage from "../Pages/DashboardPage.jsx";
import ContactUsPage from "../Pages/ContactUsPage.jsx";
import AboutUsPage from "../Pages/AboutUsPage.jsx";
import PageNotFound from "../Pages/PageNotFound.jsx"
const AppRoute = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <>
                <NavBar />
                <Routes>

                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
                    <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />}></Route>
                    <Route path="/dashboard" element={<DashboardPage />}></Route>
                    <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
                    <Route path="/about" element={<AboutUsPage />}></Route>
                    <Route path="/contact" element={<ContactUsPage />}></Route>
                    <Route path="/*" element={<PageNotFound />}></Route>

                </Routes>
                <Toaster />
            </>
        )
}

export default AppRoute