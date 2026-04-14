import React from 'react'
import { useSelector } from 'react-redux'
// import cart from "../../../slices/cartSlice"
import { RiStarSLine } from "react-icons/ri";
import ReactStars from 'react-stars'
const RenderCartCourses = () => {

  const { cart } = useSelector((state) => state.cart)
  return (
    <div>

      {
        cart.map((course, index) => {

          <div key={index}>

            <div>
              <img src={course?.thumbnail} alt="course thumbnail" />
            </div>

            <div>
              <p>{course?.courseName}</p>
              <p>{course?.category?.name}</p>

            </div>

            <ReactStars
              count={5}
              size={20}
              edit={false}
              activeColor="#ffd700"
              emptyIcon={<RiStarSLine />}
              fullIcon={<RiStarSLine />} />



          </div>


        })
      }

    </div>
  )
}

export default RenderCartCourses