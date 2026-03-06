"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { updateDoctorDetails } from "@/store/slices/doctorsSlice";

const Appointment = () => {
  const { id } = useParams();

  const { doctors } = useSelector((state) => state.doctors);
  const { userToken } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const doctor = doctors.find((doc) => doc._id === id);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");


  const getAvailableSlots = () => {
    if (!doctor) return;

    const today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() + 1);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let daySlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const slotDate =
          currentDate.getDate() +
          "-" +
          (currentDate.getMonth() + 1) +
          "-" +
          currentDate.getFullYear();

        const isSlotBooked =
          doctor.slots_booked?.[slotDate]?.includes(formattedTime);

        if (!isSlotBooked) {
          daySlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(daySlots);
    }

    setDocSlots(allSlots);
  };


  const bookAppointment = async () => {
    if (!userToken) {
      toast.error("Please login first");
      return;
    }

    try {
      const date = docSlots?.[slotIndex]?.[0]?.dateTime;

      if (!date || !slotTime) {
        toast.error("Please select slot");
        return;
      }

      const slotDate =
        date.getDate() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getFullYear();

      const { data } = await axios.post(
        `${backUrl}/api/users/book-appointment`,
        {
          doctorId: id,
          slotDate,
          slotTime,
        },
        {
          headers: { token: userToken },
        }
      );

      if (data.success) {
        toast.success(data.message);

        dispatch(
          updateDoctorDetails({
            ...doctor,
            slots_booked: {
              ...doctor.slots_booked,
              [slotDate]: [
                ...(doctor.slots_booked?.[slotDate] || []),
                slotTime,
              ],
            },
          })
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  useEffect(() => {
    if (doctor) getAvailableSlots();
  }, [doctor]);



  if (!doctor) {
    return (
      <div className="text-center mt-20 text-lg font-medium">
        Loading doctor...
      </div>
    );
  }



  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Doctor Info */}

      <div className="flex flex-col md:flex-row gap-8">

        <Image
          src={doctor.image}
          alt={doctor.name}
          width={300}
          height={300}
          className="rounded-xl object-cover w-full md:w-[300px]"
        />

        <div className="flex flex-col gap-3">

          <h2 className="text-2xl font-bold">{doctor.name}</h2>

          <p className="text-gray-600">
            {doctor.degree} - {doctor.speciality}
          </p>

          <p className="text-gray-500">{doctor.experience} years experience</p>

          <p className="text-gray-600 mt-3">{doctor.about}</p>

          <p className="font-medium mt-3">
            Appointment Fee:{" "}
            <span className="text-blue-600">${doctor.fees}</span>
          </p>

          <p
            className={`font-medium ${doctor.available ? "text-green-600" : "text-red-600"
              }`}
          >
            {doctor.available ? "Available" : "Not Available"}
          </p>
        </div>
      </div>

      {/* Booking Slots */}

      <div className="mt-12">

        <h3 className="text-xl font-semibold mb-6">
          Booking Slots
        </h3>

        {/* Days */}

        <div className="flex gap-3 overflow-x-auto pb-3">

          {docSlots.map((item, index) => {
            if (!item.length) return null;

            const date = item[0].dateTime;

            return (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`cursor-pointer px-5 py-4 rounded-lg border min-w-[80px] text-center ${slotIndex === index
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                  }`}
              >
                <p className="text-sm">
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>

                <p className="text-lg font-semibold">
                  {date.getDate()}
                </p>
              </div>
            );
          })}
        </div>

        {/* Times */}

        <div className="flex gap-3 overflow-x-auto mt-6 pb-3">

          {docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`cursor-pointer px-4 py-2 rounded-full border text-sm ${item.time === slotTime
                  ? "bg-blue-600 text-white"
                  : ""
                }`}
            >
              {item.time}
            </p>
          ))}
        </div>

        {/* Book Button */}

        <button
          onClick={bookAppointment}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition w-full sm:w-auto"
        >
          Book Appointment
        </button>

      </div>
    </div>
  );
};

export default Appointment;