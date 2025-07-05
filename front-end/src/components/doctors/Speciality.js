"use client"
import React from 'react'
import { useParams } from 'next/navigation'
const Speciality = () => {
    const params = useParams();
    const { speciality } = params 
    console.log('hello speciality is:', speciality)
  return (
      <div>
          <h1 className="mb-36">this page is for speciallityyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy</h1>
          <h1>hi </h1>
    </div>
  )
}

export default Speciality