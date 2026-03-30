// gird kai andar 2 divs hai 


import { useState } from 'react'
import toast from 'react-hot-toast'
import boxoffice from "../assets/Images/boxoffice.png"
import { apiConnector } from '../services/apiconnector'
import { contactUs } from '../services/api'
const ContactUsPage = () => {

  const inputStyle = "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
  const labelInputStyle = "block text-gray-700 text-sm font-bold mb-2"


  const [formData, setFormData] = useState({
    email: "",
    query: ""
  })
  async function submitHandler(e) {
    e.preventDefault();
    try {
      const result = await apiConnector("POST", contactUs.CONTACTUS_API, formData);
      if (result.success) {
        toast.success("Query Sent");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending query");
    }
  }
  return (
    <div className='overflow-x-hidden font-bold w-screen h-screen  text-white text-3xl'>
      <div className='text-center flex-col justify-center items-center text-slate-300 text-4xl w-full max-h-40 flex  mt-20 mb-20 '>

        ContactUsPage
        <p className='mt-3 text-xl '> We will Assure you your Query will be resolved as soon as possible</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full h-auto'>

        {/* form */}
        <div className='flex gap-5 mx-10'>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>

            <label className={labelInputStyle}>
              <p>email</p>
              <input className={inputStyle}
                type="email"
                required
                name='email'
                // defaultValue={}
                placeholder='enter your email'
                value={formData.email}
                onChange={(e) => setFormData({
                  ...formData,
                  email: e.target.value
                })} />
            </label>

            <label className={labelInputStyle}>
              <p>Provide your Query</p>
              <textarea className={` w-full 
    min-h-[100px] 
    max-h-[200px] 
    overflow-y-auto 
    resize-none 
    border 
    p-2 
    rounded-md ${inputStyle}`}
                type="text"
                required
                name='query'
                rows={1}
                // placeholder='Enter Query'
                value={formData.query}
                onChange={(e) => setFormData({
                  ...formData,
                  query: e.target.value
                })} />
            </label>

            {/* button */}
            <div className='mt-5  w-fit text-center px-6 py-3 rounded-md font-bold text-[13px]
       bg-blue-500 text-black
      hover:scale-95 transition-all duration-200'>
              <button type="submit">
                submit
              </button>
            </div>

          </form>
        </div>

        {/* img */}
        <div className=' flex justify-center items-center'>
          <img className="w-full h-full object-cover" src={boxoffice} alt="Contact us Page image" />
        </div>

      </div>

    </div>
  )
}

export default ContactUsPage