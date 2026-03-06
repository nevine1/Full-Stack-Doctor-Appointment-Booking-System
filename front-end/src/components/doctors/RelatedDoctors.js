"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import DoctorBlock from "./DoctorBlock"
import Link from "next/link"

const RelatedDoctors = ({ speciality, docId }) => {

  const [relatedDoctors, setRelatedDoctors] = useState([])

  const { doctors } = useSelector((state) => state.doctors)

  useEffect(() => {

    if (doctors.length && speciality && docId) {

      const filteredDoctors = doctors.filter(
        (doc) =>
          doc.speciality === speciality &&
          doc._id !== docId
      )

      // limit to 5 doctors
      setRelatedDoctors(filteredDoctors.slice(0, 5))
    }

  }, [speciality, doctors, docId])

  return (

    <div className="flex flex-col items-center mt-12 mb-20 px-4">


      <h1 className="text-gray-900 text-xl md:text-2xl font-semibold text-center">
        Related Doctors ({speciality})
      </h1>

      <p className="text-gray-600 text-sm md:text-base py-4 text-center max-w-xl">
        Simply browse through our extensive list of trusted doctors.
      </p>



      <div className="w-full max-w-7xl">

        <div
          className="grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-6"
        >

          {relatedDoctors.map((doctor) => (
            <DoctorBlock
              key={doctor._id}
              doctor={doctor}
            />
          ))}

        </div>

      </div>



      <Link
        href="/doctors"
        className="mt-10 px-6 py-3 bg-blue-50 text-gray-700 border border-blue-200 rounded-full hover:bg-blue-100 transition"
      >
        View All Doctors
      </Link>

    </div>
  )
}

export default RelatedDoctors