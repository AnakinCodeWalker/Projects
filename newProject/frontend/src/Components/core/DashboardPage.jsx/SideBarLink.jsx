import React from 'react'

import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

const SideBarLink = ({ link, iconName }) => {


    const Icon = Icons[iconName]
    const location = useLocation()
    const dispatch = useDispatch()

    const matchRoute = (route) => {
        return matchRoute({
            path: route
        },
            location.pathname)
    }

    return (
        <NavLink to={link.path}
            className={`relative px-8 py-2 text-sm  font-medim ${matchRoute(link.path) ? "bg-yellow-300" : "bg-opacity-0"}`}>


            <span className={`absolute bg-yellow-300 left-0 top-0 h-full w-[0.2rem]
    ${matchRoute(link.path) ? "opacity-100" : "opacity-0"} `}>

            </span>


            <div className=' flex items-center gap-x-2'>

                <Icon className="text-lg"></Icon>
                <span>{link.name}</span>

            </div>
        </NavLink >
    )
}

export default SideBarLink