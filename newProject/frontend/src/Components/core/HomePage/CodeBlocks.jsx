import CtaButton from "./CtaButton"
import HighlightText from "./HighlightText"
import { FaArrowRight } from "react-icons/fa"

const CodeBlocks = ({
  position ,  //flex-row-reverse or normal order 
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  
}) => {
  return <>

<div className={`flex ${position} my-20 justify-between gap-10`}>

<div className="w-[50%] flex flex-col gap-8">
  {heading}

  <div className="text-white font-bold">
    {subheading}
  </div>
</div>

{/* <HighlightText text={""}/> */}

{/* buttons */}
<div className="flex flex-row gap-5 my-7">

<CtaButton 
         active={ctabtn1.active} 
         linkto={ctabtn1.linkto}>
          
  <div className="flex flex-row gap-2 items-center">
  
  {ctabtn1.btnText}
  <FaArrowRight/>

</div>
  </CtaButton>



<CtaButton 
         active={ctabtn2.active} 
         linkto={ctabtn2.linkto}>
  
  {ctabtn2.btnText}

  </CtaButton>
  
  </div>

</div>
  
 
  </>
}

export default CodeBlocks