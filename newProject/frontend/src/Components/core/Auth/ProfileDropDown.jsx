import React from 'react'
import {Link} from "react-router-dom"
const ProfileDropDown = () => {
  return (
    <div className='w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
      bg-gray-300 text-white
      hover:scale-95 transition-all duration-200'> 
          <Link to={"/dashboard/profile"}>profile</Link>
    </div>
  )
}

export default ProfileDropDown