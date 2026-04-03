import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { signinInput } from "../Common/validation/User.validation.js"
import { apiConnector } from "../../services/apiconnector.js";
import { user } from '../../services/api.js';
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/profileSlice";
import { setLoading } from '../../slices/profileSlice';
import { Loader2} from "lucide-react";
import { useSelector } from 'react-redux';
// import { setSignupData } from '../../slices/authslice.js';
// import { setToken } from "../../slices/authslice";

const inputStyle = "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
const labelInputStyle = "block text-gray-700 text-sm font-bold mb-2"

const LoginForm = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    function changeHandler(e) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value  //update the field dynamically based on input name”
        }))
    }

    const dispatch = useDispatch();
 const loading = useSelector((state) => state.auth.loading)
    async function submitHandler(event) {

        event.preventDefault()  // page will not re render and i am going to handle the events is se yeh hots hai

        const result = signinInput.safeParse(formData);

        if (!result.success) {  //zod validation

            const firstError = result.error.issues[0];
            toast.error(firstError.message);  //toast error
            return;
        }

        //  make the api request in here .......
        try {
                dispatch(setLoading(true))

            const response = await apiConnector("POST",
                user.SIGNIN_API,
                formData
            )
     dispatch(setLoading(false))

console.log("FULL RESPONSE:", response);  // to find out where the userData and token is?
console.log("DATA:", response.data);

// extracting userData from backend response
//  this line nai bhut paresan kiya yawr  ,
const userData = response?.data?.message?.user;
/*
            const token = response?.data?.message?.token;
            if(!token){
            return  toast.error("Invalid response from server")
            
                }
            */
                //   local storage mai save
            // localStorage.setItem("token", token)
            //    Redux me save karo  we will use this in future
            // dispatch(setToken(token));



if (!userData) {
  return toast.error("User data not found");
}
            dispatch(setUser(userData));
// dispatch(setSignupData(userData))  //checking this in nav bar and renderig component accordingly
            setIsLoggedIn(true);
            toast.success("login successful");
            navigate("/Dashboard");
            console.log(response.data);   //Based on condition change the routes..

        } catch (error) {
                 dispatch(setLoading(false))

           console.log("ERROR:", error?.response?.data);

  const message =
    error?.response?.data?.message || "Login failed";

  return toast.error(message);
        }



    }

    return (
        <div className='text-white'>
         {   
    loading  &&  (<div className=" overflow-y-hidden  bg-white  h-screen w-full flex items-center justify-center">
          <Loader2 className="animate-spin  w-[40%] h-[40%]  " />
        </div>)
        }
            <form className="mt-12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                <label className={labelInputStyle}>
                    <p>
                        Email Address
                    </p>

                    <input className={inputStyle}
                        type="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder='Enter Email id '
                        name='email'
                    />
                </label>

                <label className={labelInputStyle}>
                    <p>
                        Password
                    </p>
                    <input className={inputStyle}
                        type="password"
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder='Enter Password '
                        name='password'
                    />
                    <p className='text-slate-400   text-sm  '>
                        forgot Password?
                        <Link className='text-slate-400 ml-2 underline' to={"/forgot-password"}>
                            forgot-password
                        </Link>
                    </p>

                </label>

                <div>
                    <button className=' w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
       bg-blue-500 text-black
      hover:scale-95 transition-all duration-200' type="submit">
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    )
}
export default LoginForm