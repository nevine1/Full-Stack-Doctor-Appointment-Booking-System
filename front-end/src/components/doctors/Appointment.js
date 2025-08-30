"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { updateDoctorDetails } from "@/store/slices/doctorsSlice";

const Appointment = () => {
  const { doctors } = useSelector((state) => state.doctors);
  const { token, user } = useSelector((state) => state.users);
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const doctor = doctors.find((doc) => doc._id === id);

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
          allSlots.push([]);
          continue;
        } else setDoctorUnavailableNow(false);

        now.setMinutes(now.getMinutes() + 30);
        const minutes = now.getMinutes();
        now.setMinutes(minutes <= 30 ? 30 : 0);
        if (minutes > 30) now.setHours(now.getHours() + 1);

        currentDate.setHours(now.getHours());
        currentDate.setMinutes(now.getMinutes());
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      const endTime = new Date(slotDate);
      endTime.setHours(21, 0, 0, 0);

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({ dateTime: new Date(currentDate), time: formattedTime });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      allSlots.push(timeSlots);
    }
    setDocSlots(allSlots);
  };

  useEffect(() => {
    if (doctor) getAvailableSlot();
  }, [doctor]);

  useEffect(() => {
    if (docSlots.length > 0) {
      setSlotIndex(0);
      if (docSlots[0]?.length > 0) setSlotTime(docSlots[0][0].time);
    }
  }, [docSlots]);

  const bookAppointment = async () => {
    try {
      if (!token) {
        toast.warn("Login to book appointment");
        return router.push("/auth/login");
      }

      if (!docSlots?.[slotIndex]?.length) {
        toast.error("Please select a valid time slot.");
        return;
      }

      const date = docSlots[slotIndex][0].dateTime;
      const slotDate = `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;

      const bookedTimes = doctor?.slots_booked?.[slotDate] || [];
      if (bookedTimes.includes(slotTime)) {
        toast.error("This slot is already booked!");
        return;
      }

      const res = await axios.post(
        `${backUrl}/api/users/book-appointment`,
        { docId: id, userId: user._id, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        const docRes = await axios.get(`${backUrl}/api/doctors/get-doctor/${id}`);
        if (docRes.data.success) {
          dispatch(updateDoctorDetails(docRes.data.data));
        }

        router.push(`/doctors/${id}/appointment`);
      } else {
        toast.error(res.data.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error("Booking Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const date = docSlots[slotIndex]?.[0]?.dateTime;
  const slotDate = date ? `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}` : "";
  const bookedTimes = doctor?.slots_booked?.[slotDate] || [];

  return (
    <div className="flex flex-col gap-5 justify-center w-[60vw]">
      {doctor?.available ? (
        <>
          <h1>Booking appointment for Doctor: {doctor.name}</h1>
          <div className="flex flex-row gap-8 sm:ml-72">
            {docSlots.map((slot, index) => {
              const hasSlot = slot.length > 0;
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    if (hasSlot) setSlotTime(slot[0].time);
                  }}
                  className={`flex justify-center items-center bg-blue-50 rounded-lg flex-col px-6 py-2 my-3 transition-all duration-500 cursor-pointer ${
                    slotIndex === index ? "bg-blue-400 text-white font-bold" : ""
                  }`}
                >
                  <h1>{index === 0 ? "Today" : hasSlot ? weekDays[slot[0].dateTime.getDay()] : "N/A"}</h1>
                  <h1>{hasSlot ? slot[0].dateTime.getDate() : "--"}</h1>
                </div>
              );
            })}
          </div>

          <h1 className="text-xl font-bold mt-6 ml-10">Available Time Slots</h1>
          {slotIndex === 0 && doctorUnavailableNow ? (
            <p className="text-red-500 ml-10 mt-2">
              Doctor is not available right now. Please select another day.
            </p>
          ) : (
            <div className="flex flex-wrap gap-4 mt-4 ml-10">
              {docSlots[slotIndex]?.map((slot, idx) => {
                const isBooked = bookedTimes.includes(slot.time);
                return (
                  <div
                    key={idx}
                    onClick={() => !isBooked && setSlotTime(slot.time)}
                    className={`px-4 py-2 border border-blue-400 rounded-md transition-all duration-300 ${
                      isBooked
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : slotTime === slot.time
                        ? "bg-blue-400 text-white"
                        : "bg-white text-blue-500 cursor-pointer"
                    }`}
                  >
                    {slot.time}
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={bookAppointment}
            className="flex items-center sm:ml-71 justify-center text-sm cursor-pointer my-7 py-3 px-14 text-white bg-blue-500 font-semibold rounded-lg w-auto sm:max-w-80"
          >
            Book This appointment
          </button>
        </>
      ) : (
        <div>
          <p className="flex justify-center text-[20px] mt-30 items-center mx-30">
            Sorry, doctor {doctor.name} is not available for booking an appointment, please try again later!
          </p>
          <p className="flex justify-center text-[20px] mt-30 items-center mx-30">
            Book with another
            <span onClick={() => router.push("/doctors")} className="text-blue-500 underline cursor-pointer">
              doctor
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Appointment;
