import { Outlet } from 'react-router-dom'
import NavBar from '../Components/Common/NavBar'
import Footer from "../Components/Common/Footer"
import { Toaster } from "react-hot-toast";

const Layout = () => {
    return <>
        <NavBar />

        <Outlet />

        <Toaster />
        <Footer />
    </>
}

export default Layout