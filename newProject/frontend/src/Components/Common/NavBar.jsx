import { Link, useLocation } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";
import CtaButton from "../core/HomePage/CtaButton.jsx";
import logo from "../../assets/Logo/logo-Full-Light.png"
import ProfileDropDown from "../core/Auth/ProfileDropDown.jsx";
import { BsCart3 } from "react-icons/bs";
import { NavbarLinks } from "../../data/navbar-links.js"
import { useSelector } from "react-redux";
const NavBar = () => {

    //  slices

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)



    // route based login
    const location = useLocation()
    const matchRoute = (route) => {
        return location.pathname === route;
    }
    return (

        // main div
        <div className="  w-11/12  flex border ml-4 max-w-[1500px] rounded-xl h-14 w-full border-blue-300">


            {/* image */}
            <div className=" w-[30%] gap-5  flex flex-row items-center justify-center   w-11/12 ">


                <Link to="/"><img src={logo} height={42} width={160} loading="lazy" alt="" />
                </Link>

            </div>

            <div className=" w-[50%] flex items-center justify-center flex-row">
                <nav>
                    <ul className="flex flex-row gap-5 text-white">
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (<div></div>) : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-300"
                                                    : "text-white"}`}>
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


            {/* login/signup button */}
            <div className="flex  gap-5 flex-row w-[20%] items-center  justify-center ">

                {/*
                
                <CtaButton active={true} linkto={"/signup"}>
                    <div className="flex gap-2 flex-row items-center w-fit">
                        signup
                        <FaArrowRight></FaArrowRight>

                    </div>

                </CtaButton>
                
                */}

                {/*
                
                <CtaButton active={false} linkto={"/login"}>
                    <div className="flex gap-2 flex-row items-center w-fit">
                        login
                        <FaArrowRight></FaArrowRight>

                    </div>

                </CtaButton>
                
                */}

                {
                    user && user.accountType != "Instructor" &&

                    (
                        <Link to={"/dashboard/cart"} className="text-white font-bold relative">
                            <BsCart3 />
                            {
                                totalItems > 0 && (
                                    <span>{totalItems}</span>
                                )
                            }
                        </Link>
                    )

                }
                {
                    token === null && (
                        <Link to={"/signup"}>
                            <div className=' w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
       bg-yellow-300 text-black
      hover:scale-95 transition-all duration-200'>


                                <button>

                                    <div className="flex gap-2 flex-row items-center w-fit">
                                        signup
                                        <FaArrowRight></FaArrowRight>

                                    </div>


                                </button>
                            </div>
                        </Link>
                    )
                }

                {
                    token === null && (

                        <Link to={"/login"}>

                            <div className=' w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
       bg-blue-500 text-black
      hover:scale-95 transition-all duration-200'>


                                <button>

                                    <div className="flex gap-2 flex-row items-center w-fit">
                                        login
                                        <FaArrowRight></FaArrowRight>

                                    </div>


                                </button>
                            </div>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                }

            </div>


        </div >

    )
}

export default NavBar