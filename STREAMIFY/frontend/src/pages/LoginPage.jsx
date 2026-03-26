import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../lib/api'
import { ShipWheelIcon } from 'lucide-react'
import { Link } from 'react-router'
import { toast } from "react-hot-toast";
const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: " ",
    password: "",
  })

  const queryClient = useQueryClient()

  const {
    mutate: loginInMutation,
    isPending,  // till the api does not hit  isPending button will be disabled
    error // when error comes we show the , error 
  } = useMutation({
    mutationFn: login,

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["authUser"]
        })
        
    },

    onError: (error) => {
      toast.error(error.response.data.message)
    },
  })
  const submitHandler = (e) => {
    e.preventDefault();
    loginInMutation(loginData)
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

          {error && (
            <div className="alert alert-error mb-4">
              <span>
                {error.response?.data?.message ||
                  error.message ||
                  "Something went wrong"}
              </span>
            </div>
          )}
          <div className='w-full'>
            <form onSubmit={submitHandler}>

              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>
                    Welcome Back
                  </h2>

                  <p className='text-sm opacity-70'>
                    Sign in to your account to continue ..
                  </p>
                </div>

                {/* email */}
                <div className='flex flex-col gap-3'>

                  <label className='label'>
                    <span className='label-text'>
                      Email
                    </span>
                  </label>

                  <input type="email"
                    required
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email: e.target.value
                      })
                    }
                    name='email'
                    value={loginData.email}
                    className='input input-bordered w-full'
                    placeholder='hello@gmail.com'
                  />
                </div>

                {/* password */}

                <div className='flex flex-col gap-3'>

                  <label className='label'>
                    <span className='label-text'>
                      Password
                    </span>
                  </label>

                  <input type="password"
                    required
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value
                      })
                    }
                    name='password'
                    value={loginData.password}
                    className='input input-bordered w-full'
                    placeholder='******'
                  />
                </div>

                {/* submit button */}

                {/* jb tk api se response nhi ayega button disabled rhega */}
                <button type="submit" className='btn btn-primary w-full' disabled={isPending}>
                  {
                    isPending ? (

                      <>
                        <span className='loading loading-spinner loading-xs'>
                        </span>
                        signing in...
                      </>) :
                      (
                        "Sign in"
                      )}

                </button>


              </div>
            </form>
          </div>
          <p className='text-sm'>Dont have an account ? {" "}
            <Link to="/signup" className='text-primary hover:underline'>Create one </Link>
          </p>
        </div>


        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage