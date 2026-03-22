import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { signinInput } from "../Common/validation/User.validation.js"

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

    function submitHandler(event) {
        event.preventDefault()  // page will not re render and i am going to handle the events is se yeh hots hai


        const result = signinInput.safeParse(formData);

          if (!result.success) {  //zod validation

            const firstError = result.error.issues[0];
            toast.error(firstError.message);  //toast error
            return;
        }



        setIsLoggedIn(true)
        toast.success("Logged successful")
        navigate("/dashboard")   //Based on condition change the routes..
    }

    return (
        <div className='text-white'>
            <form onSubmit={submitHandler}>
                <label>
                    <p>
                        Email Address <sup>*</sup>
                    </p>
                    <input type="email"
                        
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder='Enter Email id '
                        name='email'
                    />
                </label>

                <label>
                    <p>
                        Password <sup>*</sup>
                    </p>
                    <input type="password"
                        
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder='Enter Password '
                        name='password'
                    />
                    <Link to={"/forgot-password"}>
                        <p>
                            forgot Password

                        </p>
                    </Link>
                </label>

                <div>
                    <button className='bg-white text-black rounded-md m-4 p-2' type="submit">
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    )
}
export default LoginForm