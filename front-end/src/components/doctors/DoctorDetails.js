"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
const DoctorDetails = () => {
    const params = useParams();
    const { id } = params 
    const { doctors } = useSelector((state) => state.doctors)
    const doctor = doctors.find((doc) => doc._id === id)
    console.log('here is the doctor id ', id)
    console.log('doctor here id:', doctor)
  return (
    <div>
      <Link href={`/appointment/${id}`}>Appoinment</Link>
          <h1>{doctor.name}</h1>
          <Image
              src={doctor.image}
              alt={doctor.name}
              width={100}
              height={100}
              className="w-full h-full "
          />
    </div>
  )
}

export default DoctorDetails
