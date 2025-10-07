"use client"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Image from 'next/image'
const DoctorProfile = () => {
    const { doctorToken } = useSelector((state) => state.doctors)
    const [doctor, setDoctor ] = useState({})
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const getDoctorProfile = async () => {
        try {
            const res = await axios.get(`${backUrl}/api/doctors/doctor-profile`, {
                headers: {
                    authorization: `Bearer ${doctorToken}`
                }
            })

            if (res.data.success) {
                setDoctor(res.data.data)
                console.log('doctor info ois', res.data.data)
            }

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (doctorToken) {
            getDoctorProfile()
        }
    }, [doctorToken])
    return (
        <div>
            <Image
                src={doctor.image}
                alt={`doctor ${doctor.name} image `}
                width={200}
                height={200}
            />
            <h1>{doctor.name}</h1>
            <p>{doctor.about}</p>
            <p>{doctor.speciality}</p>
        </div>
    )
}

export default DoctorProfile;