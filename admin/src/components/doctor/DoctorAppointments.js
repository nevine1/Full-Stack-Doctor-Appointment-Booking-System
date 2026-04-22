"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Image from "next/image";
import {
  doctorCancelAppointment,
  doctorCompleteAppointment,
  getDoctorAppointments,
} from "../../store/async/doctorAsync";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const { doctorToken } = useSelector((state) => state.doctors);
  const { appointments } = useSelector((state) => state.appointments);


  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    return today.getFullYear() - birthDate.getFullYear();
  };

  const formatSlot = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split("-").map(Number);
    const d = new Date(year, month - 1, day);

    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }) + ` at ${slotTime}`;
  };

  const getDate = (item) => {
    const [day, month, year] = item.slotDate.split("-").map(Number);
    return new Date(year, month - 1, day);
  };


  useEffect(() => {
    if (doctorToken) {
      dispatch(getDoctorAppointments());
    }
  }, [doctorToken, dispatch]);



  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validAppointments = appointments
    ?.filter((item) => {
      if (item.canceled) return false;

      const date = getDate(item);
      return date >= today;
    })
    .sort((a, b) => getDate(a) - getDate(b));



  const todayAppointments = [];
  const tomorrowAppointments = [];
  const upcomingAppointments = [];

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  validAppointments?.forEach((item) => {
    const date = getDate(item);

    if (date.getTime() === today.getTime()) {
      todayAppointments.push(item);
    } else if (date.getTime() === tomorrow.getTime()) {
      tomorrowAppointments.push(item);
    } else {
      upcomingAppointments.push(item);
    }
  });



  const renderAppointments = (list) =>
    list.map((item, index) => (
      <div
        key={index}
        className="flex flex-wrap justify-between hover:bg-gray-100 transition
        sm:grid sm:grid-cols-[0.5fr_3fr_1fr_1fr_3fr_2fr_2fr]
        p-2 text-center text-[13px] gap-1 items-center text-gray-600 border border-gray-100"
      >
        <p className="max-sm:hidden">{index + 1}</p>

        <div className="flex gap-3 items-center justify-start sm:justify-center text-left">
          <Image
            src={item.userData.image}
            alt="patient"
            width={40}
            height={40}
            className="rounded-full bg-blue-100"
          />
          <p>{item.userData.name}</p>
        </div>

        <p>{item.onlinePayment ? "Online" : "Cash"}</p>
        <p>{calculateAge(item.userData.DOB)} Y</p>
        <p>{formatSlot(item.slotDate, item.slotTime)}</p>
        <p>{item.onlinePayment ? "Online" : "Cash"}</p>

        <div className="flex gap-2 justify-center">
          {item.completed ? (
            <p className="text-green-500 text-[12px]">Completed</p>
          ) : (
            <>
              <button
                className="text-white px-2 py-1 rounded-md bg-red-400 text-[12px]"
                onClick={() =>
                  dispatch(doctorCancelAppointment(item._id))
                }
              >
                Cancel
              </button>

              <button
                className="text-white px-2 py-1 rounded-md bg-green-400 text-[12px]"
                onClick={() =>
                  dispatch(doctorCompleteAppointment(item._id))
                }
              >
                Complete
              </button>
            </>
          )}
        </div>
      </div>
    ));



  return (
    <div className="m-6">

      <h1 className="text-lg font-medium text-center text-gray-700 mb-4">
        Doctor Appointments
      </h1>

      {todayAppointments.length > 0 && (
        <>
          <h2 className="font-bold text-green-600 mb-2">Today</h2>
          {renderAppointments(todayAppointments)}
        </>
      )}

      {tomorrowAppointments.length > 0 && (
        <>
          <h2 className="font-bold text-blue-600 mt-6 mb-2">Tomorrow</h2>
          {renderAppointments(tomorrowAppointments)}
        </>
      )}

      {upcomingAppointments.length > 0 && (
        <>
          <h2 className="font-bold text-gray-700 mt-6 mb-2">Upcoming</h2>
          {renderAppointments(upcomingAppointments)}
        </>
      )}

      {validAppointments.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No upcoming appointments
        </p>
      )}
    </div>
  );
};

export default DoctorAppointments;