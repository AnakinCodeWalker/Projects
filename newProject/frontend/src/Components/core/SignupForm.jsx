import { useState } from 'react'
import CtaButton from './HomePage/CtaButton'
const SignupForm = () => {

    const [FormData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        Password: "",
        confrimPassword: "",
    })

    function changeHandler(e) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value  //update the field dynamically based on input name”
        }))
    }
    return (
        <div>
            <div>
                <CtaButton active={true}> Student</CtaButton>
                <CtaButton active={false}> Instructor </CtaButton>
            </div>

            <form>
                <div>

                    <label>
                        <p>First Name <sup>*</sup></p>
                        <input type="text"
                            name='firstName'
                            required
                            onChange={changeHandler}
                            placeholder='Enter your first Name' />
                        value={FormData.firstName}
                    </label>

                    <label>
                        <p>last Name <sup>*</sup></p>
                        <input type="text"
                            name='lastName'
                            required
                            onChange={changeHandler}
                            placeholder='Enter your last Name' />
                        value={FormData.lastName}
                    </label>

                </div>

                {/* email */}
                <label>
                    <p>email Address<sup>*</sup></p>
                    <input type="email"
                        name='email'
                        required
                        onChange={changeHandler}
                        placeholder='Enter your email' />
                    value={FormData.email}
                </label>

                {/* create password */}
                <label>
                    <p>create password<sup>*</sup></p>
                    <input type="password"
                        name='password'
                        required
                        onChange={changeHandler}
                        placeholder='Enter your password' />
                    value={FormData.Password}
                </label>

                <label>
                    <p>confrim Password<sup>*</sup></p>
                    <input type="password"
                        name='confrimPassword'
                        required
                        onChange={changeHandler}
                        placeholder='Enter your password' />
                    value={FormData.confrimPassword}
                </label>

 <CtaButton active={true} linkto={""}> Create Account</CtaButton>

            </form>
        </div>
    )
}

export default SignupForm