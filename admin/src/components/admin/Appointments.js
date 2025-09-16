
"use client"
import { setAllAppointments, setIsLoading } from '@/store/slices/appointmentsSlice'
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
        fetchAllAppointments(); 
    }, [adminToken])

    console.log('all appointments is', appointments)
  return (
      <div>
          {
              appointments.length > 0 && 
                 
              appointments.map((item, index) => (
                  <div key={index}>
                      {
                          item.docData.name
                     } 
                  </div>
                ))

          }
    </div>
  )
}

export default Appointments