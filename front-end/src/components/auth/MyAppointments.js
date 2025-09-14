"use client"
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '@/store/slices/usersSlice';
import Image from 'next/image'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setAppointments, clearAppointments } from '../../store/slices/appointmentsSlice'
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
        headers: {
          Authorization: `Bearer ${token}`
        }
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
console.log('all appointments are;', appointments)
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
  
    //cancel appointment 
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

    //pay online for appointment 
  const payOnline = async (appointmentId) => {
  try {
    const res = await axios.post(`${backUrl}/api/users/online-payment`, 
      { appointmentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('appointment id for only payment is:', appointmentId)
console.log('online paymeent responsd ied is', res)
    if (res.data.success) {
      // Save paymentIntentId temporarily for confirm step
      localStorage.setItem("paymentIntentId", res.data.paymentIntentId);
      console.log('online paymeent responsd ied is', res.data)
      // Redirect to Stripe checkout
      window.location.href = res.data.url;
    }
  } catch (err) {
    console.error(err);
    toast.error("Payment failed to start");
  }
    };

  return (
     <div className="my-2 mx-auto lg:w-[60%]  md:w-[85%]  sm:w-[95%]">
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
              {doctor.appointments.map((item, appointmentIndex) => {
                console.log("doctor appointment item is:", item);
                return (
                  <div
                    key={appointmentIndex}
                    className="flex flex-col sm:flex-row justify-between gap-4 px-2 py-4 border-b last:border-b-0"
                  >
              {/* Date */}
              <div className="text-sm text-zinc-600">
                <span className="font-semibold text-zinc-800">Date:</span> {item.slotDate}
              </div>

              {/* Time */}
              <div className="text-sm text-zinc-600">
                <span className="font-semibold text-zinc-800">Time:</span> {item.slotTime}
              </div>

              {/* Actions */}
              <div className="flex gap-2 items-center">
                {item.isPaid ? (
                  <>
                  <span className="text-green-600 text-sm font-medium">
                    Payment is done
                  </span>
                  <button
                    onClick={() =>
                      cancelPayment(item._id) // your cancel payment handler
                    }
                    className="px-4 py-1 border border-blue-500 text-blue-500 text-sm cursor-pointer rounded-md transition-all duration-300 hover:text-white hover:bg-blue-500"
                  >
                    Cancel Payment
                  </button>
                </>
              ) : (
                <>
            <button
              onClick={() =>
                payOnline(item._id, item.slotDate, item.slotTime)
              }
              className="px-4 py-1 border border-green-500 text-green-500 text-sm cursor-pointer rounded-md transition-all duration-300 hover:text-white hover:bg-green-500"
            >
              Pay Now
            </button>

            <button
              onClick={() => cancelDocAppointment(item._id)}
              className="px-4 py-1 border border-red-500 text-red-500 text-sm cursor-pointer rounded-md transition-all duration-300 hover:text-white hover:bg-red-500"
            >
              Cancel Appointment
            </button>
          </>
        )}
      </div>
    </div>
  );
})}

             </div>
            ))}
      </div>
      <div className="flex flex-col gap6 justify-center">
        <button type="button" onClick={() => router.push('/doctors')}
          className="flex justify-center mt-5 px-8 py-3  border border-blue-500 text-blue-500 
            cursor-pointer rounded-full transition-all duration-300 hover:text-white hover:bg-blue-500
          "
        >Book another appointment</button>

        <button type="button"
          className="flex justify-center mt-5 px-8 py-3  border border-blue-500 text-blue-500 
            cursor-pointer rounded-full transition-all duration-300 hover:text-white hover:bg-blue-500
          "
          onClick={() => dispatch(clearAppointments())}> Clear all appointments</button>
      </div>
    
        </div>
    );
};

export default MyAppointments;