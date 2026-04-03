import { Outlet } from 'react-router-dom'
import NavBar from '../Components/Common/NavBar'
import Footer from "../Components/Common/Footer"
import { Toaster } from "react-hot-toast";

//  this helps in seprating the  logic that remains the same , like navbar ,  footer

const Layout = () => {
    return <>
        <NavBar />

        <Outlet />

        <Toaster />
        <Footer />
    </>
}

export default Layout