import { useSelector } from 'react-redux'
import { Loader2 } from "lucide-react";
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/core/DashboardPage/SideBar'

const DashboardPage = () => {

    const { loading: authLoading } = useSelector((state) => state.auth)
    const { loading: profileLoading } = useSelector((state) => state.profile)

    if (profileLoading || authLoading) {
        return (
            <div className=" overflow-y-hidden  bg-white  h-screen w-full flex items-center justify-center">
          <Loader2 className="animate-spin  w-[40%] h-[40%]  " />
        </div>
        )
    }

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>

            <SideBar />

            <div className='h-[calc(100vh-3.5rem)] overflow-auto flex-1'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default DashboardPage