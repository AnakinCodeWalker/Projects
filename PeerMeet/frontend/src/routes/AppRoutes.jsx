import { Routes, Route } from "react-router-dom";
import Other from "../pages/Other.jsx"
import Home from "../pages/Home.jsx";
import LandingPage from "../pages/LandingPage.jsx"
export const AppRoutes = () => {
    return (
        <>

            <Routes>

                <Route path='/' element={<Home />}> </Route>
                <Route path='*' element={<Other />}> </Route>
                <Route path="/landingPage" element={<LandingPage />}> </Route>
            
            </Routes>

        </>
    )
}
export default AppRoutes
