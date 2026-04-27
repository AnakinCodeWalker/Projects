// 1: 05 min se dekho label mai htmlfor add kro ..

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm()

  const dispatch = useDispatch()
  const { course, editCourse } = useSelector((state) => state.course);
  const [Loading, SetLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      SetLoading(true)

      // CourseCategories -- api call 

      const categories = await "api call";
      if (categories.length > 0) {
        setCourseCategories(categories)
      }
      SetLoading(false)
    }

    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseImage", course.thumbnail)
      setValue("courseRequirements", course.instructions)

    }

    getCategories()

  }, [])

  const onSubmit = async (data) => {

  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className='rounded-md border border-black p-6 space-y-8'
    >
      <div>
        <label>Course Title</label>

        <input type="text"
          id='courseTitle'
          placeholder='Enter course Title'
          {...register("courseTitle", { required: true })}
          className='w-full'
        />
        {
          errors.courseTitle && (
            <span>
              Course Title is reuqired
            </span>
          )
        }
      </div>


      <div>
        <label>Course short description </label>
        <textarea name="" id="courseShortDesc"
          placeholder='enter Description'
          {
          ...register("courseShortDesc", { required: true })
          }
          className="min-h-[140px] w-full"
        />
        {
          errors.courseShortDesc && (
            <span>
              Course Descritption is reuqired
            </span>
          )
        }

      </div>


      <div>
        <label>Course Price </label>

        <input
          id='coursePrice'
          placeholder='Enter course Price '
          {...register("coursePrice", { required: true, valueAsNumber: true })}
          className='w-full'
        />
        {
          errors.coursePrice && (
            <span>
              Course Price is reuqired
            </span>
          )
        }
      </div>

      <div>

        <label >Course Category </label>
        <select id="courseCategory"
          defaultValue=""
          {
          ...register("courseCategory", { required: true })

          }
        >
          <option value="" disabled>Choose a category</option>

          {
            !Loading && courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))
          }
        </select>

        {
          errors.courseCategory &&
          <span>
            course category is required
          </span>
        }


      </div>

{/* 

          add 2 components

*/}


{/* benefits of the course */}

<div>
  <label htmlFor="">benefits of the course</label>

<textarea name="" id="courseBenefits"
placeholder='enter benefits of the course '
{...register("courseBenefits",{required:true})}
className='min-h-[130px] w-full'
/>
{
  errors.courseBenefits && (
    <span>
      benefits of the course are reuired
    </span>
  )
}
</div>
    </form>
  )
}

export default CourseInformationForm