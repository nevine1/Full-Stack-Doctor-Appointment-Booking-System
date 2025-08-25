"use client"
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllDoctors } from '@/store/slices/doctorAsync';
const TopDoctors = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { doctors } = useSelector((state) => state.doctors)
   

    useEffect(() => {
        if (doctors.length === 0) {
            fetchAllDoctors(dispatch)
        }
    }, [dispatch, doctors.length])

    
  return (
    <div className="flex flex-col items-center my-14">
        <h1 className="text-gray-900 text-3xl font-semibold my-2">
            Top Doctors to Book
        </h1>
        <p className="text-gray-800 text-sm py-4">
            Simply browse through our extensive list of trusted doctors.
        </p>
        
        <div className="w-full px-3 sm:px-0">
            <div className="lg:mx-20 xl:mx-20 sm:mx-10 my-3 max-w-7xl px-5 xl:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {doctors.length > 0 &&
                    doctors.slice(0,10).map((item, index) => (
                    <div 
                        onClick={() =>router.push(`/doctors/${item?._id}`)}
                        key={index}
                        className="border border-blue-200 rounded-lg cursor-pointer hover:translate-y-[-10px] duration-500 transition-all overflow-hidden"
                            >
                       
                        <Link href={`/doctors/${item?._id}`}>
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={150}
                                height={300}
                                className="bg-blue-50 rounded-lg w-full"
                            /> 
                        </Link>
                        <div className="flex flex-col justify-start p-4">
                            <div className=" flex flex-row gap-2 items-center">
                            <p className="w-2 h-2 rounded-full bg-green-500"></p>
                            <p className="text-green-500 font-light text-xs">
                                Available
                            </p>
                            </div>
                            <p className="text-[17px] font-semibold py-1">{item.name}</p>
                            <p className="text-[13px] font-light py-1 text-gray-600">{item.speciality}</p>
                        </div>
                    </div>
                    ))}
                                
                </div>
            
            </div>
          </div>
          <Link href="/doctors"
                className=" mt-10 px-6 py-2 bg-blue-50 text-gray-600 text-md rounded-full cursor-pointer border
             border-blue-200"
             >More</Link> 
</div>

  )
}

export default TopDoctors
