import { useState } from 'react'
import CtaButton from './HomePage/CtaButton'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signupInput } from "../Common/validation/User.validation.js"
const SignupForm = ({ setIsLoggedIn }) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const navigate = useNavigate();
    function changeHandler(e) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    function submitHandler(event) {
        event.preventDefault()

        const result = signupInput.safeParse(formData);

        if (!result.success) {  //zod validation

            const firstError = result.error.issues[0];
            toast.error(firstError.message);  //toast error
            return;
        }



        setIsLoggedIn(true)
        toast.success("signup successful")
        navigate("/dashboard")  // change it later on 
    }
    return (
        <div className='justify-center items-center gap-5 flex flex-col text-white'>

            <div className="flex flex-row ml-5 gap-5">
                <CtaButton active={true}>
                    <div className="w-fit">
                        Student
                    </div></CtaButton>
                <CtaButton active={false}>
                    <div className="w-fit">Instructor</div>
                </CtaButton>
            </div>

            <form onSubmit={submitHandler}>

                <div>

                    <label>
                        <p>First Name </p>
                        <input
                            type="text"
                            name='firstName'

                            value={formData.firstName}
                            onChange={changeHandler}
                            placeholder='Enter your first Name'
                        />
                    </label>

                    <label>
                        <p>Last Name </p>
                        <input
                            type="text"
                            name='lastName'

                            value={formData.lastName}
                            onChange={changeHandler}
                            placeholder='Enter your last Name'
                        />
                    </label>

                </div>

                {/* email */}
                <label>
                    <p>Email Address </p>
                    <input
                        type="email"
                        name='email' // if i  made this required , browser will thow its own error ..

                        value={formData.email}
                        onChange={changeHandler}
                        placeholder='Enter your email'
                    />
                </label>

                {/* password */}
                <label>
                    <p>Create Password </p>
                    <input
                        type="password"
                        name='password'

                        value={formData.password}
                        onChange={changeHandler}
                        placeholder='Enter your password'
                    />
                </label>

                {/* confirm password */}
                <label>
                    <p>Confirm Password </p>
                    <input
                        type="password"
                        name='confirmPassword'

                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        placeholder='Confirm your password'
                    />
                </label>


                <div className=' w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
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