import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
const page = () => {
  return (
    <div>
      <div className='md:text-xl sm:text-medium text-center pt-10 pb-8'>
              <h1 className="">CONTACT   <span className="font-bold"> US</span></h1>
            </div>
      
            <div className="flex flex-col justify-center md:flex-row gap-16 mx-15 ">
              <Image
                src={assets.contact_image}
                width={300}
                height={400}
                alt="contact page's image"
                className="rounded-lg shadow-md"
              />
              <div className="flex flex-col leading-loose text-gray-600">  
                  <p className="py-5">
                    00000 Willms Station <br/> Suite 000, Washington, USA
                  </p>
                  <p className="py-3">
                  Tel: (000) 000-0000 <br/> Email: greatstackdev@gmail.com
                  </p>
                  <p className="text-lg font-bold py-6">CAREERS AT PRESCRIPTO</p>
                  <p className="py-2">Learn more about our teams and job openings.</p>
              </div>
            </div>
    </div>
  )
}

export default page
