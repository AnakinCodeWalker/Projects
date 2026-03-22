import React from 'react'
import { useState } from 'react'
import CTABUTTON from "./HomePage/CtaButton"

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function changeHandler(e) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value  //update the field dynamically based on input name”
        }))
    }
    return (
        <form >
            <label>
                <p>
                    Email Address <sup>*</sup>
                </p>
                <input type="email"
                    required
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
                    required
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
<CTABUTTON active={true} linkto={"/"}></CTABUTTON>
        </form>
    )
}
export default LoginForm