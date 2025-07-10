"use client"
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import DoctorBlock from './DoctorBlock';
import Link from 'next/link';
import Image from 'next/image';
const RelatedDoctors = ({ speciality , docId}) => {

  const [relatedDoctors, setRelatedDoctors] = useState([])

    const { doctors } = useSelector((state) => state.doctors)

  useEffect(() => {

    if (doctors.length > 0 && docId && speciality) {
      
      setRelatedDoctors(
        doctors.filter((doc) => doc.speciality === speciality && 
          doc._id !== docId //docId i used to not show this doctor with the related doctors ,
                            //because this doctor is already displayed in the appointment's page 
        ))
    }
      
    }, [speciality, docId])
  
    
  return (
    <div className="flex flex-col items-center my-14">
        <h1 className="text-gray-900 text-3xl font-semibold my-2">
            Related doctors to {speciality} to book
        </h1>
        <p className="text-gray-800 text-sm py-4">
            Simply browse through our extensive list of trusted doctors.
        </p>
        
        <div className="w-full px-3 sm:px-0">
            <div className="lg:mx-20 xl:mx-20 sm:mx-10 my-3 max-w-7xl px-5 xl:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {
                    relatedDoctors.length > 0 &&
                    relatedDoctors.map((doctor, index) => (
                      <DoctorBlock
                        doctor={doctor} 
                        key={index}
                      />
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

export default RelatedDoctors
