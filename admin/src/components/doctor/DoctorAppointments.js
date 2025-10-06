"use client"
import axios from "axios";
import { useSelector, dispatch, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDoctorAppointments, setAllAppointments , setIsLoading } from '../../store/slices/appointmentsSlice'
import Image from 'next/image'
import { assets } from "@/assets/assets";
import { doctorCancelAppointment, doctorCompleteAppointment, getDocAppointments } from '../../store/async/doctorAsync'
const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const { doctorToken } = useSelector((state) => state.doctors);
  const { appointments, isLoading } = useSelector((state) => state.appointments);
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
  
 
  console.log('appointments length are;', appointments?.length)
  
  useEffect(() => {
    if (doctorToken) {
      getDocAppointments(dispatch, doctorToken);
    }
  }, [doctorToken]);
  return (
    <div className="m-6  ">
      <h1 className="md:text-lg sm:text-sm font-medium text-center text-gray-700">All Appointments</h1>
      <div className="m-5 gap-1 py-2 rounded shadow-md bg-white">
        <div className="flex flex-wrap justify-between gap-1   items-center text-center shadow-sm bg-gray-200 border-b border-gray-400 text-gray-700 max-sm:text-[12px] md:text-[14px] sm:grid sm:grid-cols-[0.5fr_3fr_1fr_1fr_3fr_2fr_2fr] p-2 ">
          <p className="max-sm:hidden">#</p>
          <p>Patient</p>
          <p>Payment </p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Payment</p>
          <p>Action</p>
        
        </div>
      <div >
         {
        appointments?.length > 0 && appointments?.map((item, index) => (
          <div key={index} className="flex flex-wrap justify-between hover:bg-gray-100 duration-300 transition-all
             sm:grid sm:grid-cols-[0.5fr_3fr_1fr_1fr_3fr_2fr_2fr] p-2 text-center text-[13px] gap-1 items-center text-gray-600 border border-gray-100">
            <p className="max-sm:hidden">{index+1}</p>
            <div className="flex flex-row gap-3 items-center justify-start sm:justify-center text-left">
                <Image
                src={item.userData.image}
                alt="patient image"
                width={40}
                height={40}
                className="md:w-8 md:h-8 sm:w-4 sm:h-4 rounded-full bg-blue-100"
                />
              <p>{item.userData.name}</p>
            </div>
            <p>{item.onlinePayment ? "online" : "Cash"}</p>
            <p>{calculateAge(item.userData.DOB)} Y</p>
            <p>{formatSlot(item.slotDate, item.slotTime)}</p>
            <p>{item.onlinePayment ? "online" : "Cash"}</p>
            <div className="flex flex-row gap-2 items-center justify-center">
              {
                item.canceled 
                  ? <p className="text-red-500 text-[12px]">Canceled</p> 
                  : item.completed 
                    ? <p className="text-green-500 text-[12px]">Completed</p>
                    : (
                      <div className="flex flex-row gap-2 items-center justify-center">
                        <button className="text-[12px] text-white px-2 py-1 rounded-md cursor-pointer bg-red-400"
                          onClick={() => doctorCancelAppointment(dispatch, item._id, doctorToken)}
                          >Cancel
                        </button>
                        <button className="text-[12px] text-white px-2 py-1 rounded-md cursor-pointer bg-green-400"
                          onClick={() => doctorCompleteAppointment(dispatch, item._id, doctorToken)}
                          >Complete
                        </button>
                      </div>
                    )
              }
              
            </div>
            
          </div>
        ))
      }
      </div>
      </div>
    </div>
  )
};

export default DoctorAppointments;
