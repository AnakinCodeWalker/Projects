

// gap is not working as expected

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, LucideFileSpreadsheet } from "lucide-react";
import { resetPassword } from "../services/api";
import { Link } from "react-router-dom"
import { apiConnector } from "../services/apiconnector";
import toast from "react-hot-toast";
import { setLoading } from "../slices/authSlice";
// import { setLoading } from "../slices/authSlice";
const ForgotPasswordPage = () => {

  const inputStyle = "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

  // const labelInputStyle = " text-gray-400 text-sm font-bold mb-2"

  const [emailSent, setEmailSent] = useState(false)  // will help in rendering the page according to email is sent or not 
  const [email, setEmail] = useState("")

  //  to send data to store
  const dispatch = useDispatch()
  // state.reducerkey.leftvariable

  /*
  
   state → poora Redux store
auth → reducer key (store me jo naam diya)
loading → uske andar ka variable
*/

  // value extractkrne kai liye use hota hai 
  const loading = useSelector((state) => state.auth.loading)
  // import { Loader2 } from "lucide-react";

  const SubmitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))

      await apiConnector("POST", resetPassword.RESET_PASSWORD_API, {
        email
      })
      dispatch(setLoading(false))
      setEmailSent(true)
      toast.success("email sent successfully")
    } catch (error) {
      console.log(error)
      toast.error("can not  send mail")
    }

  }
  return (

    <div>

      {
        loading ? (<div className=" overflow-y-hidden  bg-white  h-screen w-full flex items-center justify-center">
          <Loader2 className="animate-spin  w-[40%] h-[40%]  " />
        </div>)
          : (
            <div className="text-white mt-10 gap-5  flex-col flex justify-center items-center font-bold">
              <h1 className="">

                {
                  !emailSent ? "Reset your password" : "Check your email"
                }

              </h1>

              <p>
                {
                  !emailSent ? "Dont get Nervous we will email you instruction to reset your password"
                    :
                    `we have sent you the reset  email to ${email}`
                }

              </p>


              <form
                className="flex flex-col gap-y-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={SubmitHandler}
              >
                {!emailSent && (
                  <label className="flex flex-col gap-2 text-gray-400 text-sm font-bold mb-4">
                    <p>Email Address</p>
                    <input
                      type="email"
                      required
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="enter your email"
                      className={inputStyle}
                    />
                  </label>
                )}

                <button
                  type="submit"
                  className="w-full text-center px-6 py-3 rounded-md font-bold text-[13px]
               bg-yellow-300 text-black hover:scale-95 transition-all duration-200"
                >
                  {!emailSent ? "Reset password" : "Resend email"}
                </button>
              </form>

              <div>
                <Link to={"/login"}>
                  <p className="w-full  text-center px-6 py-3 rounded-md font-bold text-[13px]
                                  bg-yellow-300  text-black
                                   hover:scale-95 transition-all duration-200">Back to login</p>

                </Link>
              </div>
            </div>
          )
      }

    </div>
  )
}

export default ForgotPasswordPage



/*

import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";

const dispatch = useDispatch();

dispatch(setSignupData({ name: "Prince", email: "abc@gmail.com" }));



import { useSelector } from "react-redux";

const { signupData, loading, token } = useSelector((state) => state.auth);

*/