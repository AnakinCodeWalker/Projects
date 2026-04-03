import HighlightText from "../../Common/HighlightText"
import know_your_progress from "../../../assets/Images/know_your_progress.png"
import compare_with_others from "../../../assets/Images/compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/plan_your_lessons.png"
import CtaButton  from "./CtaButton"
const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px] mb-[32px] flex flex-col justify-center items-center gap-5  bg-white mt-30">

      <div className="max-w-[50%]  text-center ">

        <p className="mb-3 font-bold text-2xl"> Your Swiss Knife For <HighlightText text={
          "Leaning Any Language"
        } /></p>

        <p>Using spin Making learning making 20+ language realistic voice-over , progress tracking ,custom shcedule and more</p>
      </div>


      {/*  images  */}
      <div className="flex flex-row mt-5 justify-center items-center">
        
        <img className="-mr-32" src={know_your_progress} alt="know your progress" />
        <img src={compare_with_others} alt="compare_with_others" />
        <img className="-ml-36" src={plan_your_lessons} alt="plan_your_lessons" />
     
      </div>

<div className="flex justify-center">
  <CtaButton active={true} linkto={"/signup"} > Learn more </CtaButton>
</div>

    </div>
  )
}

export default LearningLanguageSection