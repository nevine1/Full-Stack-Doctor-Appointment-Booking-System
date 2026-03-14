"use client"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Image from 'next/image'
import { assets } from '../../assets/assets'
import { setIsLoading } from '@/store/slices/doctorsSlice'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const { doctorToken } = useSelector((state) => state.doctors)
  const [doctorData, setDoctorData] = useState({ available: false });
  const [isEditable, setIsEditable] = useState(false);
  const [fileImage, setFileImage] = useState(null)
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch doctor profile
  const getDoctorProfile = async () => {
    try {
      const res = await axios.get(`${backUrl}/api/doctors/doctor-profile`, {
        headers: { Authorization: `Bearer ${doctorToken}` }
      })
      if (res.data.success) {
        setDoctorData(res.data.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData(prev => ({ ...prev, [name]: value }));
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(file);
      setDoctorData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  }

  const updateDoctorProfile = async () => {
    try {
      dispatch(setIsLoading(true));
      const formData = new FormData();
      formData.append("docId", doctorData._id);
      formData.append("name", doctorData.name);
      formData.append("email", doctorData.email);
      formData.append("speciality", doctorData.speciality);
      formData.append("experience", doctorData.experience);
      formData.append("degree", doctorData.degree);
      formData.append("fees", doctorData.fees);
      formData.append("address", JSON.stringify(doctorData.address || {}));
      formData.append("available", doctorData.available);

      if (fileImage) formData.append("image", fileImage);

      const res = await axios.put(`${backUrl}/api/doctors/update-doctor-profile`, formData, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
          "Content-Type": "multipart/form-data"
        }
      })

      if (res.data.success) {
        setDoctorData(res.data.data);
        toast.success(`${res.data.data.name} information has been successfully updated!`)
        setIsEditable(false);
      }
    } catch (err) {
      console.log(err.message)
      toast.error(err.message)
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  useEffect(() => {
    if (doctorToken) getDoctorProfile()
  }, [doctorToken])

  return (
    <div className="flex flex-col justify-center p-4 min-h-screen">
      <div className="mb-3 flex flex-col items-center">
        {isEditable ? (
          <>
            <Image
              src={fileImage ? URL.createObjectURL(fileImage) : doctorData?.image || assets.doctor_icon}
              alt="profile preview"
              width={120}
              height={120}
              className="rounded-full shadow-lg p-2 bg-blue-100 object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 p-2 outline-none bg-blue-50 border border-blue-200 rounded-md"
            />
          </>
        ) : (
          <Image
            src={doctorData?.image || assets.doctor_icon}
            alt="profile pic"
            width={120}
            height={120}
            className="rounded-full shadow-lg p-2 bg-blue-100 object-cover"
          />
        )}
      </div>

      <div className="bg-white py-5 px-10 rounded-xl border border-gray-300 shadow-lg w-full max-w-2xl space-y-5">
        {/* Name */}
        <div>
          <label className="font-bold text-[18px] text-black">Name</label>
          {isEditable ? (
            <input
              type="text"
              name="name"
              value={doctorData.name || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-sm text-gray-500 mt-1">{doctorData.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="font-bold text-[18px] text-black">Email</label>
          {isEditable ? (
            <input
              type="email"
              name="email"
              value={doctorData.email || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-sm text-gray-500 mt-1">{doctorData.email}</p>
          )}
        </div>

        {/* Speciality */}
        <div>
          <label className="font-bold text-[18px] text-black">Speciality</label>
          {isEditable ? (
            <input
              type="text"
              name="speciality"
              value={doctorData.speciality || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-sm text-gray-500 mt-1">{doctorData.speciality}</p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="font-bold text-[18px] text-black">Experience</label>
          {isEditable ? (
            <input
              type="text"
              name="experience"
              value={doctorData.experience || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-sm text-gray-500 mt-1">{doctorData.experience} Years</p>
          )}
        </div>

        {/* Fees */}
        <div>
          <label className="font-bold text-[18px] text-black">Fees</label>
          {isEditable ? (
            <input
              type="number"
              name="fees"
              value={doctorData.fees || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 rounded-md"
            />
          ) : (
            <p className="text-sm text-gray-500 mt-1">${doctorData.fees}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="font-bold text-[18px] text-black">Address</label>
          {isEditable ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="line1"
                value={doctorData.address?.line1 || ""}
                onChange={(e) =>
                  setDoctorData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))
                }
                className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 rounded-md"
              />
              <input
                type="text"
                name="line2"
                value={doctorData.address?.line2 || ""}
                onChange={(e) =>
                  setDoctorData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))
                }
                className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 rounded-md"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-1">
              {doctorData.address?.line1}, {doctorData.address?.line2}
            </p>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!doctorData.available}
            onChange={() =>
              isEditable &&
              setDoctorData(prev => ({ ...prev, available: !prev.available }))
            }
            className="accent-blue-500"
          />
          <label className="font-bold text-[16px] text-black">
            {doctorData.available ? (
              <span className="text-blue-500">Available</span>
            ) : (
              <span className="text-gray-300">Not Available</span>
            )}
          </label>
        </div>

        {/* Save / Edit Button */}
        <div className="pt-4">
          <button
            onClick={() => {
              if (isEditable) updateDoctorProfile();
              setIsEditable(!isEditable);
            }}
            className="px-8 py-2 text-[16px] rounded-full shadow transition-all duration-500 bg-white text-blue-500 border border-blue-500"
          >
            {isEditable ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile;