import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux'
import { NavLink, useLocation, matchPath } from 'react-router-dom'

const SideBarLink = ({ link, iconName }) => {

    const Icon = Icons[iconName] || Icons.VscCircle
    const location = useLocation()
    const dispatch = useDispatch()

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <NavLink

            to={link.path}
            className={`text-white relative px-8 py-2 text-sm font-medium 
            ${matchRoute(link.path) ? "text-yellow-300" : "bg-opacity-0"}`}
        >

            <div className='flex items-center gap-x-2'>
                <Icon className="text-lg" />
                <span>{link.name}</span>
            </div>

        </NavLink>
    )
}

export default SideBarLink