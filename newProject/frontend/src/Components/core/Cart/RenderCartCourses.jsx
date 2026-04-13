import React from 'react'
import { useSelector } from 'react-redux'
import cart from "../../../slices/cartSlice"
const RenderCartCourses = () => {

  const {cart} = useSelector((state)=>state.cart)
  return (
    <div>

{
  cart.map((course , index)=>{

  <div key={index}>
      <div> </div>
      <div> </div>
</div>

  } )
}

    </div>
  )
}

export default RenderCartCourses