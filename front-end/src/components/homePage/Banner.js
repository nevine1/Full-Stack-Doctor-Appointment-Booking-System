import { assets } from "@/assets/assets"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"

const Banner = () => {

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (

    <div className="flex flex-col md:flex-row items-center justify-between
    bg-blue-500 rounded-xl px-6 md:px-12 lg:px-20 py-10 mx-4 md:mx-10">

      {/* left side */}

      <div className="md:w-1/2 text-center md:text-left flex flex-col gap-6">

        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold leading-relaxed">
          Book Appointment <br />
          With 100+ Trusted Doctors
        </h1>

        <Link
          href="/auth/register"
          onClick={handleScrollTop}
          className="flex items-center justify-center md:justify-start gap-2
          bg-white text-gray-700 font-medium
          px-6 py-3 rounded-full w-fit
          hover:scale-105 transition"
        >
          Create Account
          <FaArrowRightLong />
        </Link>

      </div>


      {/* right side */}

      <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">

        <Image
          src={assets.appointment_img}
          alt="appointment"
          width={400}
          height={350}
          className="w-[250px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-auto"
        />

      </div>

    </div>

  )
}

export default Banner