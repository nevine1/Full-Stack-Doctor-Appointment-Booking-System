"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { assets } from '../assets/assets'
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from "react-icons/io";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true); //if it is true , it means the user is logged in
  const router = useRouter(); 
  const handleClick = () => {
    router.push('/auth/login')
  }

  return (
      <div className="flex flex-row  justify-between items-center py-6 mx-10 
        border-b border-gray-200 bg-brandBlue ">
          <Image
              src={assets.logo}
              alt="logo" 
              width={100}
              height={100}
              className="w-44  py-0 cursor-pointer"
              onClick={() => router.push('/')}
                />
            <ul className="hidden md:flex gap-3 text-md">
              <li className="group relative">
                <Link href="/" className="text-black">
                  Home
                  <span
                    className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              </li>
              <li className="group relative">
                <Link href="/about" className="text-black">
                  About
                  <span
                    className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              </li>
              <li className="group relative">
                <Link href="/doctors" className="text-black">
                  Doctors
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full "/>
                </Link>
              </li>
              <li className="group relative">
                <Link href="/contact">
                  Contact
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300  group-hover:w-full" />
                </Link>
              </li>
            </ul>


      <div>
        {
          token ? (
            <div className="flex gap-2 items-center group relative"> 
              <Image
                src={assets.profile_pic}
                alt="profile pic"
                width={32}
                height={32}
                className="rounded-full w-8"
              />
              <IoIosArrowDown onClick={() => setShowMenu(!showMenu)}
                className="text-[20px] cursor-pointer"
              />
              {
                showMenu && (
                  <div className={`absolute z-20 right-0 top-0 pt-14  text-slate-700  hidden group-hover:block  transition-all duration-400 `}>
                    <div className="w-48  flex flex-col gap-3 rounded-md bg-slate-100 p-4 shadow-lg">
                      <p className='cursor-pointer hover:text-black' onClick={()=>router.push('/auth/profile')}>My Profile</p>
                      <p className='cursor-pointer hover:text-black' onClick={()=>router.push('/myAppointment')}>My Appointments</p>
                      <p className='cursor-pointer hover:text-black' onClick={()=>setToken(false)}>Logout</p>
                    </div>
                  </div>
                )
              }
              
            </div>
          ): (
            <button onClick={handleClick}
              className="bg-blue-500 text-white px-8 rounded-full py-2 hidden md:block">
                 Create account
              </button>
          )
        }
            
          </div>
                
    </div>
  )
}

export default Navbar
