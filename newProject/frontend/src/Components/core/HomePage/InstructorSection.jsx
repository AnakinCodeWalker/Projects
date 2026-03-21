import { FaArrowRight } from "react-icons/fa";
import CTABUTTON from './CtaButton'
import HighlightText from './HighlightText'
import Instructor from "../../../assets/Images/Instructor.png"
const InstructorSection = () => {
  return <div className="flex flex-row gap-20 items-center  ">
    <div className="my-10 mx-15  max-w-[50%]"><img src={Instructor} alt="Instructor Image" /></div>

    {/* left div */}
    < div className=" max-w-[50%] flex flex-col gap-10 justify-center">
      <div className=" text-center  font-bold   max-w-[50%] text-4xl"> Become an <HighlightText text={"Instructor"} /></div>
      <p className=" text-center text-[16px]  max-w-[80%] font-medium text-slate-100">Instructor from sround the world teach millions of Students we Provide the tools and skills to teach what you love</p>

      
       <div className="w-fit">
         <CTABUTTON active={true} linkto={"/signup"} >
          <div className="flex flex-row gap-2 items-center ">
          start teaching today <FaArrowRight />
          </div> </CTABUTTON>

       </div>

      
    </div>

  </div>
}

export default InstructorSection