"use client"
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '@/store/slices/adminSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
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
    <div className=" flex flex-col m-8 ">
     
        { doctors.length > 0 && 
        doctors.map((doc, index) => (
          <div key={index} className="p-4 m-2 grid md:grid-cols-4 sm:grid-cols-2 border border-red-500  gap-4 ">
            <h1>{doc.name}</h1>
          </div>
        ))
      }
      
    </div>
  )
}

export default page
