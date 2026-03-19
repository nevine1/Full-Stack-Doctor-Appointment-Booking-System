"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllDoctors } from "@/store/slices/doctorAsync"

const TopDoctors = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { doctors } = useSelector((state) => state.doctors)

    useEffect(() => {
        dispatch(fetchAllDoctors())
    }, [dispatch])

    return (
        <div className="flex flex-col items-center my-14 px-4 sm:px-6 lg:px-20">
            <h1 className="text-gray-900 text-3xl md:text-4xl font-semibold mb-2 text-center">
                Top Doctors to Book
            </h1>
            <p className="text-gray-800 text-sm md:text-base text-center py-4 max-w-2xl">
                Simply browse through our extensive list of trusted doctors.
            </p>

            <div className="w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {doctors.length > 0 &&
                        doctors.slice(0, 10).map((doctor) => (
                            <div
                                key={doctor._id}
                                onClick={() => router.push(`/doctors/${doctor._id}`)}
                                className="border border-blue-200 rounded-lg cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                            >
                                <Link href={`/doctors/${doctor._id}`}>
                                    <Image
                                        src={doctor.image || "/placeholder-doctor.png"}
                                        alt={doctor.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-[200px] object-cover bg-blue-50"
                                    />
                                </Link>

                                <div className="flex flex-col justify-start p-4">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-3 h-3 rounded-full ${doctor.available ? "bg-green-500" : "bg-gray-400"
                                                }`}
                                        />
                                        <span
                                            className={`text-xs font-light ${doctor.available ? "text-green-500" : "text-gray-400"
                                                }`}
                                        >
                                            {doctor.available ? "Available" : "Unavailable"}
                                        </span>
                                    </div>

                                    <p className="text-[17px] font-semibold py-1">{doctor.name}</p>
                                    <p className="text-[13px] font-light py-1 text-gray-600">
                                        {doctor.speciality}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <Link
                href="/doctors"
                className="mt-10 px-6 py-2 bg-blue-500 text-white text-md rounded-full cursor-pointer border border-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 transition"
            >
                More
            </Link>
        </div>
    )
}

export default TopDoctors