import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ShipWheelIcon } from 'lucide-react'
const LoginPage = () => {

  const [login, setLogin] = useState({
    email: " ",
    password: "",
  })

  const queryClient = useQueryClient()

  const { } = useMutation({

  })
  const submitHandler = (e) => {
    e.preventDefault();

  }
  return (
    <div className='h-screen flex   items-center justify-center p-4 sm:p-6  md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

        {/* login form section  in the right hand side */}


        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>

          <div className='mb-4 flex items-center justify-start gap-2'>

            <ShipWheelIcon className='text-primary size-9' />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

{/* Error message display */}
        </div>
      </div>

    </div>
  )
}

export default LoginPage