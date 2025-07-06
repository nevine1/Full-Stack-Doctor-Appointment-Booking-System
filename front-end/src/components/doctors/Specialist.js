"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';
const Specialist = () => {
  const params = useParams();
  const { specialist } = params;
  const { doctors } = useSelector((state) => state.doctors);
  const [filterDoc, setFilterDoc] = useState([])
  
  const applyFilter = () => {
    if (specialist) {
      
      setFilterDoc(doctors.filter((doc) => doc.speciality === specialist))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {

    applyFilter();

  }, [ doctors, specialist ])

  return (
    <div>
      <p>Browse through the doctors specialist.</p>
      <div className="flex flex-col justify-between gap-14 /* sm:grid grid-cols-[3fr_1fr_1fr] */ ">
        {/* left side */} 
        <div>
          <p>General physician </p>
          <p>Gynecologist</p>
          <p>Dermatologist</p>
          <p>Pediatricians</p>
          <p>Neurologist</p>
          <p>Gastroenterologist</p>
        </div>
        {/* right side  */}
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
          {filterDoc.length > 0 &&
            filterDoc.map((item, index) => (
              <div 
                onClick={() =>router.push(`/doctors/${item._id}`)}
                  key={index}
                   className="border border-blue-200 rounded-lg cursor-pointer hover:translate-y-[-10px] duration-500 transition-all overflow-hidden"
                    >
                    <Link href={`/doctors/${item._id}`}>
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
  )
}

export default Specialist
