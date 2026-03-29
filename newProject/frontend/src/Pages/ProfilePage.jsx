import { useState } from 'react'
// import CtaButton from './HomePage/CtaButton'
// import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { signupInput } from "../Common/validation/User.validation.js"

// import { apiConnector } from "../../services/apiconnector.js";
// import { user } from "../../services/api.js"
import { CameraIcon, ShuffleIcon, Calendar, Phone } from "lucide-react";
import { GENDER } from "../utils/constants.js"
import { apiConnector } from '../services/apiconnector.js';
import { Profile } from '../services/api.js';
import countrycode from "../data/countrycode.json"

const ProfilePage = () => {

  const inputStyle = "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

  const labelInputStyle = "block text-gray-400 text-sm font-bold mb-2"


  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    about: "",
    profilePic: ""

  })

  const handleRandomAvatar = () => {
    const randomAvatar = `https://robohash.org/${Math.random()}`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  async function submitHandler(e) {
    e.preventDefault();

    try {
      await apiConnector("PATCH", Profile.UPDATE_API, formState)
      toast.success("profile updated successfully")
    } catch (error) {
      console.log(`error : ${error}`);
      toast.error(error.message)
    }
  }
  return (
    // w-full takes parent full widht  , min-w-screen - takes full width of the screen

    <div className=' text-white min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
            {
              formState.firstName ?
                (<p> welcome   {formState.firstName}</p>)
                : (<p>Welcome User </p>)
            }
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
                <button type="button" onClick={handleRandomAvatar}
                  className={`${labelInputStyle}btn btn-accent border p-2 m-2 rounded-md`}>
                  <ShuffleIcon className='size-4 mr-2' />


                  Generate Random Avatar
                </button>
              </div>


            </div>


            {/* firstName */}
            <div className='form-control'>
              <label className={`label ${labelInputStyle} `}>
                <span className='label-text'>Full Name</span>
              </label>

              <input className={`input input-bordered w-full ${inputStyle}`} type="text"

                name='firstName'
                value={formState.firstName}
                placeholder=' First Name'
                // className='input input-bordered w-full'
                onChange={
                  (e) => setFormState({
                    ...formState,
                    firstName: e.target.value
                  })

                } />
            </div>


            {/* lastName */}
            <div className='form-control'>
              <label className={`label ${labelInputStyle} `}>
                <span className='label-text'>last Name</span>
              </label>
              <input className={`input input-bordered w-full ${inputStyle}`} type="text"

                name='lastName'
                value={formState.lastName}
                placeholder=' Last Name'
                // className='input input-bordered w-full'
                onChange={
                  (e) => setFormState({
                    ...formState,
                    lastName: e.target.value
                  })

                } />
            </div>


            {/* about */}

            <div className='form-control'>
              <label className={`label ${labelInputStyle} `}>
                <span className='label-text'>about</span>
              </label>

              <input className={`input input-bordered w-full ${inputStyle}`}
                type="text"

                name='about'
                value={formState.about}
                onChange={(e) => setFormState({
                  ...formState,
                  about: e.target.value
                })}
                placeholder=' provide your bio'
              // className='input input-bordered w-full'
              />
            </div>



            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

              {/* gender*/}
              <div className='form-control'>
                <label className={`label ${labelInputStyle} `}>
                  <span className='label-text'>gender</span>
                </label>
                {/*  this is used to select among multiple values */}
                <select className={`input input-bordered w-full ${inputStyle}`}
                  name='gender'
                  value={formState.gender}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      gender: e.target.value
                    })
                  }
                // className='select select-bordered w-full'
                >
                  <option value="">
                    Select your gender
                  </option>

                  {GENDER.map((gen) => (
                    <option
                      key={`native-${gen.name}`}
                      value={gen.name}
                    >
                      {gen.label}
                    </option>
                  ))}
                </select>

              </div>


              {/* dateOfBirth */}

              <div className="form-control">
                <label className={`label ${labelInputStyle} `}>
                  <span className="label-text">date Of Birth</span>
                </label>
                <div className={`${inputStyle} relative`}>
                  <Calendar className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formState.dateOfBirth}
                    onChange={(e) => setFormState({ ...formState, dateOfBirth: e.target.value })}
                    className="outline-none focus:outline-none  w-full pl-10"
                    placeholder="D.O.B"
                  />
                </div>
              </div>





            </div>

            {/* contact Number */}
            <div className="form-control">
              <label className={`label ${labelInputStyle}`}>
                <span className="label-text">Contact Number</span>
              </label>

              <div className="flex gap-3">

                {/* Country Code */}
                <select
                  className={`input input-bordered w-1/3 ${inputStyle}`}
                  name="countryCode"
                  value={formState.countryCode}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      countryCode: e.target.value,
                    })
                  }
                >
                  {countrycode.map((element) => (
                   <option key={`${element.code}-${element.country}`}
                     value={element.code}>
                      {element.code}
                    </option>
                  ))}
                </select>

                {/* Phone Number */}
                <div className="relative w-full">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />

                  <input
                    type="tel"
                     maxLength={10}
                    placeholder="xxx-xxxx-xxx"
                    className={`pl-12 input input-bordered w-full ${inputStyle}`}
                    name="contactNumber"
                    value={formState.contactNumber}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>

              </div>
            </div>
            {/* submit button */}

            <button className="  w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
     bg-blue-500 text-black
      hover:scale-95 transition-all duration-200"
              type='submit'>
              click me
            </button>
          </form>

        </div>
      </div>
    </div>
  )

}


export default ProfilePage

