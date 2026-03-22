import React from 'react'
import CtaButton from "./Components/core/HomePage/CtaButton"
import FrameImage from "../../assets/Images/frame.png"
import SignupForm from "../core/SignupForm"
import LoginForm from '../core/LoginForm'

const Template = ({ title, desc1, desc2, image, formtype, setIsLoggedIn }) => {
  return (
    <div>
      <div >
        <h1>{title}</h1>

        <p>
          <span>
            {desc1}
          </span>
          <span>
            {desc2}
          </span>
        </p>

        {formtype === "signup" ? (<SignupForm />) : (<LoginForm />)}
      </div>

      <div >
        <img src={FrameImage} alt="frame Image" width={558} height={504}
          loading='lazy' />

        <img src={image} alt="Student" width={558} height={490}
          loading='lazy' />
      </div>
    </div>
  )
}

export default Template