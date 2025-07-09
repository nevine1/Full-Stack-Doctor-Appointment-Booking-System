"use client"
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import DoctorImage from '../homePage/DoctorImage'
const RelatedDoctors = ({ speciality }) => {
    const { doctors } = useSelector((state) => state.doctors)
    const [relatedDoctors, setRelatedDoctors ] = useState([])
   

    useEffect(() => {
        setRelatedDoctors(doctors.filter((doc) => doc.speciality === speciality))
    }, [speciality])
    console.log('related doctora are: ', relatedDoctors)
  return (
    <div>
          {
              relatedDoctors.map((doctor, index) => (
                  <div key={index}>
                      <DoctorImage doctor={doctor}  />
                  </div>
              ))
      }
    </div>
  )
}

export default RelatedDoctors
