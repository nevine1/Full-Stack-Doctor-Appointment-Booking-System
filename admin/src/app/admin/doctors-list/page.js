"use client"
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '@/store/slices/adminSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import Doctor from '@/components/doctor/Doctor';
import Image from 'next/image';
const page = () => {
  const dispatch = useDispatch();
  const { adminToken, isLoading } = useSelector((state) => state.admin);
  console.log('doctors list admin token is:', adminToken)
  const [doctors , setDoctors] = useState([])
  const fetchAllDoctors = async () => {
    try {
      const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
      dispatch(setIsLoading(true));
      if (adminToken) {
        const res = await axios.post(`${backUrl}/api/admin/get-doctors`, { }, {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        })
       
        if (res.data) {
          setDoctors(res.data.data)
        } else {
          toast.error(error.message)
        }
        
      }
      
    } catch (err) {
      console.log(err.message)
    }
  }
  
  useEffect(() => {
    if (adminToken) {
      fetchAllDoctors();
    }
  }, [adminToken])
  console.log('doctors list are:', doctors)
  return (
    <div className=" my-8 lg:mx-20 md:mx-10 md:max-w-[90vw] " >
      <h1 className="flex items-center justify-center my-3 text-gray-600 text-md md:text-2xl ">All doctors list</h1>
    {doctors.length > 0 && (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-col-1 gap-8 flex justify-center">
        {doctors.map((doc, index) => (
          <div key={index} className="">
            <Doctor doc={doc} />
          </div>
        ))}
      </div>
    )}
  </div>

  )
}

export default page
