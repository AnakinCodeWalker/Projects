import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../Components/core/HomePage/HighlightText"

const Home = () => {
  return <div>

    <div className="relative mx-auto flex flex-col w-11/12 items-center
     text-white justify-between">

      <Link to="/signup">

        <div className="mt-16 p-1  mx-auto rounded-full bg-black font-bold text-gray-100 transition-all duration-200 hover:scale-95">

          <div className=" flex flex-row items-center gap-2 rounded-full px-10 py-5 transition-all duration-200 font-bold ">

            <p>Be an Instructor</p>
            <FaArrowRight />

          </div>
        </div>


      </Link>

<div className="text-gray-100 text-center text-4xl font-semibold mt-8">
  Empower your Future with <HighlightText text={"Coding skills"}></HighlightText>
</div>
    </div>
  </div>



}

export default Home