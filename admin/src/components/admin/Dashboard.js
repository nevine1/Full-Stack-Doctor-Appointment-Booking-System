"use client"
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Dashboard = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const { adminToken } = useSelector((state) => state.admin)
    const [dashedData, setDashedData] = useState({});

    const dashboardData = async () => {
        try {
            const res = await axios.get(`${backUrl}/api/admin/dashboard-data`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            if (res.data.success) setDashedData(res.data.data)
        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        if (adminToken) dashboardData();
    }, [adminToken])

    const cancelAppointment = async (appointmentId) => {
        try {
            const res = await axios.post(`${backUrl}/api/admin/admin-cancel-appointment`, { appointmentId }, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            if (res.data.success) {
                toast.success('Appointment is canceled')
                dashboardData(); // refetch data to update latestAppointments
            }
        } catch (err) {
            console.log(err.message);
            toast.error(err.message)
        }
    }

    const formatSlot = (slotDate, slotTime) => {
        const [day, month, year] = slotDate.split("-").map(Number);
        const d = new Date(year, month - 1, day);
        return `${d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })} at ${slotTime}`;
    }

    return dashedData && (
        <div className="m-5">
            <div className="flex flex-wrap gap-7 items-center  ">
                <div className="flex items-center gap-2 bg-white p-4  min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:scale-105">
                    <Image src={assets.doctor_icon} width={100} height={100} className="w-24" alt="doctor_icon" />
                    <div>
                        <p className="text-2xl font-semibold text-gray-700">{dashedData.doctors}</p>
                        <p className="text-xs text-gray-400">Doctors</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:scale-105">
                    <Image src={assets.appointment_icon} width={100} height={100} className="w-24 text-gray-400" alt="appointments_icon" />
                    <div>
                        <p className="text-2xl font-semibold text-gray-700">{dashedData.appointments}</p>
                        <p className="text-xs text-gray-400">Appointments</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:scale-105">
                    <Image src={assets.patients_icon} width={100} height={100} className="w-24" alt="patients_icon" />
                    <div>
                        <p className="text-2xl font-semibold text-gray-500">{dashedData.patients}</p>
                        <p className="text-xs text-gray-700">Patients</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-2 border-gray-200 rounded py-2 px-4">
                <div className="flex items-center gap-4 p-3 rounded-t border-b border-gray-200">
                    <Image src={assets.list_icon} alt="list_icon" width={50} height={50} className="w-5 h-5" />
                    <p className="font-semibold">Latest booking appointments</p>
                </div>

                <div className="mt-4 bg-white">
                    {dashedData.latestAppointments?.length > 0 ? (
                        dashedData.latestAppointments.map((item, index) => (
                            <div key={index} className="flex items-center hover:bg-gray-100 px-4 py-5 gap-4 transition-all duration-300">
                                <Image src={item.docData.image} alt="doctor image" width={50} height={50} className="w-10 h-10 rounded-full" />
                                <div className="flex-1 text-sm">
                                    <p className="text-gray-500">{item.docData.name}</p>
                                    <p className="text-gray-400 text-[12px]">{formatSlot(item.slotDate, item.slotTime)}</p>
                                </div>
                                <div>
                                    {item.canceled ? (
                                        <p className="text-[12px] text-red-500">Canceled</p>
                                    ) : (
                                        <button className="text-[12px] text-white px-4 py-1 rounded-md cursor-pointer bg-red-400"
                                            onClick={() => cancelAppointment(item._id)}>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 py-4">No recent appointments</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard