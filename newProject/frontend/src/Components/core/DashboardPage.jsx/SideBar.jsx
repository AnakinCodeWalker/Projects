import React from 'react'
import { Loader2 } from 'lucide-react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authApi'
import { useSelector } from 'react-redux'
import SideBarLink from './SideBarLink'

import { VscSettingsGear } from "react-icons/vsc";
const SideBar = () => {

    const { loading: authLoading } = useSelector((state) => state.auth)
    const { user, loading: profileLoading } = useSelector((state) => state.profile)

    if (profileLoading || authLoading) {
        return <div className='text-3xl mx-auto font-bold text-gray-500'>
            <Loader2 className='animate-spin' />
        </div>
    }

    return (
        <div className='flex min-w-[222px] flex-col border-r-[1px] border-black 
        bg-black py-10 h-[calc(100vh-3.5rem) ]'>

            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {

                        //  why do this
                        if (link.type && user?.accountType !== link.type) return null

                        return <>
                            <SideBarLink link={link} key={link.id} iconName={link.icon} />
                        </>
                    })
                }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-black '>
            </div>

            <div className='flex flex-col '>

                <SideBarLink
                    link={{ name: "Settings", path: "dashboard/settings" }}
                    iconName={VscSettingsGear}
                ></SideBarLink>

            </div>
        </div>
    )
}

export default SideBar