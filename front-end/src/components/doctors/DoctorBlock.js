"use client"

import Link from "next/link"
import Image from "next/image"

const DoctorBlock = ({ doctor }) => {

    return (
        <Link href={`/doctors/${doctor._id}`} className="block h-full">

            <div className="border border-blue-200 rounded-xl overflow-hidden bg-white
      hover:-translate-y-2 hover:shadow-lg transition-all duration-300 h-full">



                <div className="relative w-full h-[220px] sm:h-[240px] md:h-[260px] bg-blue-50">
                    <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                    />
                </div>



                <div className="p-4 flex flex-col gap-2">

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <p className="text-green-500 text-xs font-light">
                            Available
                        </p>
                    </div>

                    <p className="text-base sm:text-lg font-semibold">
                        {doctor.name}
                    </p>

                    <p className="text-sm text-gray-600">
                        {doctor.speciality}
                    </p>

                </div>

            </div>

        </Link>
    )
}

export default DoctorBlock