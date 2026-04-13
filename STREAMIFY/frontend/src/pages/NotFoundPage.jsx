import React from 'react'
import { useNavigate } from 'react-router'

const NotFoundPage = () => {

  const navigate = useNavigate()
  return (
    <div className='w-full h-full  flex flex-col justify-center items-center'>
      <div className='mb-6'>Page not found 😓

      </div>
      <div className='flex mx-auto'>
        <button className="btn btn-primary btn-sm" onClick={() => navigate(-1)}> go back</button>

      </div>
    </div>



  )
}

export default NotFoundPage