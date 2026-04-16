"use client"
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '@/store/slices/adminSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import DoctorCard from '@/components/doctor/DoctorCard';
import Image from 'next/image';
import { fetchAllDoctors } from '@/store/async/doctorAsync';
const page = () => {
  const dispatch = useDispatch();
  const { adminToken, isLoading } = useSelector((state) => state.admin);
  const { doctors } = useSelector((state) => state.doctors)
  console.log('doctors list admin token is:', adminToken)

  useEffect(() => {
    if (adminToken) {
      if (!doctors || doctors.length === 0) {
        dispatch(fetchAllDoctors())
      }

    }
  }, [adminToken, doctors, dispatch])

  console.log('doctors list are:', doctors)
  return (
    <div className=" my-8 lg:mx-20 md:mx-10 md:max-w-[90vw] " >
      <h1 className="flex items-center justify-center my-3 text-gray-600 text-md md:text-2xl ">All doctors list</h1>
      {doctors.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-col-1 gap-8 flex justify-center">
          {doctors.map((doc, index) => (
            <div key={index} className="">
              <DoctorCard doc={doc} />
            </div>
          ))}
        </div>
      )}
    </div>

  )
}

export default page
