import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
const page = () => {
  return (
    <div className="my-6 mx-10  ">
      <div className='text-xl text-center pt-10 pb-8'>
        <h1 className="">ABOUT   <span className="font-bold"> US</span></h1>
      </div>

      <div className="flex flex-col md:flex-row gap-16 mx-15 ">
        <Image
          src={assets.about_image}
          width={300}
          height={400}
          alt="about page's image"
          className="rounded-lg shadow-md w-full"
        />
        <div className="flex flex-col leading-loose ">
          <p className="py-2">Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p className="py-2">Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <p className="py-2 font-semibold text-xl text-gray-600">Our Vision</p>
          <p className="py-2">Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          
        </div>
      </div>

      <div>
        <div className='text-xl text-center pt-10 pb-8 mt-6'>
          <h1 className="">Why choose    <span className="font-bold"> US</span></h1>
        </div>
        <div className="flex flex-row items-center md:flex-row sm:flex-col">
          <div className=" border border-gray-200  p-16 text-gray-600 transition-all duration-500 hover:text-white hover:bg-blue-500 ">
            <h1 className=" text-xl font-semibold  pb-7">EFFICIENCY:</h1>
            <p className="">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className=" border border-gray-200 p-16 text-gray-600 transition-all duration-500 hover:text-white hover:bg-blue-500 ">
            <h1 className=" text-xl font-semibold  pb-7">CONVENIENCE:</h1>
            <p className="">Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className=" border border-gray-200 p-16 text-gray-600 transition-all duration-500 hover:text-white hover:bg-blue-500 ">
            <h1 className=" text-xl font-semibold  pb-7">PERSONALIZATION:</h1>
            <p className="">Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
