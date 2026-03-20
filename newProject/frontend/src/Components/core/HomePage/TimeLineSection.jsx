import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

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


            {/* inner right div */}
            <div className="w-[50%]">

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
