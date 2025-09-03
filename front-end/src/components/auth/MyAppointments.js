"use client"
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '@/store/slices/usersSlice';
import Image from 'next/image'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setAppointments } from '../../store/slices/appointmentsSlice'
import { getAppointments } from '../../store/slices/usersAsync'
const MyAppointments = () => {
  const dispatch = useDispatch();
  
  const { token , isLoading} = useSelector((state) => state.users)
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log('my appointment token is', token)

  useEffect(() => {
    
     if (token) {
    getAppointments(dispatch, token);
  }
  }, [token, dispatch])

  const { appointments } = useSelector((state) => state.appointments)
  console.log("updated appointments", appointments)
  console.log('final appointments are;', appointments)
  return (
    <div>
      <p className="mt-12 pb-2 font-medium ">My Appointments</p>
      <p>getting all appointments </p>
      
      <div>
        
              {
                  appointments.map((item, index) => (
                      <div key={index}
                          className="my-6 p-4 grid grid-cols-[1fr_2fr] sm:flex sm:gap-6 "
                        >
                          <div>
                              <Image
                              src={item.docData.image}
                              alt={item.docData.name}
                              width={100}
                              height={100}
                              className="w-48 bg-blue-100 rounded-xl shadow-lg"
                          />
                          </div>
                          <div className="flex-1 text-sm gap-5 text-zinc-600">
                              <p className="font-semibold">{item.docData.name}</p>
                              <p className="">{item.docData.speciality}</p>
                              <p className="font-semibold mt-2 text-zinc-700">ِAddress:</p>
                              <p>
                                <span className="text-xs font-semibold">Date & Time: </span>
                                <span>{item.slotDate}, {item.slotTime}</span>
                              </p>
                          </div>
                          <div></div>
                          <div className="flex flex-col gap-4">
                              <button className="px-4 py-2 mb-5 bg-blue-600 text-sm
                                text-white rounded-full shadow  transition-all duration-500
                                hover:bg-white hover:text-blue-500 border hover:border-blue-500">
                                  Pay online
                              </button>
                          
                            <button className="px-4 py-2 mb-5 bg-blue-600 text-sm
                                    text-white rounded-full shadow  transition-all duration-500
                                    hover:bg-white hover:text-blue-500 border hover:border-blue-500">
                                Cancel Appointment
                              </button>
                        </div>
                      </div>
                  ))
              }
          </div>
    </div>
  )
}

export default MyAppointments
