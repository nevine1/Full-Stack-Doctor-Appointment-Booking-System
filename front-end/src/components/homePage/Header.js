import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
const Header = () => {
  return (
      <div className="flex md:flex-row sm:flex-col justify-between ">
          {/* left side */}
        <div className="flex justify-center items-center mx-20">
            <p className="text-[48px] text-white font-bold">
                  Book Appointment <br />
               Withe Trusted Doctors
           </p>
          </div>
         {/*  right side  */}
        <div>
             <Image
                src={assets.header_img}
                width={300}
                height={400}
                alt="header image"
              />
          </div>
    </div>
  )
}

export default Header
