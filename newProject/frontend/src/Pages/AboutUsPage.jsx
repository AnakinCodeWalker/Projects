import HighLightText from "../Components/Common/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../Components/core/AboutUs/Quote'
import foundingStory from "../assets/Images/foundingStory.png"
import StatsComponent from "../Components/core/AboutUs/StatsComponent"
import ContactUsPage from "../Components/core/AboutUs/ContactUsPage"
import Footer from "../Components/Common/Footer"
const AboutUsPage = () => {
  return (

    // top level div
    <div className='font-bold mt-[100px] text-white   justify-center'>

      <section>
        <div className=" mx-auto">
          <header className="mx-20 w-full">
            <span className=" text-center text-3xl font-bold">
              Driving Innovation in Online Education for a {" "}
              <HighLightText text={"Brighter futrue"} />
            </span>
            <p className="  text-gray-300 max-w-[90%] my-5 ">
              Study Notion  is at  the forefront of Driving innovation in online education we are passionate about creating a Brighter future by offering cutting-edge courses  , leveraging emerging technologies  and nuturing  a vibrant learning community
            </p>

          </header>


          < div className="mt-20 homepage_bg h-[420px] w-full bg-white ">



            <div className=' translate-y-35 relative flex justify-evenly mx-auto gap-5'>
              <img src={BannerImage1} alt="BannerImage1" />
              <img src={BannerImage2} alt="BannerImage2" />
              <img src={BannerImage3} alt="BannerImage3" />
            </div>

          </div>
        </div>
      </section>


      {/* section 2 */}

      <section>
        <div className="my-30">
          <Quote></Quote>
        </div>
      </section>



      {/* section 3 */}
      <section>
        <div className="flex flex-col gap-5">
          {/* founding story div */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 ">
            {/* founding  story left box  */}
            <div className=" ml-5  font-bold  w-full  max-w-2xl">
              <h1 className="ml-5  text-2xl mb-2 ">Our Founding Story</h1>

              <p className="mt-3 ml-5  text-xl">
                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world

              </p>

             


            </div>

            {/* founding story right box */}
            <div className=" w-full">
              <img className="w-[90%]" src={foundingStory} alt="foundingStory" />
            </div>

          </div>


          {/* vison  and misson wala parent div */}

          <div className="flex max-w-11/12 mx-auto gap-5 my-10">
            {/* left box */}
            <div className=" max-w-50%">

              <h1 className="text-center text-2xl"><HighLightText text={"Our Mission"} /></h1>

              <p className="text-gray-400 ">
                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.

              </p>

            </div>
            {/* right box */}

            <div className="max-w-50%">
              <h1 className="text-orange-400 text-center text-2xl">
                Our Mission
              </h1>

              <p className="text-gray-400">
                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* section 4 */}

      <StatsComponent></StatsComponent>

      {/* section 5 */}

      <div className="flex mt-10 justify-center items-center">
        <ContactUsPage />

      </div>

      {/* section 6 */}

      <Footer />
    </div>
  )
}

export default AboutUsPage