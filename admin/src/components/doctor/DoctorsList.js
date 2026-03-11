"use client"
import React from 'react'

const DoctorsList = () => {
    const { doctors } = useSelector((state) => state.doctors)
    return (
        <div>
            <h1>Doctors listttttttttt</h1>
        </div>
    )
}

export default DoctorsList
