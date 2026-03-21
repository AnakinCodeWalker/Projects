import React from 'react'

const InstructorSection = () => {
  return <>
    <div className="max-w-[40%]"><img src="" alt="" /></div>

    {/* left div */}
    <div className=" max-w-[50%] flex flex-col justify center">
      <div className="max-w-[20%] text-2xl"> Become an <HighlightText text={"Instructor"} /></div>
      <p className="text-sm font-light text-slate-200">Instructor from sround the world teach millions of Students we Provide the tools and skills to teach what you love</p>

      <div className="flex flex-row items-center ">
        <CTABUTTON active={true} linkto={"/signup"} >start teaching today <FaArrowRight /> </CTABUTTON>


      </div>
    </div>

  </>
}

export default InstructorSection