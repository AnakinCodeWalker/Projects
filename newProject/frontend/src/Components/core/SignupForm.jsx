import { useState } from 'react'
import CtaButton from './HomePage/CtaButton'
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signupInput } from "../Common/validation/User.validation.js"

import { apiConnector } from "../../services/apiconnector.js";
import { user } from "../../services/api.js"


// jis button pr click kre woh value ho jaye 
//  studnet to role mai student 
// instructor to instructor


const inputStyle = "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
const labelInputStyle = "block text-gray-700 text-sm font-bold mb-2"
const SignupForm = ({ setIsLoggedIn }) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role : "Student"
    })

    const navigate = useNavigate();
    function changeHandler(e) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    async function submitHandler(event) {
        event.preventDefault()

        const result = signupInput.safeParse(formData);

        if (!result.success) {  //zod validation

            const firstError = result.error.issues[0];
            toast.error(firstError.message);  //toast error
            return;
        }


        try {
            const response = await apiConnector(
                "POST",
                user.SIGNUP_API,
                formData
            );


            setIsLoggedIn(true);
            toast.success("Signup successful");
            navigate("/login");
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
            console.log(error)
            console.log(error.response.data);
            toast.error("Signup failed");
        }
    }
    return (
        <div className='justify-center items-center gap-5 flex flex-col text-white'>

            <div className="flex flex-row ml-5 gap-5">
             <button
  type="button"
  name="role"
  value="Student"
  onClick={changeHandler}
  className='w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
      bg-yellow-300 text-black 
      hover:scale-95 transition-all duration-200'
>
  Student
</button>

<button
  type="button"
  name="role"
  value="Instructor"
  onClick={changeHandler}
  className='w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
      bg-blue-500 text-black 
      hover:scale-95 transition-all duration-200'
>
  Instructor
</button>
            </div>

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>

                <div className='gap-3 flex flex-col'>

                    <label className={labelInputStyle}>
                        <p>First Name </p>
                        <input className={inputStyle}
                            type="text"
                            name='firstName'

                            value={formData.firstName}
                            onChange={changeHandler}
                            placeholder='Enter your first Name'
                        />
                    </label>

                    <label className={labelInputStyle}>
                        <p>Last Name </p>
                        <input className={inputStyle}
                            type="text"
                            name='lastName'

                            value={formData.lastName}
                            onChange={changeHandler}
                            placeholder='Enter your last Name'
                        />
                    </label>



                    {/* email */}
                    <label className={labelInputStyle}>
                        <p>Email</p>
                        <input className={inputStyle}
                            type="email"
                            name='email' // if i  made this required , browser will thow its own error ..

                            value={formData.email}
                            onChange={changeHandler}
                            placeholder='Enter your email'
                        />
                    </label>

                    {/* password */}
                    <label className={labelInputStyle}>
                        <p>Password </p>
                        <input className={inputStyle}
                            type="password"
                            name='password'

                            value={formData.password}
                            onChange={changeHandler}
                            placeholder='Enter your password'
                        />
                    </label>

                    {/* confirm password */}
                    <label className={labelInputStyle}>
                        <p>Confirm Password </p>
                        <input className={inputStyle}
                            type="password"
                            name='confirmPassword'

                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            placeholder='Confirm your password'
                        />
                    </label>
                    <p className='text-slate-400  -mt-5 text-sm'>Already have a account?<Link className='text-slate-400 ml-2 underline' to={"/login"}>login</Link></p>
                </div>

                <div className='mt-5  w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
       bg-blue-500 text-black
      hover:scale-95 transition-all duration-200'>
                    <button type="submit">
                        Create Account
                    </button>
                </div>

            </form>
        </div>
    )
}

export default SignupForm