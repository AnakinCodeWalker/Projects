import { Link } from "react-router-dom"
import Inputform from "./Inputform"


const Auth = () => {
  return <div
    className="h-screen flex flex-col justify-center">


    <div className="text-3xl font-extrabold ">
      Create an account
    </div>

    <div className="flex">
      <div className="text-slate-300 ml-3 mr-3">
      already have an account ?
      </div> 
      <span className=" text-black/50 underline decoration-black/50 ">
        <Link to="/signin">Login</Link>
    </span>
    </div>
<div>
  <Inputform label="hi" placeHolder="hi" value=""/>
</div>
  </div>
}

export default Auth