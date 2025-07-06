"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { specialityData } from '@/assets/assets'
const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center mt-20  mb-6">
          <h1 className="text-black text-3xl font-semibold m-5">Find by Speciality</h1>
          <p className="pt-2 text-md text-center">
              Simply browse through our extensive list of trusted doctors, <br/>
              schedule your appointment hassle-free.
          </p>
          <div className="flex lg:flex-row md:flex-row sm:flex-col justify-center gap-5 my-7 " onClick={() => scrollTo(0,0)}>
              {
                  specialityData.map((spec, index) => (
                      
                      <div key={index} className=" mt-3 hover:translate-y-[-10px] transition-all duration-500 sm:my-3">
                      <Link 
                          href={`/doctors/specialist/${spec.speciality}`}
                          className="cursor-pointer text-xs flex-shrink-0 ">
                            <Image
                                src={spec.image}
                                alt="specialist" 
                                width={100}
                                height={100}
                                className="w-14 sm:w-20 mb-3 "
                            />
                          
                          {spec.speciality}
                          </Link>
                      </div>
                  ))
              }
          </div>
    </div>
  )
}

export default SpecialityMenu
