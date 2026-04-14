//  write the handleBuyCourse function ..
// in here inside the button 

import React from 'react'
import { useSelector } from 'react-redux'
import CtaButton from '../HomePage/CtaButton'


const RenderTotalAmount = () => {
  const { total } = useSelector((state) => state.cart)

  function handleBuyCourse() {

  }
  return (
    <div>
      <p>Total : </p>
      <p>Rs {total} </p>

      <button onClick={handleBuyCourse}>

        <CtaButton active={true}
        >
          buy now
        </CtaButton>
      </button>
    </div>
  )
}

export default RenderTotalAmount