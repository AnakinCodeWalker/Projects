import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";
import CtaButton from "../core/HomePage/CtaButton.jsx";
import logo from "../../assets/Logo/logo-Full-Light.png"

import {NavbarLinks} from "../../data/navbar-links.js"
const NavBar = () => {
  return (

    // main div
<div className="  flex border h-14 w-full border-blue-300">
   

{/* image */}   
    <div className=" w-[30%] gap-5  flex flex-row items-center justify-center   w-11/12 ">


<Link to="/"><img src={logo}     height={42} width={160} loading="lazy" alt="" />
</Link>

    </div>

<div className=" w-[50%] flex items-center justify-center flex-row">
<nav>
    <ul className="flex flex-row gap-5 text-white"> 
{
    NavbarLinks.map((link,index)=>(
<li key={index}>
    {
        link.title === "Catalog" ? (<div></div>) :(
            <Link to={link?.path}>
            <p className="text-white-100">
            {link.title}
            </p>
            </Link>
        )
    }
</li>
    ))
}

    </ul>
</nav>


</div>

{/* button */}
<div className="flex  gap-5 flex-row w-[20%] items-center  justify-center ">

 <CtaButton active={true} linkto={"/signup"}>
 <div className="flex gap-2 flex-row items-center w-fit">
    signup
     <FaArrowRight></FaArrowRight>

 </div>

 </CtaButton>


<CtaButton active={false} linkto={"/signin"}>
 <div className="flex gap-2 flex-row items-center w-fit">
    signin
     <FaArrowRight></FaArrowRight>

 </div>

 </CtaButton>
</div>


</div>

  )
}

export default NavBar