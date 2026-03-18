"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import { assets } from "@/assets/assets";
import {
  doctorCancelAppointment,
  doctorCompleteAppointment,
  getDocAppointments,
} from "@/store/async/doctorAsync";

const DoctorDashboard = () => {
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();

  const { doctorToken } = useSelector((state) => state.doctors);
  const { appointments } = useSelector((state) => state.appointments);

  const [dashedData, setDashedData] = useState({});
  const [loadingAppointments, setLoadingAppointments] = useState({});

  //  Fetch doctor dashboard data
  const dashboardData = async () => {
    try {
      const res = await axios.get(`${backUrl}/api/doctors/doctor-dashboard`, {
        headers: { Authorization: `Bearer ${doctorToken}` },
      });
      if (res.data.success) {
        setDashedData(res.data.data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  //  Initial load
  useEffect(() => {
    if (doctorToken) {
      dashboardData();
      //dispatch(getDocAppointments());
    }
  }, [doctorToken]);

  //  Re-fetch dashboard when appointments update
  useEffect(() => {
    if (doctorToken && appointments?.length >= 0) {
      dashboardData();
    }
  }, [appointments]);

  //  Format slot date + time
  const formatSlot = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    const formatted = d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${formatted} at ${slotTime}`;
  };

  const handleCancel = async (id) => {
    setLoadingAppointments((prev) => ({ ...prev, [id]: true }));
    try {
      await dispatch(doctorCancelAppointment(id));
      toast.success("Appointment canceled");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingAppointments((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleComplete = async (id) => {
    setLoadingAppointments((prev) => ({ ...prev, [id]: true }));
    try {
      await dispatch(doctorCompleteAppointment(id));
      toast.success("Appointment marked as completed");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingAppointments((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Render loading state if dashboard data not ready
  /* if (!dashedData?.appointments) return <p className="m-5">Loading...</p>; */

  return (
    <div className="m-5">
      {/*  Dashboard Stats */}
      <div className="flex flex-wrap gap-7 items-center">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded shadow border cursor-pointer transition-all duration-300 hover:scale-105">
          <Image
            src={assets.earning_icon}
            width={100}
            height={100}
            className="w-14"
            alt="earning_icon"
          />
          <div>
            <p className="text-xl font-semibold text-gray-500">
              ${dashedData.earnings || 0}
            </p>
            <p className="text-xs text-gray-400">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded shadow border cursor-pointer transition-all duration-300 hover:scale-105">
          <Image
            src={assets.appointment_icon}
            width={100}
            height={100}
            className="w-14"
            alt="appointments_icon"
          />
          <div>
            <p className="text-xl font-semibold text-gray-500">
              {dashedData.appointments || 0}
            </p>
            <p className="text-xs text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded shadow border cursor-pointer transition-all duration-300 hover:scale-105">
          <Image
            src={assets.patients_icon}
            width={100}
            height={100}
            className="w-14"
            alt="patients_icon"
          />
          <div>
            <p className="text-xl font-semibold text-gray-500">
              {dashedData.patients || 0}
            </p>
            <p className="text-xs text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="mt-10 border-2 border-gray-200 bg-gray-200 rounded sm:w-[85%] md:w-[75%] py-2 px-4">
        <div className="flex items-center gap-4 p-3 rounded-t border-b border-gray-200">
          <Image
            src={assets.list_icon}
            alt="list_icon"
            width={50}
            height={50}
            className="w-5 h-5"
          />
          <p className="font-semibold">Latest booking appointments</p>
        </div>

        <div className="mt-4 bg-gray-200">
          {dashedData.latestAppointments?.map((item, index) => (
            <div
              className="flex items-center bg-white mb-2 hover:bg-gray-100 px-4 py-5 gap-4 transition-all duration-300"
              key={index}
            >
              <Image
                src={item.userData.image || "/placeholder.png"}
                alt="patient image"
                width={50}
                height={50}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-500">{item.userData.name}</p>
                <p className="text-gray-400 text-[12px]">
                  {formatSlot(item.slotDate, item.slotTime)}
                </p>
              </div>

              <div>
                {item.canceled ? (
                  <p className="text-red-500 font-bold text-xs">Canceled</p>
                ) : item.completed ? (
                  <p className="text-green-500 font-bold text-xs">Completed</p>
                ) : (
                  <div className="flex flex-row gap-3">
                    <button
                      className="text-[12px] text-white px-4 py-1 rounded-md cursor-pointer bg-red-400 disabled:opacity-50"
                      disabled={loadingAppointments[item._id]}
                      onClick={() => handleCancel(item._id)}
                    >
                      {loadingAppointments[item._id] ? "Cancelling..." : "Cancel"}
                    </button>
                    <button
                      className="text-[12px] text-white px-4 py-1 rounded-md cursor-pointer bg-green-400 disabled:opacity-50"
                      disabled={loadingAppointments[item._id]}
                      onClick={() => handleComplete(item._id)}
                    >
                      {loadingAppointments[item._id] ? "Completing..." : "Complete"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;