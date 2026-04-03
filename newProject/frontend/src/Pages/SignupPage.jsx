import React from 'react'
import SignupForm from '../Components/core/SignupForm'
import SignupImg from "../assets/Images/signup.webp"
import Template from "../Components/Common/FormTemplate"
const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
    title="join the million learning to code with us for free"
    desc1="Build skills for today , tommorrow and beyond"
    desc2={` Education to future Proof your Carrer`}
    image={SignupImg}
    formtype="signup"
    setIsLoggedIn={setIsLoggedIn}>

    </Template>
  )
}

export default Signup