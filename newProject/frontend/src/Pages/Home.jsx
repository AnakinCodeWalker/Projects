
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";

// components
import HighlightText from "../Components/core/HomePage/HighlightText"
import CTABUTTON from "../Components/core/HomePage/CtaButton"
import CodeBlocks from "../Components/core/HomePage/CodeBlocks"
import LearningLanguageSection from "../Components/core/HomePage/LearningLanguageSection";
import TimeLineSection from "../Components/core/HomePage/TimeLineSection";
import Footer from "../Components/Common/Footer";

// assests
import banner from "../assets/Images/banner.mp4"
import InstructorSection from "../Components/core/HomePage/InstructorSection";

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
        My name is   <a
          href="https://www.linkedin.com/in/princekumar3111"
          target="_blank"
          rel="noopener noreferrer"
        >
          {
            <HighlightText text={"Prince"} />
          } </a>
        and  I created this Website so any one can come and enhance their skills
      </div>

      {/*  generic button component */}
      <div className="flex flex-row m-8 gap-7">

        <CTABUTTON linkto={"/signup"} active={true}>Learn More{/* children*/} </CTABUTTON>
        <CTABUTTON linkto={"/login"} active={false}>Book a demo</CTABUTTON>

      </div>

      {/* adding the  video */}

      <div className=" rounded-xl shadow-2xl shadow-blue-500/30  mt-12 mx-10 w-3/4 aspect-video">
        <video className="rounded-xl" muted loop autoPlay>
          <source src={banner} type="video/mp4" />
        </video>
      </div>

      {/* review generic CodeBlock componnent */}
      <div className="max-w-full">
        <CodeBlocks className=" max-w-full " position={"lg:flex-row"}

          heading={
            <div className="text-4xl font-semibold">
              Unlock your <HighlightText text={"coding Potential"} />
              {" "} with our online courses
            </div>

          }

          ctabtn1={{
            btnText: "try it your self",
            linkto: "/signup",
            active: true
          }}
          ctabtn2={{
            btnText: "Learn more",
            linkto: "/login",
            active: false
          }}



        ></CodeBlocks>
      </div>

    </div>



    {/* Section 2 */}
    <div className="bg-white text-black-700">

      {/* button secton - 2  */}
      <div className="homepage_bg h-[320px]">
       
    
        {/* Explore Full Catagory Section */}
        <div className="mx-auto flex w-11/12 max-w-[1200px] flex-col items-center justify-between gap-8">
          <div className="lg:h-[150px]"></div>
          <div className="flex flex-row gap-7 text-white lg:mt-8">
            <CTABUTTON active={true} linkto={"/signup"}>
              <div className="flex items-center gap-2">
                Explore Full Catalog
                <FaArrowRight />
              </div>
            </CTABUTTON>
            <div className="w-fit">
              <CTABUTTON active={false} linkto={"/login"}>
                Learn More
              </CTABUTTON>
            </div>
          </div>
        </div>
      </div>




      <div className="mx-auto w-11/12 max-w-[1200px]  flex flex-col items-center justify-between gap-7">

        <div className="mt-[95px] flex flex-row w-full gap-5">

          <div className="w-1/2 font-semibold text-4xl">Get the skills you  need for a <HighlightText text={"job that is in demand "} />
          </div>

          <div className=" gap-5 w-1/2 flex flex-col justify-center">
            <p className="font-semibold text-[16px]">
              The modern Study Website dictates its own term today to be a comptetive specialist requires more than profesional skills  </p>


            <div className="mt-8 max-w-[200px] w-fit">
              <CTABUTTON active={true} linkto={"/singup"}> Learn More </CTABUTTON>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-9 ">
        <TimeLineSection ></TimeLineSection>

      </div>
      <LearningLanguageSection></LearningLanguageSection>
    </div>



    {/* section 3 */}
    {/* main div */}
    <div className=" gap-8 flex flex-col items-center text-white bg-black w-11/12 max-w-[1200px]">

      <InstructorSection />
      <h2 className="text-center text-4xl font-semibold mt-10"> review from other learners</h2>

      {/* review slider here */}

    </div>

    {/* footer */}

    <Footer />
  </div>

}

export default Home