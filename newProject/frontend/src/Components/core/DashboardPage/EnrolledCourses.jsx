import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../services/apiconnector'
import { Profile } from '../../../services/api'
import toast from "react-hot-toast";
import { setLoading } from '../../slices/profileSlice';
import { Loader2} from "lucide-react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const EnrolledCourses = () => {
  const [enrolledCourses ,SetEnrolledcourses] = useState()
  const dispatch = useDispatch()
  const getEnrolledCourses = async () => {
    try {
     dispatch(setLoading(true))
    const response = await apiConnector("POST",Profile.ENROLLED_COURSE_API)
    console.log(response);
    toast.success("course details")     
    } catch (error) {
            toast.error("course details")     

      console.log(error);  
    }
  }
  useEffect(()=>{
getEnrolledCourses()
  },[])
    return (
    <div></div>
  )
}

export default EnrolledCourses