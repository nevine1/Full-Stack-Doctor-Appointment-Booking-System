"use client"

import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"

const DoctorsList = () => {

  const { doctors } = useSelector((state) => state.doctors)

  return (
    <div className="flex flex-col items-center mt-10 mb-20 px-4">

      <h1 className="text-gray-900 text-2xl md:text-3xl font-semibold text-center">
        Top Doctors to Book
      </h1>

      <p className="text-gray-600 text-sm md:text-base py-4 text-center max-w-xl">
        Simply browse through our extensive list of trusted doctors.
      </p>



      <div className="w-full max-w-7xl">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          {doctors.slice(0, 10).map((doctor) => (

            <div
              key={doctor._id}
              className="border border-blue-200 rounded-xl overflow-hidden
              hover:-translate-y-2 hover:shadow-lg transition-all duration-300 bg-white"
            >



              <Link href={`/doctors/${doctor._id}`}>
                <div className="relative w-full h-[220px] bg-blue-50">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>



              <div className="p-4">

                <div className="flex items-center gap-2">

                  <span
                    className={`w-2 h-2 rounded-full ${doctor.available ? "bg-green-500" : "bg-gray-400"
                      }`}
                  ></span>

                  <p
                    className={`text-xs font-light ${doctor.available ? "text-green-500" : "text-gray-500"
                      }`}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </p>

                </div>

                <p className="text-lg font-semibold mt-2">
                  {doctor.name}
                </p>

                <p className="text-sm text-gray-600">
                  {doctor.speciality}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* <Link
        href="/doctors"
        className="mt-10 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        View All Doctors
      </Link> */}

    </div>
  )
}

export default DoctorsList