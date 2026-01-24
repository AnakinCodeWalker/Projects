import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx"
import Register  from "../pages/auth/Register.tsx"
import Login from "../pages/auth/Login.tsx"

const AppRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<Home/>}/>

            <Route path="/register" element={<Register/>}/>
            
            <Route path="/login" element={<Login/>}/>
        
        </Routes>
    )
}

export default AppRoutes
