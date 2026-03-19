import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Page = () => {
  return (
    <div className="my-6 px-6 md:px-12">


      <div className="text-xl text-center pt-10 pb-8">
        <h1>
          ABOUT <span className="font-bold">US</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <Image
          src={assets.about_image}
          width={400}
          height={500}
          alt="about page image"
          className="rounded-lg shadow-md w-full md:w-[400px] object-cover"
        />

        <div className="flex flex-col leading-relaxed text-gray-600">
          <p className="py-2">
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>

          <p className="py-2">
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
          </p>

          <p className="py-2 font-semibold text-lg text-gray-800">
            Our Vision
          </p>

          <p className="py-2">
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers.
          </p>
        </div>
      </div>


      <div className="mt-12">
        <div className="text-xl text-center pt-10 pb-8">
          <h1>
            WHY CHOOSE <span className="font-bold">US</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="border border-gray-200 p-8 text-gray-600 rounded-lg transition-all duration-300 hover:text-white hover:bg-blue-500">
            <h1 className="text-xl font-semibold pb-4">EFFICIENCY:</h1>
            <p>
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>

          <div className="border border-gray-200 p-8 text-gray-600 rounded-lg transition-all duration-300 hover:text-white hover:bg-blue-500">
            <h1 className="text-xl font-semibold pb-4">CONVENIENCE:</h1>
            <p>
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>

          <div className="border border-gray-200 p-8 text-gray-600 rounded-lg transition-all duration-300 hover:text-white hover:bg-blue-500">
            <h1 className="text-xl font-semibold pb-4">PERSONALIZATION:</h1>
            <p>
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;