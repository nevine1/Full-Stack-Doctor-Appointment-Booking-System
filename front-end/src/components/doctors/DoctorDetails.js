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
