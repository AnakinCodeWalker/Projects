import { useState } from "react";
import { useSelector } from "react-redux";


import React from 'react'

const ForgotPasswordPage = () => {
  
  const [emailSent , setEmailSent] = useState(false)
  const [email,setEmail] = useState("")

  const {loading}  = useSelector((state)=>state.auth)
  return (
    
    <div>

{
  loading ? (<div className=" font-bold text-center text-white text-2xl">
    loading
    </div>) 
    :(
<div>
   <h1>
  
  {
    !emailSent ? "Reset your password" : "Check your email"
  }

  </h1>
  
  <p>
    {
      !emailSent ? "Dont get Nervous we will email you instruction to reset your password"
      : 
      `we have sent you the reset  email to ${email}`
    }
     
  </p>


<form action="">
  {
    !emailSent ? 
  }
</form>
        </div>
    )
}

    </div>
  )
}

export default ForgotPasswordPage