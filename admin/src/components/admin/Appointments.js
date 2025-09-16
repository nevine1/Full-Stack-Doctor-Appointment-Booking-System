
"use client"
import { setAllAppointments, setIsLoading } from '@/store/slices/appointmentsSlice'
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'

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
            
            console.log(res.data.data)
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

    console.log('all appointments is', appointments)
  return (
      <div className=" ">
          <h1>All Appointments</h1>
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b-gray-600">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {
              appointments.length > 0 && 
              appointments.map((item, index) => (
                  <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b-gray-600">
                      <p>{index+1}</p>
                      <div className="flex flex-row gap-2 justify-center items-center">
                          <Image src={item.userData.image}
                              alt="patient image"
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full "
                          />
                          <p>{item.userData.name}</p>
                      </div>
                      <p>{item.userData.DOB}</p>
                      <p>{item.slotDate} at {item.slotTime}</p>
                      <p>{item.docData.name}</p>
                      <p>{item.docData.fees}</p>
                      <p className={`${item.isPaid ? "text-green-500" : "text-red-500"}  `}>{item.isPaid ? "Paid": "On Waiting"}</p>
                  </div>
              ))

          }
    </div>
  )
}

export default Appointments