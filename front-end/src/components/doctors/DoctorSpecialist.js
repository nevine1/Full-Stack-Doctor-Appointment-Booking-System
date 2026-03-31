"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import Image from "next/image"
import Link from "next/link"

const DoctorSpecialist = () => {

    const router = useRouter()
    const { doctors } = useSelector((state) => state.doctors)

    const [filterDoc, setFilterDoc] = useState([])
    const [selectedSpecialist, setSelectedSpecialist] = useState("")

    // استخراج كل التخصصات بدون تكرار
    const specialities = [...new Set(doctors.map((doc) => doc.speciality))]

    // فلترة الدكاترة
    const applyFilter = (spec) => {
        if (spec) {
            const filtered = doctors.filter((doc) => doc.speciality === spec)
            setFilterDoc(filtered)
        } else {
            setFilterDoc(doctors)
        }
    }


    useEffect(() => {
        if (doctors.length > 0) {
            setFilterDoc(doctors)
        }
    }, [doctors])

    return (
        <div className="px-4 md:px-10">

            <p className="my-6 text-gray-600">
                Browse through the doctors specialist.
            </p>

            <div className="flex flex-col md:flex-row gap-8">

                {/* left side */}
                <div className="md:w-1/4">

                    <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">

                        {specialities.map((spec) => (

                            <button
                                key={spec}
                                onClick={() => {
                                    setSelectedSpecialist(spec)
                                    applyFilter(spec)
                                    router.push(`/doctors/specialist/${spec}`)
                                }}
                                className={`whitespace-nowrap text-sm py-2 px-5 border border-blue-200 rounded-md transition
                ${spec === selectedSpecialist
                                        ? "bg-blue-500 text-white font-semibold"
                                        : "hover:bg-blue-50"
                                    }`}
                            >
                                {spec}
                            </button>

                        ))}

                    </div>

                </div>

                {/* right side */}
                <div className="md:w-3/4">

                    <div className="grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                        gap-6">

                        {filterDoc.map((item) => (

                            <div
                                key={item._id}
                                onClick={() => router.push(`/doctors/${item._id}/appointment`)}
                                className="border border-blue-200 rounded-lg cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                            >

                                <Link href={`/doctors/${item._id}/appointment`}>

                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={300}
                                        height={200}
                                        className="bg-blue-50 w-full h-[220px] object-cover"
                                    />

                                </Link>

                                <div className="p-4">

                                    <div className="flex items-center gap-2">

                                        <span
                                            className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-400"
                                                }`}
                                        />

                                        <p
                                            className={`text-xs ${item.available ? "text-green-500" : "text-gray-400"
                                                }`}
                                        >
                                            {item.available ? "Available" : "Unavailable"}
                                        </p>

                                    </div>

                                    <p className="text-lg font-semibold mt-2">
                                        {item.name}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        {item.speciality}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default DoctorSpecialist