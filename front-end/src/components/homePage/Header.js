import { assets } from "@/assets/assets"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center
        bg-blue-500 rounded-xl px-6 md:px-10 lg:px-20 pt-10">

      {/* left side */}

      <div className="md:w-1/2 flex flex-col gap-6 text-center md:text-left">

        <h1 className="text-white font-semibold
        text-3xl sm:text-4xl lg:text-5xl leading-tight">

          Book Appointment <br />
          With Trusted Doctors

        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-light">

          <Image
            src={assets.group_profiles}
            alt="group image"
            width={120}
            height={50}
            className="w-28"
          />

          <p className="text-white text-center sm:text-left">
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>

        </div>


        <Link
          href="#speciality"
          className="flex items-center gap-2
          bg-white text-gray-700 font-medium
          px-6 py-3 rounded-full w-fit
          mx-auto md:mx-0
          hover:scale-105 transition"
        >
          Book Appointment
          <FaArrowRightLong className="text-sm" />
        </Link>

      </div>


      {/* right side */}

      <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">

        <Image
          src={assets.header_img}
          alt="header image"
          width={420}
          height={400}
          className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[450px] h-auto"
        />

      </div>

    </div>
  )
}

export default Header