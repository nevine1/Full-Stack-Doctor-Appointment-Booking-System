"use client";
import { useEffect, useState } from "react";
import { useParams , useRouter} from "next/navigation";
import { useSelector } from "react-redux";
import { assets } from "@/assets/assets";
import Image from "next/image";
import RelatedDoctors from "./RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { doctors } = useSelector((state) => state.doctors);
  const { token } = useSelector((state) => state.users)
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  console.log('the doctor is  is;', id)
  const doctor = doctors.find((doc) => doc._id === id);
  console.log('doctors detail is :', doctor)
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


 const bookAppointment = async () => {
  try {
    if (!token) {
      toast.warn("Login to book appointment");
      return router.push('/auth/login');
    }

    const date = docSlots[slotIndex][0].dateTime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const slotDate = `${day} - ${month} - ${year}`;

    console.log('Appointment slot date is: ', slotDate);

    const res = await axios.post(
      `${backUrl}/api/users/book-appointment`,
      { id, slotDate, slotTime },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      router.push(`/doctors/${id}/appointment`);
    } else {
      toast.error(res.data.message || "Failed to book appointment");
    }
  } catch (err) {
    console.error("Booking Error:", err);
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="flex flex-col gap-5 justify-center">
      {/* Doctor Info */}
      <div className="flex flex-row sm:flex-row gap-5 my-10 mx-4">
        <div>
          <Image
            src={doctor?.image || "/assets/profile_pic.png"}
            alt="doctor image"
            width={300}
            height={350}
            className="w-full h-auto shadow-md bg-blue-500 border border-blue-200 rounded-lg"
          />
        </div>
        <div className="flex-1 justify-start items-center leading-loose">
          <div className="border border-blue-200 rounded-lg px-8 py-6 gap-4 mr-5">
            <h1 className="flex items-center gap-3 font-bold text-2xl text-gray-700 mb-4">
              {doctor ? doctor.name : "doctor name"}
              <Image
                src={assets.verified_icon}
                alt="verified icon"
                width={20}
                height={20}
              />
            </h1>
            <div className="flex flex-row gap-3 text-sm text-gray-500 font-semibold">
              <p>
                {doctor ? doctor.degree : " "} - {doctor? doctor.speciality : ""} -
              </p>
              <button className="py-0.5 rounded-full px-2 border border-gray-500">
                {doctor ?  doctor.experience : " "}
              </button>
            </div>
            <p className="text-gray-700 text-md">{doctor ?  doctor.about : ""}</p>
            <p className="font-semibold text-gray-600 text-sm mt-4">
              Appointment fees - <span>${doctor ? doctor.fees : ""}</span>
            </p>
          </div>
        </div>
      </div>

      {
        token && (
          <button
          onClick={() => router.push(`/doctors/${doctor._id}/appointment`)}
          className="flex items-center sm:ml-71 justify-center text-sm cursor-pointer
            my-7 py-3 px-14 text-white bg-blue-500 font-semibold rounded-full w-auto sm:max-w-80"
        >Book an appointment
      </button>
        )
      }
      
     
          
      {/* related doctors part */} 
      
      <div className="flex flex-col mt-8 items-center">
      
        {
          doctor && (
            <RelatedDoctors
              speciality={doctor.speciality}
              docId={doctor._id}
            />
          )
        }
      </div>
          
      </div>
  );
};

export default Appointment;
