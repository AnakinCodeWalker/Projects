import { Link } from "react-router-dom"
import Inputform from "./Inputform"


const Auth = () => {
  return <div
    className="h-screen flex flex-col justify-center">


    <div className="text-3xl font-extrabold ">
      Create an account
    </div>

    <div className="flex items-center">
      <div className=" text-slate-300 ml-3 ">
        already have an account ? <Link className=" text-black/50 underline decoration-black/50 ml-3" to="/signin">Login</Link>
      </div>

    </div>
    <div>
      <Inputform label="Username" placeHolder="Username" value=" " />
      <Inputform label="password" placeHolder="password" type= {"password"} value=" " />
    </div>
  </div>
}

export default Auth