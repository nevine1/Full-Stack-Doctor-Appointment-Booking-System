"use client"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
const DoctorProfile = () => {
    const { doctorToken } = useSelector((state) => state.doctors)
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    return (
        <div>Doctor profile</div>
    )
}

export default DoctorProfile;