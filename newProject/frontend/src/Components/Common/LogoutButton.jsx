
import { apiConnector } from '../../services/apiconnector.js'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { user } from '../../services/api.js'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
const LogoutButton = () => {
const dispatch = useDispatch()

  const navigate = useNavigate();
  const {setToken} = useSelector((state)=>state.auth)
  const {setUser} = useSelector((state)=>state.profile)
  async function onClickHandler() {
    try {
      await apiConnector("POST", user.LOGOUT_API)
  
      dispatch(setToken(null))
      dispatch(setUser(null))


localStorage.removeItem("token")  // remove token from the  localstorage


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

export default  LogoutButton 