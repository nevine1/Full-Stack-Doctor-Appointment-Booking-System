"use client"

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useParams } from 'next/navigation'
const DoctorAppointments = () => {
    const { docId } = useParams();
    const { doctors, doctorToken } = useSelector((state) => state.doctors)
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const getDocAppointments = async () => {
        try {
            const res = await axios.get(`${backUrl}/api/doctors/doctor-appointments`, { docId }, 
                {
                    headers: {
                        Authorization: `Bearer ${doctorToken}`
                    }
                }
            )
            
            console.log()
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (doctorToken) {
            getDocAppointments();
        }
    }, [doctorToken])
  return (
    <div>
      
    </div>
  )
}

export default DoctorAppointments
