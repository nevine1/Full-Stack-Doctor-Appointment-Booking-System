import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Page = () => {
  return (
    <div className="px-6 md:px-12 py-10">


      <div className="text-center pb-10">
        <h1 className="text-lg md:text-2xl">
          CONTACT <span className="font-bold">US</span>
        </h1>
      </div>


      <div className="flex flex-col md:flex-row items-center gap-10">


        <Image
          src={assets.contact_image}
          width={400}
          height={500}
          alt="contact page image"
          className="rounded-lg shadow-md w-full md:w-[400px] object-cover"
        />


        <div className="flex flex-col text-gray-600 leading-relaxed text-center md:text-left">

          <p className="py-4">
            00000 Willms Station <br />
            Suite 000, Washington, USA
          </p>

          <p className="py-2">
            Tel: (000) 000-0000 <br />
            Email: greatstackdev@gmail.com
          </p>

          <p className="text-lg font-semibold py-4 text-gray-800">
            CAREERS AT PRESCRIPTO
          </p>

          <p className="py-2">
            Learn more about our teams and job openings.
          </p>


          {/* <button className="mt-4 w-fit px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Explore Jobs
          </button> */}

        </div>
      </div>
    </div>
  );
};

export default Page;