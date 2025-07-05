import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRightLong } from "react-icons/fa6";

const Banner = () => {
  return (
      <div className="flex flex-col md:flex-row flex-wrap rounded-lg md:px-10 lg:px-20 bg-blue-500 mx-10">
          {/* left side */}
        <div className="md:w-1/2 flex flex-col justify-center items-start gap-4 py-8 m-auto md:py-14 md:mb-[-30px]">
            <p className="leading-loose text-2xl md:text-3xl text-white font-semibold  ">
                  Book Appointment <br />
                  With 100+ Trusted Doctors
            </p>
              <Link href="/auth/register"
                    onClick={() =>scrollTo(0,0)}
                  className="md:text-[16px] sm:text-[14px] xs:text-[13px] my-4 hover:scale-105
                  transition-all duration-500
                    px-7 md:px-6 xs:px-4 py-3 md:py-3 sm:py-2 bg-white rounded-full text-gray-600
                  ">
                    Create Account 
                </Link>
            
                
          </div>
         {/*  right side  */}
        <div className="flex justify-end items-end md:w-1/2 relative ">
             <Image
                src={assets.appointment_img}
                width={300}
                height={200}
                alt="banner image"
                className=" hidden  md:absolute md:block md:right-12  bottom-0 h-auto  md:w-[55%] "
              />
          </div>
    </div>
  )
}

export default Banner;
