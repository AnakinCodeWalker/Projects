
import FrameImage from "../../assets/Images/frame.png"
import SignupForm from "../core/SignupForm"
import LoginForm from '../core/LoginForm'



const Template = ({ title, desc1, desc2, image, formtype, setIsLoggedIn }) => {
  return (
    <div className="text-white  ">
      <div className="font-bold text-3xl text-center mx-5 my-5">
        <h1>{title}</h1>

        <p>
          <span>
            {desc1}
          </span>
          <span>
            {desc2}
          </span>
        </p>
      </div>
      <div className=" justify-evenly flex   w-full max-w-50%">


        <div className="w-max-50%">{formtype === "signup" ? (<SignupForm setIsLoggedIn={setIsLoggedIn} />) : (<LoginForm setIsLoggedIn={setIsLoggedIn} />)}
        </div>

        <div className="w-max-50%">
          <div className="relative  bg-gray-200">
            <img src={FrameImage} alt="frame Image" width={558} height={504}
              loading='lazy' />
          </div>

          <div className="shadow-2xl shadow-blue-500/30 top-47 right-60 absolute">

            <img src={image} alt="Student" width={558} height={490}
              loading='lazy' />
          </div>


        </div>
      </div>


    </div>
  )
}

export default Template