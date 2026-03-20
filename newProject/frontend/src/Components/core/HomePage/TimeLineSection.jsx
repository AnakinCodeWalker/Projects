import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimeLineImage.png"
const TimeLineSection = () => {

    return <>

        {/* outer div */}
        <div className="flex flex-row w-11/12 mx-auto gap-5 ">

            {/* inner left div */}
            <div className="flex flex-col items-center gap-5 w-[45%]">

                <TimeLineSectionInput image={Logo1} text={"Smart Learning"} p={"Learn faster with structured and guided content."} />
                <TimeLineSectionInput image={Logo2} text={"Expert Content"} p={"Curated lessons designed for real understanding."} />
                <TimeLineSectionInput image={Logo3} text={"Premium Quality"} p={"very High-quality resources that boost your skills."} />
                <TimeLineSectionInput image={Logo4} text={"Practice & Build"} p={"Apply these concepts in real-world coding practice"} />

            </div>


            {/* shadow blue to left right side  */}
            {/* inner right div */}
            <div className="realtive w-[48%] shadow shadow-blue-500/30">
                <img src={timelineImage} alt="timelineImage" />

                <div className="absolute translate-x-[10%]  translate-y-[-50%] flex flex-row  text-white py-8 uppercase bg-green-700">

                    <div className="flex flex-row gap-5 items-center border border-green-300 px-7">
                        <p className="text-3xl font-bold">10</p>
                        <p className="text-green-300 text-sm">years of Experience</p>
                    </div>

                    <div className="flex gap-5 items-center px-7">
                        <p className="text-3xl font-bold">250</p>
                        <p className="text-green-300 text-sm">Types of Courses</p>
                    </div>
                </div>
            </div>

        </div>

    </>
}

export default TimeLineSection








const TimeLineSectionInput = ({ image, text, p }) => {

    return <>
        {/* main div */}
        <div className="flex flex-row">

            {/* image */}
            <img src={image} alt="" />


            <div className="mx-2 flex flex-col font-bold text-sm text-black">

                {text}
                <p>{p}</p>
            </div>

        </div>
    </>

}
