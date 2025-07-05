import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const Footer = () => {
    const router = useRouter();
  return (
    
      <div className="md:mx-10 ">
          <div className="flex flex-col justify-between gap-14 sm:grid grid-cols-[3fr_1fr_1fr] my-10 mt-40 text-sm text-gray-500">
              {/* left section */} 
              <div className="">
                      <Image
                        src={assets.logo}
                        alt="logo" 
                        width={100}
                        height={100}
                        className="w-36  mb-4 cursor-pointer"
                        onClick={() => router.push('/')}
                      />
                      <p className="w-full md:w-2/3 leading-6">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                      </p>
                      
                  </div>
                  {/*  middle section */}
                  <div className="">
                      <h1 className="font-bold text-xl mb-4 text-gray-700">Company</h1>
                      <ul className="flex flex-col gap-2">
                          <li className=" ">
                              <Link href="/">Home</Link>
                          </li>
                          <li className=" ">
                              <Link href="/">ِAbout us</Link>
                          </li>
                          <li className="">
                              <Link href="/">Delivery</Link>
                          </li>
                          <li className=" ">
                              <Link href="/">Privacy</Link>
                          </li>
                      </ul>
                  </div>
                  {/* right section  */}
                  <div>
                      <h1 className="font-bold text-xl mb-4 text-gray-700">Get In Touch </h1>
                      <p className="text-xs py-2">+0-000-000-000</p>
                      <p className="text-xs py-2">greatstackdev@gmail.com</p>
                  </div>
          </div>
          <hr />
          <div className="flex justify-center items-center my-10">
              <p className="text-xs">Copyright 2024  Greatstack.dev - All Right Reserved.</p>
          </div>
      </div>
   
  )
}

export default Footer
