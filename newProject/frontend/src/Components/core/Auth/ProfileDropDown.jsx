import React from 'react'
import {Link} from "react-router-dom"
const ProfileDropDown = () => {
  return (
    <div className=' text-xl text-white text-center'>
      <Link to={"/dashboard/profile"}>profile</Link>
    </div>
  )
}

export default ProfileDropDown