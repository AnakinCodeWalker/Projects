import React from 'react'
import { apiConnector } from '../services/apiconnector'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { user } from '../services/api'
const Setting = () => {

  const navigate = useNavigate();
  async function onClickHandler() {
    try {
      await apiConnector("POST", user.LOGOUT_API)
      toast.success("logged out successfully")
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error("error in logging out")
    } finally {
      console.log(`user logged out`);
    }
  }

  return (

    <div className=' flex flex-col  w-full overflow-y-hidden items-center  text-3xl font-bold text-white '>
      <div className=' flex  flex-col w-full '>
        <button type="button"
          onClick={onClickHandler}
          className='w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
      bg-red-600 text-white
      hover:scale-95 transition-all duration-200'> Logout</button>
      </div>
    </div>
  )
} 

export default Setting