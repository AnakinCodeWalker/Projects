import { useSelector } from 'react-redux'
import { Loader2 } from "lucide-react";
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/core/DashboardPage.jsx/SideBar'
const DashboardPage = () => {

    const { loading: authLoading } = useSelector((state) => state.auth)
    const { loading: profileLoading } = useSelector((state) => state.profile)

    if (profileLoading || authLoading) {
        return <div className='text-3xl mx-auto font-bold text-gray-500'>
            <Loader2 className='animate-spin' />
        </div>
    }

    return (
        <div className=' relative flex min-h-[calc[(100vh-3.5rem)]'>
            <SideBar />

            <div className='h-[calc(100vh-3.5rem) ] overflow-auto'>

                <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default DashboardPage