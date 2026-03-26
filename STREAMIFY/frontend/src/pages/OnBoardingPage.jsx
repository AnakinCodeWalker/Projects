// profile picture is not being loaded 

import { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation } from '@tanstack/react-query';
import { completeOnBoarding } from "../lib/api";
import toast from "react-hot-toast";
import { useQueryClient } from '@tanstack/react-query';
import { CameraIcon, ShuffleIcon, MapPinIcon, ShipWheelIcon, LoaderIcon } from 'lucide-react';
import { LANGUAGES } from '../Constants';
const OnBoardingPage = () => {

  const { authUser } = useAuthUser()


  const queryClient = useQueryClient();

  //{/* we are taking things from the authUser  so when we go to authUser page we will see firstName etc data */}

  // value access krna hoto first variable cahnge krna hoto secondvariable 
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onBoardingMutation,
    isPending,
  } = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess: () => {
      toast.success("Profile onBoarded successFully");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      }, 500);
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  });

  const submitHandler = (e) => {
    e.preventDefault()
    onBoardingMutation(formState)
  }

  const handleRandomAvatar = () => {
    const randomAvatar = `https://robohash.org/${Math.random()}`;


    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };
  return (
    // w-full takes parent full widht  , min-w-screen - takes full width of the screen

    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
            Complete your Profile
          </h1>
          {console.log(formState.profilePic)}
          {/* space can be used to provie space if the container is not flex flex hota to hi gap de skte hai if not flex then use gap-axis-value */}
          <form className="space-y-6" onSubmit={submitHandler}>

            {/* profile pic container */}

            <div className='flex flex-col items-center justify-center space-y-4'>
              {/* image preview */}
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {/* Image preview  */}
                {
                  formState.profilePic ? (
                    // if profilePic present then put this one 

                    <img src={formState.profilePic} alt='profilePic' className='w-full h-full object-cover'></img>
                  ) : (

                    <div className='flex items-center justify-center h-full '>
                      <CameraIcon className='size-12 text-base-content opacity-40'></CameraIcon>
                    </div>
                  )
                }

              </div>

              {/* generate random avatar */}
              <div className='flex items-center gap-2'>
                <button type='button' onClick={handleRandomAvatar}
                  className='btn btn-accent'>
                  <ShuffleIcon className='size-4 mr-2' />


                  Generate Random Avatar
                </button>
              </div>


            </div>


            {/* fullName */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>

              <input type="text"
                required
                name='fullName'
                value={formState.fullName}
                placeholder='your full Name'
                className='input input-bordered w-full'
                onChange={
                  (e) => setFormState({
                    ...formState,
                    fullName: e.target.value
                  })

                } />
            </div>


            {/* bio */}

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Bio</span>
              </label>

              <input type="text"
                required
                name='bio'
                value={formState.bio}
                onChange={(e) => setFormState({
                  ...formState,
                  bio: e.target.value
                })}
                placeholder=' provide your bio'
                className='input input-bordered w-full'

              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

              {/* Native  language */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Native Language</span>
                </label>
                {/*  this is used to select among multiple values */}
                <select
                  name='nativeLanguage'
                  value={formState.nativeLanguage}
                  onChange={
                    (e) => setFormState({
                      ...formState,
                      nativeLanguage: e.target.value
                    })}
                  className='select select-bordered w-full'
                >
                  <option value="">
                    Select your Native Language
                  </option>
                  {
                    LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`}
                        value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))
                  }

                </select>

              </div>

              {/* learning Language */}

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Learning Language</span>
                </label>
                {/*  this is used to select among multiple values */}
                <select
                  name='nativeLanguage'
                  value={formState.learningLanguage}
                  onChange={
                    (e) => setFormState({
                      ...formState,
                      learningLanguage: e.target.value
                    })}
                  className='select select-bordered w-full'
                >
                  <option value="">
                    Select your learning Language
                  </option>
                  {
                    LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`}
                        value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))
                  }

                </select>

              </div>




            </div>

            {/* Location */}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* submit button */}

            <button className="btn btn-primary w-full"
              type='submit'
              //  comming from the react query
              disabled={isPending}>
              {
                !isPending ? (<>
                  <ShipWheelIcon className='mr-2 size-5' />
                  complete OnBoarding
                </>) :
                  (<>
                    <LoaderIcon className='animate-spin mr-2 size-5' />
                    onboarding ...
                  </>)
              }
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default OnBoardingPage