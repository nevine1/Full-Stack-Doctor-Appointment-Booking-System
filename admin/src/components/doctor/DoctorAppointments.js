"use client"
import axios from "axios";
import { useSelector, dispatch, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDoctorAppointments , setIsLoading} from '../../store/slices/appointmentsSlice'

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const { doctorToken } = useSelector((state) => state.doctors);
  const { appointments, isLoading } = useSelector((state) => state.appointments);
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getDocAppointments = async () => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.get(`${backUrl}/api/doctors/doctor-appointments`, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });

      if (res.data.success) {
        dispatch(setDoctorAppointments(res.data.data))
      }
  
      console.log('doctor appointments are:', appointments)
    } catch (err) {

      console.log("Error:", err.response?.data || err.message);

    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (doctorToken) {
      getDocAppointments();
    }
  }, [doctorToken]);

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
  
  return (
    <div className="m-6  ">
      <h1 className="md:text-lg sm:text-sm font-medium text-center text-gray-700">All Appointments</h1>
      <div className="m-5 gap-1 py-2 rounded shadow-md bg-white">
        <div className="grid   items-center text-center shadow-sm bg-gray-100 border-b border-gray-400 text-gray-700 text-[14px] grid-cols-[0.5fr_1fr_2fr_2fr_3fr_2fr] p-2 ">
          <p>#</p>
          <p>Patient</p>
          <p>Payment </p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Action</p>
        
        </div>
      <div >
         {
        appointments.length > 0 && appointments.map((item, index) => (
          <div key={index} className="grid grid-cols-[0.5fr_1fr_2fr_2fr_3fr_2fr] p-2 text-center text-[13px] items-center text-gray-600">
            <p>{index+1}</p>
            <p>{item.userData.name}</p>
            <p></p>
            <p>{calculateAge(item.userData.DOB)} Y</p>
            <p>{formatSlot(item.slotDate, item.slotTime)}</p>
            <p></p>
            
          </div>
        ))
      }
      </div>
      </div>
    </div>
  )
};

export default DoctorAppointments;
