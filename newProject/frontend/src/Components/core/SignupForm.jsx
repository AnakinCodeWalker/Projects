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
        <div className='text-white'>

            <div>
                <CtaButton active={true}>Student</CtaButton>
                <CtaButton active={false}>Instructor</CtaButton>
            </div>

            <form onSubmit={submitHandler}>

                <div>

                    <label>
                        <p>First Name <sup>*</sup></p>
                        <input
                            type="text"
                            name='firstName'
                            
                            value={formData.firstName}
                            onChange={changeHandler}
                            placeholder='Enter your first Name'
                        />
                    </label>

                    <label>
                        <p>Last Name <sup>*</sup></p>
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
                    <p>Email Address <sup>*</sup></p>
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
                    <p>Create Password <sup>*</sup></p>
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
                    <p>Confirm Password <sup>*</sup></p>
                    <input
                        type="password"
                        name='confirmPassword'
                        
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        placeholder='Confirm your password'
                    />
                </label>


                <button type="submit">
                    Create Account
                </button>

            </form>
        </div>
    )
}

export default SignupForm