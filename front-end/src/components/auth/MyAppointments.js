"use client"
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '@/store/slices/usersSlice';
import Image from 'next/image'
import { toast } from 'react-toastify'
import axios from 'axios'
const MyAppointments = () => {
  const { doctors } = useSelector((state) => state.doctors)
  const { token , isLoading} = useSelector((state) => state.users)
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log('my appointment token is', token)
  const getAppointments = async () => {
    
    try {
      setIsLoading(true)
        await axios.get("http://localhost:4000/api/users/get-appointment", {
  headers: { Authorization: `Bearer ${token}` }
});
  
      if(res.data.success){
        console.log('gettinga ppointment', res.data.data)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAppointments();
  }, [token])
  return (
    <div>
          <p className="mt-12 pb-2 font-medium ">My Appointments</p>
      <div>
        <button onClick={getAppointments} type="button" className="cursor-pointer">get appointments</button>
              {
                  doctors.slice(0, 2).map((doctor, index) => (
                      <div key={index}
                          className="my-6 p-4 grid grid-cols-[1fr_2fr] sm:flex sm:gap-6 "
                        >
                          <div>
                              <Image
                              src={doctor.image}
                              alt={doctor.name}
                              width={100}
                              height={100}
                              className="w-48 bg-blue-100 rounded-xl shadow-lg"
                          />
                          </div>
                          <div className="flex-1 text-sm gap-5 text-zinc-600">
                              <p className="font-semibold">{doctor.name}</p>
                              <p className="">{doctor.speciality}</p>
                              <p className="font-semibold mt-2 text-zinc-700">ِAddress:</p>
                              <p className="text-xs ">{doctor.address.line1}</p>
                              <p className="text-xs mb-3">{doctor.address.line2}</p>
                              <p className="">
                                  <span className="text-xs font-semibold">Date & Time: </span>
                                  <span>date, time</span>
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
