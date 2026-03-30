
// used navlink and change the color of active class to yellow 
import { Link, NavLink, useLocation } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";
import logo from "../../assets/Logo/logo-Full-Light.png"
import ProfileDropDown from "../core/Auth/ProfileDropDown.jsx";
import { BsCart3 } from "react-icons/bs";
import { NavbarLinks } from "../../data/navbar-links.js"
import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
// import { apiConnector } from "../../services/apiconnector.js";
// import { categories } from "../../services/api.js";

const subLinks = [
    {
        title: "python",
        link: "/catalog/python"

    },
    {
        title: "web dev",
        link: "/catalog/web dev"

    }
]

const NavBar = () => {

    //  slices

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)

    // const [subLinks, setSubLinks] = useState([]);

    // useEffect(() => {
    //     const fet
    // chSubLinks = async () => {
    //         try {
    //             const result = await apiConnector("GET", categories.CATEGORIES_API);
    //             console.log(result.data);
    //             setSubLinks(result.data);
    //         } catch (error) {
    //             console.log(error.message);
    //             console.log(error)
    //         }
    //     };

    //     fetchSubLinks();
    // }, []);

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
                                        link.title === "Catalog" ? (

                                            <div className="relative flex items-center gap-2 group">
                                                <p>{link.title}</p>
                                                <FaArrowCircleDown />

                                                {/* parent pr kuch krega to child mai effect */}
                                                <div className="rounded-md invisible absolute left-[50%] top-[50%]
                                                translate-x-[-50%] translate-y-[80%]
                                                flex flex-col bg-white text-black opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">

                                                    <div className="rounded-md  absolute left-[50%] top-0 h-6 w-6 rotate-45 
                                                translate-x-[80%]  translate-y-[-45%] 
                                                 bg-white">

                                                    </div>
                                                    {
                                                        subLinks.length ? (
                                                            subLinks.map((subLink, index) => (
                                                                <Link className="ml-5 " to={subLink.link} key={index}>
                                                                    <p>{subLink.title}</p>
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <div></div>
                                                        )
                                                    }

                                                </div>




                                            </div>) : (
                                            <NavLink
                                            // Click → URL changes → NavLink detects → isActive → style changes
                                                to={link?.path}  // comming from another file by mapping on it 
                                                className={({ isActive }) =>
                                                    isActive ? "text-yellow-300" : "text-white"
                                                }
                                            >
                                                {link.title}
                                            </NavLink>
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


            {/* <button className="mr-4 md:hidden">
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button> */}

        </div>




    )
}

export default NavBar