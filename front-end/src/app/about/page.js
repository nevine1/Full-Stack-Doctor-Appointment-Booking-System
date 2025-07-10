import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
const page = () => {
  return (
    <div className="my-6">
      <div>
        <h1 className="text-lg flex justify-center">ABOUT  <span className="font-bold">US</span></h1>
      </div>

      <div>
        <Image
          src={assets.about_image}
          width={300}
          height={400}
          alt="about page's image"
        />
        <div className="">
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <p>Our Vision</p>
          <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          
        </div>
      </div>
    </div>
  )
}

export default page
