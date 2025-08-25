"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const DoctorBlock = ({ doctor }) => {
    const router = useRouter();
    
  return (
    <div 
        className="border border-blue-200 rounded-lg cursor-pointer hover:translate-y-[-10px] duration-500 transition-all overflow-hidden"
        >
        <Link href={`/doctors/${doctor._id}`}>
            <Image
                src={doctor.image}
                alt={doctor.name}
                width={150}
                height={300}
                className="bg-blue-50 rounded-lg w-full"
            /> 
        </Link>
    <div className="flex flex-col justify-start p-4">
        <div className=" flex flex-row gap-2 doctors-center">
        <p className="w-2 h-2 rounded-full bg-green-500"></p>
        <p className="text-green-500 font-light text-xs">
            Available
        </p>
        </div>
        <p className="text-[17px] font-semibold py-1">{doctor.name}</p>
        <p className="text-[13px] font-light py-1 text-gray-600">{doctor.speciality}</p>
    </div>
</div>
  )
}

export default DoctorBlock
