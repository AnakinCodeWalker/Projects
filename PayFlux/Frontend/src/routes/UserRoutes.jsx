import { Routes, Route } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";
import { Signin } from "../pages/Signin"
import {Signup} from "../pages/Signup" 
const UserRoutes = () => {

    return <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/sigin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
    </Routes>


}

export default UserRoutes