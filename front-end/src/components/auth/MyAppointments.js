"use client"
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '@/store/slices/usersSlice';
import Image from 'next/image'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setAppointments } from '../../store/slices/appointmentsSlice'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

const MyAppointments = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, isLoading, users } = useSelector((state) => state.users)
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


  const getAppointments = async () => {

    try {
      dispatch(setIsLoading(true))
      // The userId will be extracted from the token on the backend.
      const res = await axios.post("http://localhost:4000/api/users/get-appointment", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        console.log('front end res  is the data;', res.data.data)
        dispatch(setAppointments(res.data.data.reverse()))
        
        console.log('redux state data is:', res.data.data)
      }
    } catch (err) {
      toast.error(err.message)

    } finally {

      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    if (token) {
     getAppointments();
    }
  }, [token, dispatch])

  const { appointments } = useSelector((state) => state.appointments)

  // Group appointments by doctorId for rendering
    const groupedAppointments = appointments.reduce((acc, currentAppointment) => {
        const doctorId = currentAppointment.doctorId;
        if (!acc[doctorId]) {
            acc[doctorId] = {
                docData: currentAppointment.docData,
                appointments: [],
            };
      }
      
        acc[doctorId].appointments.push(currentAppointment);
        return acc;
    }, {});
  
 const cancelDocAppointment = async (appointmentId) => {
  try {
    dispatch(setIsLoading(true));

    const res = await axios.post(
      `${backUrl}/api/users/cancel-appointment`,
      { appointmentId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      await getAppointments(); // re-fetch fresh list
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    console.error("Cancel error:", err.message);
    toast.error("Failed to cancel appointment. Please try again.");
  } finally {
    dispatch(setIsLoading(false));
  }
};


  return (
     <div className="my-2 mx-auto  md:w-[60%]  sm:w-[80%]">
        <p className="mt-12 pb-2  text-center text-lg font-semibold">My Appointments</p>
        <div>
          {Object.values(groupedAppointments).map((doctor , index) => (
            <div key={index} className="my-6  p-4 border  border-gray-300 rounded-xl shadow-md">
              {/* Doctor's main info */}
              <div className="">
                <Link href={`/doctors/${doctor.docData._id}`} className="flex items-center gap-6 mb-4">
                  <Image
                    src={doctor.docData.image}
                    alt={doctor.docData.name}
                    width={100}
                    height={100}
                    className="w-48 bg-blue-100 rounded-xl shadow-lg"
                      />
                  <div>
                    <p className="font-semibold text-lg">{doctor.docData.name}</p>
                    <p className="text-zinc-600">{doctor.docData.speciality}</p>
                  </div>
                </Link>
              </div>

              {/* List of all appointments for this doctor */}
              <h4 className="font-semibold text-zinc-700 mt-4 border-t  border-gray-300 pt-4">Booked Slots:</h4>
              {doctor.appointments.map((item, appointmentIndex) => (
                <div key={appointmentIndex} className="flex flex-col sm:flex-row justify-between gap-4 px-2 py-4 border-b last:border-b-0">
                  <div className="text-sm text-zinc-600">
                    <span className="font-semibold text-zinc-800">Date:</span> {item.slotDate}
                    </div>
                    <div className="text-sm text-zinc-600">
                      <span className="font-semibold text-zinc-800">Time:</span> {item.slotTime}
                    </div>
                    {/* Example action buttons for each slot */}
                    <div className="flex gap-2">
                      <button className="px-6 py-1  border border-blue-500 text-blue-500 
                      cursor-pointer rounded-full transition-all duration-300 hover:text-white hover:bg-blue-500">
                        Pay
                      </button>
                    <button
                      onClick={() => cancelDocAppointment(item._id)}
                      className=" px-6 py-1 ml-3  border border-red-500 text-red-500 
                      cursor-pointer rounded-full transition-all duration-300 hover:text-white hover:bg-red-500 hover:border-white">
                        Cancel
                      </button>
                    </div>
                </div>
                  ))}
             </div>
            ))}
      </div>
      <div className="flex justify-center">
        <button type="button" onClick={() => router.push('/doctors')}
          className="flex justify-center mt-5 px-8 py-3  border border-blue-500 text-blue-500 
            cursor-pointer rounded-full transition-all duration-300 hover:text-white hover:bg-blue-500
          "
        >Book another appointment</button>
      </div>

        </div>
    );
};

export default MyAppointments;