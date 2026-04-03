
// toast on success message nhi aa rha hai 
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { apiConnector } from '../services/apiconnector'
import toast from 'react-hot-toast'
import { confirmResetPassword } from '../services/api'
import { setLoading } from '../slices/authslice'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom" //to extract token from the params
const UpdatePassword = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch() //send something to store 
    const inputStyle = "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

    const { token } = useParams()
    const [FormData, SetFormData] = useState({
        password: "",
        confirmPassword: ""
    })
    const SubmitHandler = async (e) => {
        e.preventDefault()


        if (FormData.password !== FormData.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        try {

            dispatch(setLoading(true))

            await apiConnector("POST",
                `${confirmResetPassword.CONFIRM_RESET_PASSWORD_API}/${token}`,
                {
                    ...FormData,
                    token: token
                }
            )
            dispatch(setLoading(false))

            navigate("/login")
            toast.success("Password updated successfully")
        
        } catch (error) {
            console.log(error)
            toast.error("can not update password ")
            //put this line on every other page..
        } finally { // error aane pr loading ko stop krega..
            dispatch(setLoading(false))
        }
    }
    const handleOnChange = (e) => {
        SetFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    const { loading } = useSelector((state) => state.auth)  // read something from store

    return <div >
        {
            loading ? (<div className=" overflow-y-hidden  bg-white  h-screen w-full flex items-center justify-center">
                <Loader2 className="animate-spin  w-[40%] h-[40%]  " />
            </div>)
                :
                (
                    <div className='flex   mt-10 gap-10 flex-col items-center justify-center'>

                        <p className='font-bold text-center m-y-10 text-gray-400 text-2xl'>Enter your new password</p>

                        <form onSubmit={SubmitHandler}
                            className="w-fit  flex flex-col gap-y-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        >

                            <label className=" flex flex-col gap-2 text-gray-400 text-sm font-bold mb-4">
                                <p> New Password</p>
                                <input type="password"
                                    required
                                    name='password'
                                    value={FormData.password}
                                    onChange={handleOnChange}
                                    className={inputStyle} />
                            </label>

                            <label className="flex flex-col gap-2 text-gray-400 text-sm font-bold mb-4">
                                <p>Confirm  New Password</p>
                                <input type="password"
                                    required
                                    name='confirmPassword'
                                    value={FormData.confirmPassword}
                                    onChange={handleOnChange}
                                    className={inputStyle} />
                            </label>

                            <button
                                type="submit"
                                className="w-full text-center px-6 py-3 rounded-md font-bold text-[13px]
               bg-yellow-300 text-black hover:scale-95 transition-all duration-200"
                            > update pasword
                            </button>
                        </form>
                    </div>)
        }
    </div>

}

export default UpdatePassword