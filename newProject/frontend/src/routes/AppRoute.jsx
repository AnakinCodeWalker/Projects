import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home.jsx"
import NavBar from "../Components/Common/NavBar.jsx";
import Signup from "../Pages/Signup.jsx";
const AppRoute = () => {
    return (
        <>
         <NavBar/>
            <Routes>
               
                <Route path="/" element={<Home/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>

            </Routes>
        </>
    )
}

export default AppRoute