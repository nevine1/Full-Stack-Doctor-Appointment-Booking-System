
"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
const page = () => {
    const { doctorToken } = useSelector((state) => state.doctors)
    console.log('doctor token at doctor page', doctorToken)
  return (
      <div>
          <p>Doctors page loginnnnnnnnnnnnnnnnnnnnnnnnnnn</p>
    </div>
  )
}

export default page