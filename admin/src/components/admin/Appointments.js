"use client"
import { setAllAppointments, setIsLoading } from '../../store/slices/appointmentsSlice'
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'

import { toast } from 'react-toastify'
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
  
  //calculate age for the patient
  const calculateAge = ( dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear()
    return age 
  }

  //formate date 
 const formatSlot = (slotDate, slotTime) => {
  const [day, month, year] = slotDate.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const today = new Date();
  const formatted = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return  `${formatted} at ${slotTime}` ;
};

  const cancelAppointment = async (appointmentId) => {
    try {
      const res = await axios.post(`${backUrl}/api/admin/admin-cancel-appointment`, {appointmentId}, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })
      if (res.data.success) {
        toast.success('appointment is canceled')
        dispatch(setAllAppointments())
      }

    } catch (err) {
      console.log(err.message);
      toast.error(err.message)
    }
  }
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">All Appointments</h1>
      
      <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] font-semibold py-3 px-6 shadow-md bg-gray-200 border-b border-b-gray-600 text-center text-gray-700">
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

   
      {appointments?.length > 0 && appointments?.map((item, index) => {
        /* console.log('dates in map function is', item.slotDate) */
        return (
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
           <p>{formatSlot(item.slotDate, item.slotTime)}</p>
          
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
              {
                item.isPaid ? "Paid" : item.canceled ? "cancelled " :
                  <button className="text-[12px] text-white px-4 py-1 rounded-md cursor-pointer bg-red-400"
                    onClick={() => cancelAppointment(item._id)}
                  >Cancel</button>
              }
          </p>
        </div>
      )
      })}
    </div>
  )
}

export default Appointments
