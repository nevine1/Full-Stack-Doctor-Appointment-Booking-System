"use client"
import { setAllAppointments, setIsLoading } from '@/store/slices/appointmentsSlice'
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'

const Appointments = () => {
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL 
  const dispatch = useDispatch();
  const { adminToken } = useSelector((state) => state.admin)
  const { appointments } = useSelector((state) => state.appointments)
  
  const fetchAllAppointments = async () => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.get(`${backUrl}/api/admin/appointments-admin`, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })
      if (res.data.success) {
        dispatch(setAllAppointments(res.data.data))
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
  
  useEffect(() => {
    if (adminToken) {
      fetchAllAppointments(); 
    }
  }, [adminToken])
  
  const calculateAge = ( dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear()
    return age 
  }
  //formate date 
  
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">All Appointments</h1>

      {/* Header row */}
      <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] font-semibold py-3 px-6 shadow-md bg-gray-200 border-b border-b-gray-600 text-center text-gray-700">
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

      {/* Data rows */}
      {appointments.length > 0 && appointments.map((item, index) => (
        <div 
          key={index}
          className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 text-[14px] border-b border-b-gray-300 text-center"
        >
          <p>{index + 1}</p>
         
          <div className="flex flex-row gap-3 items-center justify-start sm:justify-center text-left">
            <Image
              src={item.userData.image}
              alt="patient image"
              width={40}
              height={40}
              className="w-8 h-8 rounded-full"
            />
            <p>{item.userData.name}</p>
          </div>

          <p>{calculateAge(item.userData.DOB)} years</p>
          <p>{item.slotDate} at {item.slotTime}</p>
          
          <div className="flex flex-row gap-3 items-center justify-start sm:justify-center text-left">
            <Image
              src={item.docData.image}
              alt="patient image"
              width={40}
              height={40}
              className="w-8 h-8 rounded-full bg-blue-100"
            />
            <p>{item.docData.name}</p>
          </div>
          <p>{item.docData.fees}</p>

          <p className={item.isPaid ? "text-green-500" : "text-red-500"}>
            {item.isPaid ? "Paid" : "On Waiting"}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Appointments
