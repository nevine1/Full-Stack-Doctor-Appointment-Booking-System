
"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import Dashboard from '@/components/doctor/Dashboard'
const page = () => {
  const { doctorToken } = useSelector((state) => state.doctors)
  console.log('doctor token at doctor page', doctorToken)
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default page