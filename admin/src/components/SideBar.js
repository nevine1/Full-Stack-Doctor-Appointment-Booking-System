import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { assets } from '@/assets/assets'
const SideBar = () => {
  const { adminToken} = useSelector((state) => state.admin)
  return (
    <div>
      {
        adminToken && (
          <ul className="text-xs py-4 px-5 bg-red-200 flex flex-col gap-4">
            <li className="  ">
              <Link href="/admin/dashboard" className="flex  items-center gap-3 ">
                <Image src={assets.home_icon}
                  width={24}
                  height={24}
                  alt="home icon"
                />
                  Dashboard
              </Link>
            </li>
            
            <li className=" ">
              <Link href="/admin/all-appointments" className="flex  items-center gap-3 ">
                <Image src={assets.appointment_icon}
                  width={24}
                  height={24}
                  alt="home icon"
                />
                  Doctors-List
              </Link>
            </li>
            <li className=" ">
              <Link href="/admin/add-doctor" className="flex  items-center gap-3 ">
                <Image src={assets.add_icon}
                  width={24}
                  height={24}
                  alt="home icon"
                />
                  Add-doctor
              </Link>
            </li>
            <li className=" ">
              <Link href="/admin/doctors-list" className="flex  items-center gap-3 ">
                <Image src={assets.doctor_icon}
                  width={24}
                  height={24}
                  alt="home icon"
                />
                  Doctors-List
              </Link>
            </li>
          </ul>
        )
      }
    </div>
  )
}

export default SideBar
