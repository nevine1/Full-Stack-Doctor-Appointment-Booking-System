"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
const MyAppointments = () => {
    const { doctors } = useSelector((state) => state.users)
  return (
    <div>
          <p className="mt-12 pb-2 font-medium ">My Appointments</p>
          <div>
              {
                  doctors.slice(0, 2).map((doctor, index) => (
                      <div key={index}
                          className="my-6 p-4 grid grid-cols-[1fr_2fr] sm:flex sm:gap-6 "
                        >
                          <div>
                              <Image
                              src={doctor.image}
                              alt={doctor.name}
                              /* width={100}
                              height={100} */
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
