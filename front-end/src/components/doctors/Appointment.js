"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { assets } from "@/assets/assets";
import Image from "next/image";
import RelatedDoctors from "./RelatedDoctors";

const Appointment = () => {
  const { doctors } = useSelector((state) => state.doctors);
  const params = useParams();
  const { id } = params;
    const doctor = doctors.find((doc) => doc._id === id);
    const { doctorSpeciality } = doctor.speciality
    console.log('doctor speciality is; ', doctorSpeciality)
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [doctorUnavailableNow, setDoctorUnavailableNow] = useState(false);

  const getAvailableSlot = async () => {
    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const slotDate = new Date(today);
      slotDate.setDate(today.getDate() + i);

      const currentDate = new Date(slotDate);

      if (i === 0) {
        const now = new Date();
        const currentHour = now.getHours();

        if (currentHour < 10 || currentHour >= 21) {
          setDoctorUnavailableNow(true);
          allSlots.push([]); // empty slot for today
          continue;
        } else {
          setDoctorUnavailableNow(false);
        }

        now.setMinutes(now.getMinutes() + 30);
        now.setSeconds(0);
        now.setMilliseconds(0);

        const minutes = now.getMinutes();
        now.setMinutes(minutes <= 30 ? 30 : 0);
        if (minutes > 30) {
          now.setHours(now.getHours() + 1);
        }

        currentDate.setHours(now.getHours());
        currentDate.setMinutes(now.getMinutes());
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
      }

      const endTime = new Date(slotDate);
      endTime.setHours(21, 0, 0, 0);

      const timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    if (doctor) {
      getAvailableSlot();
    }
  }, [doctor]);

  useEffect(() => {
    if (docSlots.length > 0) {
      setSlotIndex(0);
      if (docSlots[0] && docSlots[0].length > 0) {
        setSlotTime(docSlots[0][0].time);
      }
    }
  }, [docSlots]);

  return (
    <div className="flex flex-col gap-5 justify-center">
      {/* Doctor Info */}
      <div className="flex flex-row sm:flex-row gap-5 my-10 mx-4">
        <div>
          <Image
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-auto shadow-md bg-blue-50 border border-blue-200 rounded-lg"
          />
        </div>
        <div className="flex-1 justify-start items-center leading-loose">
          <div className="border border-blue-200 rounded-lg px-8 py-6 gap-4 mr-5">
            <h1 className="flex items-center gap-3 font-bold text-2xl text-gray-700 mb-4">
              {doctor.name}
              <Image
                src={assets.verified_icon}
                alt="verified icon"
                width={20}
                height={20}
              />
            </h1>
            <div className="flex flex-row gap-3 text-sm text-gray-500 font-semibold">
              <p>
                {doctor.degree} - {doctor.speciality} -
              </p>
              <button className="py-0.5 rounded-full px-2 border border-gray-500">
                {doctor.experience}
              </button>
            </div>
            <p className="text-gray-700 text-md">{doctor.about}</p>
            <p className="font-semibold text-gray-600 text-sm mt-4">
              Appointment fees - <span>${doctor.fees}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Available Days */}
      <div className="flex flex-row gap-8 sm:ml-72">
              {
                  docSlots.map((slot, index) => {
            const hasSlot = slot.length > 0;

            return (
                <div
                key={index}
                onClick={() => {
                    setSlotIndex(index);
                    if (hasSlot) setSlotTime(slot[0].time);
                }}
                className={`flex justify-center items-center bg-blue-50 rounded-lg flex-col  
                    px-6 py-2 my-3 transition-all duration-500 cursor-pointer
                    ${slotIndex === index ? "bg-blue-400 text-white font-bold" : ""}`}
                >
                <h1>{index === 0 ? "Today" : hasSlot ? weekDays[slot[0].dateTime.getDay()] : "N/A"}</h1>
                <h1>{hasSlot ? slot[0].dateTime.getDate() : "--"}</h1>
                </div>
            );
            })}

      </div>

      {/* Available Time Slots */}
      <h1 className="text-xl font-bold mt-6 ml-10">Available Time Slots</h1>

      {slotIndex === 0 && doctorUnavailableNow ? (
        <p className="text-red-500 ml-10 mt-2">
          Doctor is not available right now. Please select another day.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4 mt-4 ml-10">
            {
               docSlots[slotIndex]?.map((slot, idx) => (
            <div
              key={idx}
              onClick={() => setSlotTime(slot.time)}
              className={`px-4 py-2 border border-blue-400 rounded-md cursor-pointer 
                transition-all duration-300
                ${
                  slotTime === slot.time
                    ? "bg-blue-400 text-white"
                    : "bg-white text-blue-500"
                }`}
            >
              {slot.time}
            </div>
          ))}
        </div>
          )}
          <button className="flex items-center sm:ml-71 justify-center text-sm cursor-pointer mt-7 py-3 px-14 text-white bg-blue-500 font-semibold rounded-full w-auto sm:max-w-80">Book an appointment</button>
          <hr />
          {/* related doctors part */} 
          <h1>doctor speialit yis: {doctor.speciality}</h1>
          <RelatedDoctors speciality={doctor.speciality}  />
      </div>
  );
};

export default Appointment;
