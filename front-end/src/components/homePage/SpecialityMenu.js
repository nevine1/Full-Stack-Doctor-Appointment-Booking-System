"use client"

import Link from "next/link"
import Image from "next/image"
import { specialityData } from "@/assets/assets"

const SpecialityMenu = () => {

  return (
    <div id="speciality" className="flex flex-col items-center mt-20 mb-10 px-6">

      <h1 className="text-gray-900 text-3xl font-semibold mb-4">
        Find by Speciality
      </h1>

      <p className="text-gray-600 text-center max-w-xl">
        Simply browse through our extensive list of trusted doctors,
        <br className="hidden sm:block" />
        schedule your appointment hassle-free.
      </p>




      <div className="
          grid
          grid-cols-3
          sm:grid-cols-4
          md:grid-cols-5
          lg:grid-cols-6
          gap-6
          mt-10
          max-w-5xl
          ">

        {specialityData.map((spec, index) => (

          <Link
            key={index}
            href={`/doctors/specialist/${spec.speciality}`}
            onClick={() => window.scrollTo(0, 0)}
            className="
            flex flex-col items-center
            text-center
            hover:-translate-y-2
            transition duration-300
            "
          >

            <Image
              src={spec.image}
              alt={spec.speciality}
              width={80}
              height={80}
              className="
              w-16 sm:w-20
              bg-blue-50
              rounded-full
              p-3
              shadow-sm
              "
            />

            <p className="text-sm mt-3 font-medium text-gray-700">
              {spec.speciality}
            </p>

          </Link>

        ))}

      </div>

    </div>
  )
}

export default SpecialityMenu