"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { assets } from '../assets/assets'
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const router = useRouter(); 
  const handleClick = () => {
    router.push('/auth/login')
  }
  return (
      <div className="flex flex-row  justify-between items-center py-4 mx-10 
        border-b border-gray-200 bg-brandBlue">
          <Image
              src={assets.logo}
              alt="logo"
              width={100}
              height={100}
              className="w-44  py-0"
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
            <button onClick={handleClick}
              className="bg-blue-500 text-white px-8 rounded-full py-1 hidden md:block">
                  Login
              </button>
          </div>
                
    </div>
  )
}

export default Navbar
