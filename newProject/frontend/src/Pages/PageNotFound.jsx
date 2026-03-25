import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
   <div className='h-screen -mt-10 flex  flex-col items-center justify-center text-slate-400 text-3xl font-bold'>
        Page Not Found  😓
        <p className='text-xl ml-5 mt-2' >Go to 
          <Link className='text-xl ml-5 mt-2 underline ' to={"/"}>
          🏠 Page
          </Link>
        </p>
        </div>
  )
}

export default PageNotFound