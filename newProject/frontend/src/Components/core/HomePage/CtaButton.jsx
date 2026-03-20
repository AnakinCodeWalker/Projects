import React from 'react'
import { Link } from 'react-router-dom'

// props that are going to be passed from the button

// children -- whatever u write inside the component
// button is active or not 
const CtaButton = ({ linkto , children, active }) => {
  return (
    <Link to={ linkto }>

      <div className={`text-center px-6 py-3 rounded-md font-bold text-[13px]
      ${active ? "bg-yellow-300 text-black" : "bg-blue-500 text-black"}
      hover:scale-95 transition-all duration-200`}>

        {children}

      </div>

    </Link>
  )
}

export default CtaButton