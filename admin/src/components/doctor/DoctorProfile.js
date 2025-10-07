"use client"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Image from 'next/image'
import { assets } from '../../assets/assets'
import { setIsLoading } from '@/store/slices/doctorsSlice'
import Link from 'next/link'

const DoctorProfile = () => {
    const { doctorToken} = useSelector((state) => state.doctors)
    const [doctorData, setDoctorData] = useState({})
    const [isEditable, setIsEditable] = useState(false);
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

    const handleChange = (e) => {
        const [name, value] = e.target;
        setDoctorData((prev) => ({...prev, name: value}))
    }

    const handleUploadImage = (e) => {
        console.log('image uplloaded')
    }
    const updateDoctorProfile = async () => {
        try {
            const res = await axios.post(`${backUrl}/api/doctors/update-doctor-profile`, {
                headers: {
                    authorization: `Bearer ${doctorToken}`
                }
            })
            if (res.data.success) {
                console.log(res.data.data)
                setDoctorData(res.data.data)
            }

        } catch (err) {
            console.log(err.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (doctorToken) {
            getDoctorProfile()
        }
    }, [doctorToken])
    return (
         <div className="flex flex-col  items-center justify-center p-8 w-full min-h-screen">
      {/* Profile image */}

      <div className="mb-6">
        {
          isEditable ? (
            <input
              type="file"
              onChange={handleUploadImage}
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ): (
            <Image
                src={doctorData?.image || assets.profile_pic}
                alt="profile pic"
                width={150}
                height={150}
                className="rounded-full shadow-lg p-2 bg-gray-100"
              />
          )
        }

      </div>

      
      <div className="bg-gray-100 py-5 px-10 rounded-xl border border-gray-300 shadow-lg w-full max-w-md space-y-5">
       
        <div >
          <label className="font-bold text-gray-500">Name</label>
          {isEditable ? (
            <input
              type="text"
              name="name"
              value={doctorData.name || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-1">{doctorData.name}</p>
          )}
        </div>
       
        <div>
          <label className="font-bold text-gray-500">Email</label>
          {isEditable ? (
            <input
              type="email"
              name="email"
              value={doctorData.email || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-1">{doctorData.email}</p>
          )}
        </div>
       
        <div>
          <label className="font-bold text-gray-500">Address</label>
          {isEditable ? (
            <>
              <input
                type="text"
                name= "address.line1"
                value={doctorData.address?.line1 || " "}
                onChange={(e) =>
                  setDoctorData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
              />
              <input
                type="text"
                value={doctorData.address?.line2 || ""}
                name="address.line2"
                onChange={(e) =>
                  setDoctorData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              className="w-full mt-1 p-2  outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
              />
            </>
          ) : (
            <p className="text-gray-700 mt-1">
              {doctorData.address?.line1}, {doctorData.address?.line2}
            </p>
          )}
        </div>
     
        <div className="flex flex-col  pt-4">
          <button onClick={() => {
                if (isEditable) {
                  updateDoctorProfile();   
                }
                setIsEditable(!isEditable);
              }}
            className="px-8 py-2 mb-5 text-[16px] width-auto
              rounded-full shadow  transition-all duration-500
             bg-white text-blue-500 border border-blue-500" 
          >
            {isEditable ? "Save Changes" : "Edit Profile"}
          </button>
          
        </div>
      </div>
    </div>
    )
}

export default DoctorProfile;