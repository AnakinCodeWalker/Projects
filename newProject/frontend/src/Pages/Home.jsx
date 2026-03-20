
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";

// components
import HighlightText from "../Components/core/HomePage/HighlightText"
import CTABUTTON from "../Components/core/HomePage/CtaButton"
import CodeBlocks from "../Components/core/HomePage/CodeBlocks"

// assests
import banner from "../assets/Images/banner.mp4"
const Home = () => {
  return <div>

    <div className="relative mx-auto flex flex-col w-11/12 items-center
     text-white justify-between">

      {/* section 1  */}
      {/* button */}
      <Link to="/signup">

        <div className="mt-16 p-1  mx-auto rounded-full bg-black font-bold text-gray-100 transition-all duration-200 hover:scale-95">

          <div className=" flex flex-row items-center gap-2 rounded-full px-10 py-5 transition-all duration-200 font-bold ">

            <p>Be an Instructor</p>
            <FaArrowRight />

          </div>
        </div>


      </Link>

      {/* highlight text */}
      <div className="text-gray-100 text-center text-4xl font-semibold mt-8">
        Empower your Future with <HighlightText text={"Coding skills"}></HighlightText>
      </div>

      <div className="mt-4 text-2xl w-[70%] text-center font-bold text-slate-200">
        My name is Prince and  I created this Website so any one can come and enhance their skills
      </div>

      {/*  generic button component */}
      <div className="flex flex-row m-8 gap-7">
        <CTABUTTON linkto={"/signup"} active={true}>Learn More{/* children*/} </CTABUTTON>
        <CTABUTTON linkto={"/login"} active={false}>Book a demo</CTABUTTON>
      </div>

      {/* adding the  video */}
    
    <div className="shadow-blue-200 mt-12 mx-10 w-3/4 aspect-video">
      <video muted loop autoPlay>
<source src={banner}type="video/mp4"/>
      </video>
    </div>

{/*  */}
<div>
  <CodeBlocks className=" max-w-full " position={"lg:flex-row"}
  
  heading={
    <div className="text-4xl font-semibold">
      Unlock your <HighlightText text={"coding Potential"}/>
     {" "} with our online courses
    </div>

  }

  subheading={
    "we Provide courses so , that you could learn and reshape your entire future , A bright future is waiting ahead for you"
  }

  ctabtn1={{
    btnText : "try it your self",
    linkto  : "/signup",
    active  : true
  }}
   ctabtn2={{
    btnText : "Learn more",
    linkto  : "/login",
    active  : false
  }}

  

  ></CodeBlocks>
</div>
    </div>
  </div>

  }

export default Home