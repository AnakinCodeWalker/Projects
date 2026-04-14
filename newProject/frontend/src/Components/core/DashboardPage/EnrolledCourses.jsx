//  created redcuer usme accesstoken dalo and 


import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../services/apiconnector'
import { Profile } from '../../../services/api'
import toast from "react-hot-toast";
import ProgressBar from "@ramonak/react-progress-bar"
import { Loader2 } from "lucide-react";
const EnrolledCourses = () => {

  const [enrolledCourses, SetEnrolledcourses] = useState([])
  const [loading, setLoading] = useState(false)


  const getEnrolledCourses = async () => {

    try {
      setLoading(true)
      const response = await apiConnector("GET", Profile.ENROLLED_COURSE_API)
      console.log(response);
      SetEnrolledcourses(response?.data?.data)
      setLoading(false)
      toast.success("course details")

    } catch (error) {

      setLoading(false)
      const message = error?.response?.data?.message // from the backend
        || "No enrolled courses"
      console.log(error);

      return toast.error(message)
    }
  }
  useEffect(() => {
    getEnrolledCourses()
  }, [])


  return (
    <div>

      <div className='text-center font-bold mx-auto'>
        <div>Enrolled course</div>
        {
          !enrolledCourses ? (<div className=" overflow-y-hidden overflow-x-hidden  bg-black  h-screen w-full flex items-center justify-center">
            <Loader2 className="animate-spin  w-[40%] h-[40%]  " />
          </div>)
            : (enrolledCourses?.length === 0 ? (<p>you have not enrolled in any course</p>)
              : (
                <div className='bg-white text-black'>

                  <div>
                    <p>Course Name</p>
                    <p>Duration</p>
                    <p>Progess</p>
                  </div>

                  {
                    enrolledCourses.map((course) => (
                      <div key={course._id}>

                        <div>
                          <img src={course?.thumbnail} alt="" />
                          <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.courseDescription}</p>
                          </div>
                        </div>

                        <div>
                          {course?.totalDuration}
                        </div>

                        <div>
                          <p>Progress : {course?.progressPercentage || 0}%</p>

                          <ProgressBar
                            completed={course?.progressPercentage || 0}
                            isLabelVisible={false}
                            height={8}
                            color="#FFC107"
                            bgColor="#E0E0E0"
                          />
                        </div>

                      </div>
                    ))
                  }
                </div>

              ))
        }
      </div>




    </div>
  )
}

export default EnrolledCourses