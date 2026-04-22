
"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import DashboardLayout from '@/components/DashboardLayout'
const page = () => {
  const { doctorToken } = useSelector((state) => state.doctors)
  console.log('doctor token at doctor page', doctorToken)
  return (
    <div>
      <h1>This is doctor page </h1>
    </div>
  )
}

export default page