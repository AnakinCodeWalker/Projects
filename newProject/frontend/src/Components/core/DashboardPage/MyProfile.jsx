import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const MyProfile = () => {

    
    const  {user} = useSelector((state)=>state.profile)
const navigate  = useNavigate()
     
console.log(user);
    return (
    <div className='flex items-center text-white'>
        
            <h1>MyProfile</h1>
   
        <div>

<div>
    <img src ={user?.image} alt={user?.firstName} />
    <div>
        <p>{user?.firstName + " " + user?.lastName}</p>
        <p>{user?.email}</p>
    </div>
    {/* just go 1 route up shortcut  */}
    <button type='button' onClick={()=>navigate ("../settings")}>
        edit
    </button>
</div>

        </div>

    </div>
  )
}

export default MyProfile