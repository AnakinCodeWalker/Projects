import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home.jsx"
import NavBar from "../Components/Common/NavBar.jsx";
import Signup from "../Pages/SignupPage.jsx";
import Login from "../Pages/LoginPage.jsx";

import { Toaster } from "react-hot-toast";
import { useState } from "react";
const AppRoute = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <>
            <NavBar />
            <Routes>

                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
                <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />}></Route>

            </Routes>
            <Toaster />
        </>
    )
}

export default AppRoute