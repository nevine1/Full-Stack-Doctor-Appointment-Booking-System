import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRightLong } from "react-icons/fa6";

const Header = () => {
  return (
      <div className="flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20 bg-blue-500">
          {/* left side */}
        <div className="md:w-1/2 flex flex-col justify-center items-start gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                  Book Appointment <br />
               Withe Trusted Doctors
            </p>
            <div className="flex flex-col md:flex-row items-center text-sm font-light gap-3" >
              <Image
                src={assets.group_profiles}
                alt="group image"
                width={150}
             height={56}
                className="w-28"
              />
              <p className="text-white my-5">
                Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block"/>
                schedule your appointment hassle-free.
              </p>
           </div>
            <div className="flex items-center justify-center  gap-4 px-7 md:px-6 xs:px-4 py-3 md:py-3 sm:py-2 bg-white rounded-full text-gray-600 m-auto hover:scale-105 transition-all duration-300">
              <Link href="#speciality"
                  className="flex flex-row gap-2 justify-center text-lg md:text-md sm:text-[14px] xs:text-[13px]">
                    Book Appointment 
                   
                    <FaArrowRightLong className="mt-1 font-light w-4"/>
                   
                </Link>
              </div>
                
          </div>
         {/*  right side  */}
        <div className="flex justify-end items-end md:w-1/2 relative">
             <Image
                src={assets.header_img}
                width={300}
                height={200}
                alt="header image"
                className="w-full md:absolute bottom-0 h-auto lg:w-full md:w-full sm:w-[50%] "
              />
          </div>
    </div>
  )
}

export default Header
