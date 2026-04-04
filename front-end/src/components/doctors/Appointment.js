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
  const { token } = useSelector((state) => state.users);
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

      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday

      // ❌ Sunday OFF
      if (dayOfWeek === 0) {
        allSlots.push([]);
        continue;
      }

      let startTime = new Date(currentDate);
      let endTime = new Date(currentDate);

      // 🟡 Saturday (10:30 → 2:30)
      if (dayOfWeek === 6) {
        startTime.setHours(10, 30, 0, 0);
        endTime.setHours(14, 30, 0, 0);
      } else {
        // 🟢 باقي الأيام
        if (i === 0) {
          startTime.setHours(startTime.getHours() + 1);
          startTime.setMinutes(startTime.getMinutes() > 30 ? 30 : 0);
        } else {
          startTime.setHours(10, 0, 0, 0);
        }

        endTime.setHours(21, 0, 0, 0);
      }

      let daySlots = [];

      while (startTime < endTime) {
        const formattedTime = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const slotDate =
          startTime.getDate() +
          "-" +
          (startTime.getMonth() + 1) +
          "-" +
          startTime.getFullYear();

        const isSlotBooked =
          doctor.slots_booked?.[slotDate]?.includes(formattedTime);

        if (!isSlotBooked) {
          daySlots.push({
            dateTime: new Date(startTime),
            time: formattedTime,
          });
        }

        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      allSlots.push(daySlots);
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const selectedSlot = docSlots?.[slotIndex]?.find(
        (slot) => slot.time === slotTime
      );

      const date = selectedSlot?.dateTime;

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
          docId: id,
          slotDate,
          slotTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
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

          <p className="text-gray-500">
            {doctor.experience} years experience
          </p>

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

      {/* Booking Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6">Booking Days</h3>

        {/* Days */}
        <div className="flex gap-3 flex-wrap pb-3">
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

                <p className="text-lg font-semibold">{date.getDate()}</p>
              </div>
            );
          })}
        </div>

        {/* Times Title */}
        <div className="mt-12">
          <h3 className="text-xl text-blue-500 font-semibold mb-6">
            Available Times for{" "}
            {docSlots[slotIndex]?.[0]?.dateTime?.toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                month: "long",
                day: "numeric",
              }
            )}
          </h3>
        </div>

        {/* Times */}
        <div className="flex flex-wrap gap-3 mt-6">
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`cursor-pointer px-4 py-2 rounded-full border text-sm ${item.time === slotTime
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-blue-100"
                }`}
            >
              {item.time}
            </p>
          ))}
        </div>

        {/* Button */}
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