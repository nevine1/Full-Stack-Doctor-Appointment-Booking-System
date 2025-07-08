"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { current } from '@reduxjs/toolkit'
const Appointment = () => {
    const { doctors } = useSelector((state) => state.doctors)
    const params = useParams();
    const { id } = params; 
    const doctor = doctors.find((doc) => doc._id === id); 

    const [docSlots, setDocSlots ] = useState([])
    const [slotIndex, setSlotIndex ] = useState(0)
    const [slotTime, setSlotTime] = useState('');

    const getAvailableSlot = async () => {
        //first , clear the previous docSlot 
        setDocSlots([])

        //getting current date and getting 7 days from today for booking appointment
        let today = new Date(); 

        for (let i = 0; i < 7; i++){
            //getting date with index
            let currentDate = new Date(today); //today date 
            currentDate.setDate(today.getDate() + i);

            //setting end time with index
            let endTime = new Date();
            endTime.setDate(today.getDate() + 1);
            endTime.setHours(21, 0, 0, 0)
            
            //setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 0 ? currentDate.getHours() + 1 : "10");
                currentDate.setMinutes(currentDate.getMinutes() > 30  ? 30 : 0 )
            }
        }
    }

    useEffect(() => {
        getAvailableSlot();
    }, [ doctor ])
  return (
      <div className="flex flex-row sm:flex-row gap-5 my-10 mx-4">
          {/* left side  */}
          <div>
              <Image
                  src={doctor.image}
                  alt={doctor.name}
                 /*  height={100%}
                  width={100} */
                  className="w-full  h-auto shadow-md bg-blue-50 border border-blue-200 rounded-lg"
              />
          </div>

          {/* right side  */}
          <div className="flex-1 justify-start items-center leading-loose">
              <div className="border border-blue-200 rounded-lg px-8 py-6 gap-4 mr-5">
                  <h1 className="flex items-center gap-3 font-bold text-2xl text-gray-700 mb-4" >
                      {doctor.name} 
                      <Image
                          src={assets.verified_icon}
                          alt="verified icon"
                          width={20}
                          height={20}
                      />
                  </h1>
                  <div className="flex flex-row gap-3 text-sm text-gary-500 font-semibold">
                      <p>{doctor.degree} - {doctor.speciality} -</p>
                      <button className="py-0.5 rounded-full px-2 border border-gray-500 ">{doctor.experience}</button>
                  </div>
                  <p className="text-gray-700 text-md ">{doctor.about}</p>
                  <p className="font-semibold text-gray-600 text-sm mt-4">Appointment fees -  
                      <span>  ${doctor.fees}</span>
                  </p>
              </div>
          </div>
    </div>
  )
}

export default Appointment
