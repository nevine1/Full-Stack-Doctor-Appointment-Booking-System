"use client";

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "@/store/slices/usersSlice";
import { setAppointments, clearAppointments } from "@/store/slices/appointmentsSlice";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const MyAppointments = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const canceled = searchParams.get("canceled");
  const appointmentIdFromUrl = searchParams.get("appointmentId");

  const { token, isLoading } = useSelector((state) => state.users);
  const { appointments } = useSelector((state) => state.appointments);

  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getAppointments = useCallback(async () => {
    if (!token) return;

    try {
      dispatch(setIsLoading(true));
      const res = await axios.post(
        `${backUrl}/api/users/get-appointment`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        dispatch(setAppointments(res.data.data.reverse()));
      } else {
        toast.error(res.data.message || "Failed to fetch appointments");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to fetch appointments");
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [token, backUrl, dispatch]);

  useEffect(() => {
    if (!token) return router.push("/auth/login");
    getAppointments();
  }, [token, getAppointments, router]);

  const cancelDocAppointment = async (appointmentId) => {
    try {
      dispatch(setIsLoading(true));
      const res = await axios.post(
        `${backUrl}/api/users/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        await getAppointments();
      } else {
        toast.error(res.data.message || "Failed to cancel appointment");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel appointment");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const payOnline = async (appointmentId) => {
    try {
      const res = await axios.post(
        `${backUrl}/api/users/online-payment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        localStorage.setItem("paymentIntentId", res.data.paymentIntentId);
        window.location.href = res.data.url;
      } else {
        toast.error(res.data.message || "Failed to start payment");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed to start");
    }
  };

  const cancelPayment = useCallback(
    async (appointmentId) => {
      if (!appointmentId) return;

      try {
        dispatch(setIsLoading(true));
        const res = await axios.post(
          `${backUrl}/api/users/cancel-payment`,
          { appointmentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          toast.warning("Payment canceled.");
          localStorage.removeItem("paymentIntentId");
          await getAppointments();
          router.replace("/auth/myAppointments");
        } else {
          toast.error(res.data.message || "Failed to cancel payment");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Could not cancel payment");
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [token, backUrl, dispatch, getAppointments, router]
  );

  useEffect(() => {
    if (canceled && appointmentIdFromUrl) {
      cancelPayment(appointmentIdFromUrl);
    }
  }, [canceled, appointmentIdFromUrl, cancelPayment]);

  const groupedAppointments = appointments.reduce((acc, current) => {
    const doctorId = current.doctorId;
    if (!acc[doctorId]) {
      acc[doctorId] = {
        docData: current.docData,
        appointments: [],
      };
    }
    acc[doctorId].appointments.push(current);
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen px-4 sm:px-6 md:px-8 py-8 bg-gray-50">

      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
          My Appointments
        </h2>

        {appointments.length === 0 && (
          <div className="flex flex-col gap-6 items-center">
            <p className="text-center text-gray-600">No appointments booked yet.</p>
            <Link
              href="/doctors"
              className="py-2 px-6 text-white text-semibold bg-blue-500 transition-all duration-300 
              hover:bg-white hover:text-blue-500 border hoverborder-blue-500 rounded-md"
            >Browse doctor&apos;s list to book your appointment</Link>
          </div>
        )}

        {Object.values(groupedAppointments).map((doctor) => (
          <div
            key={doctor.docData._id}
            className="mb-8 p-4 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-md"
          >
            <Link
              href={`/doctors/${doctor.docData._id}`}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6"
            >
              <Image
                src={doctor.docData.image}
                alt={doctor.docData.name}
                width={120}
                height={120}
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl bg-blue-100 shadow"
              />
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl font-semibold">{doctor.docData.name}</p>
                <p className="text-gray-600 text-sm sm:text-base">{doctor.docData.speciality}</p>
              </div>
            </Link>

            <h4 className="font-semibold text-gray-700 border-t pt-4 mb-2">Booked Slots:</h4>

            {doctor.appointments.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 border-b last:border-b-0"
              >
                <div className="flex flex-col sm:flex-row sm:gap-6 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">Date:</span> {item.slotDate}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Time:</span> {item.slotTime}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.isPaid ? (
                    <>
                      <span className="text-green-600 text-sm font-medium self-center">Payment Done</span>
                      <button
                        onClick={() => cancelPayment(item._id)}
                        className="px-4 py-1.5 text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
                      >
                        Cancel Payment
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => payOnline(item._id)}
                        className="px-4 py-1.5 text-sm border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition"
                      >
                        Pay Now
                      </button>

                      <button
                        onClick={() => cancelDocAppointment(item._id)}
                        className="px-4 py-1.5 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

        {appointments.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => router.push("/doctors")}
              className="px-6 py-2.5 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition"
            >
              Book Another Appointment
            </button>

            <button
              onClick={() => dispatch(clearAppointments())}
              className="px-6 py-2.5 border border-gray-400 text-gray-600 rounded-full hover:bg-gray-600 hover:text-white transition"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;