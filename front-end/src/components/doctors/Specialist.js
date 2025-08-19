"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import _ from 'lodash';

const Specialist = () => {
  const params = useParams();
  const router = useRouter();
  const { specialist } = params;
  const { doctors } = useSelector((state) => state.doctors);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter ] = useState(false)
  const [selectedSpecialist , setSelectedSpecialist ] = useState(specialist)

  //getting the specilities 
  const specialities = [
    ...new Set(doctors.map(doctor => doctor.speciality))
  ];
  
  const applyFilter = (specialist) => {
    if (specialist) {
      
      setFilterDoc(doctors.filter((doc) => doc.speciality === specialist));
      
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter(specialist);
  }, [doctors, specialist]);
 
 
  return (
    <div>
      <p className="m-4">Browse through the doctors specialist.</p>
      <h1 className="flex justify-center m-5">Selected specialist is: {specialist}</h1>
      <div className=" grid grid-cols-[1fr_3fr]  gap-8">
        {/* left side */} 
       
        <div>
          {
            specialities.map((spec, index) => (

              <div key={index} className="  px-4 py-1">
                <h1 className={`text-sm py-3 px-5 my-1 border border-blue-200 shadow-md
                          cursor-pointer transition-all duration-500 rounded-sm
                  ${ spec === selectedSpecialist ? "bg-blue-500 text-white font-semibold" : ""}`}
                  onClick={() => router.push(`/doctors/specialist/${spec}`)}
                >{spec}</h1>
              </div>
            ))
          }
        </div>
       
        {/* right side  */}
       
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
          {filterDoc.length > 0 &&
            filterDoc.map((item, index) => (
              <div 
                onClick={() =>router.push(`/auth/appointment/${item._id}`)}
                  key={index}
                   className="border border-blue-200 rounded-lg cursor-pointer hover:translate-y-[-10px] duration-500 transition-all overflow-hidden"
                    >
                    <Link href={`/auth/appointment/${item._id}`}>
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
  );
}

export default Specialist
