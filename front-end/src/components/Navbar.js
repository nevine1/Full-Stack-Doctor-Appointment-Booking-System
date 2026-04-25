"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { assets } from '../assets/assets'
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from "react-icons/io"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/usersSlice'

const Navbar = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showSpecialists, setShowSpecialists] = useState(false)

  const { token, user } = useSelector((state) => state.users)
  const { doctors } = useSelector((state) => state.doctors)


  const specialities = [...new Set(doctors.map((doc) => doc.speciality))]

  const handleClick = () => {
    router.push('/auth/login')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const logOut = () => {
    dispatch(logout())
    setShowMenu(false)
    router.push('/')
  }

  if (!mounted) return null

  return (
    <div className="flex flex-row justify-between items-center py-6 px-4 md:px-10 border-b border-gray-200 bg-brandBlue">


      <Image
        src={assets.logo}
        alt="logo"
        width={100}
        height={100}
        className="w-44 cursor-pointer md:w-40"
        onClick={() => router.push('/')}
      />

      {/* desktop menu */}
      <ul className="hidden md:flex gap-6 text-md">

        <li className="group relative">
          <Link href="/" className="text-black">
            Home
          </Link>
        </li>


        <li className="group relative">
          <Link href="/about" className="text-black">
            About
          </Link>
        </li>


        <li className="group relative">
          <Link href="/doctors" className="text-black">
            Doctors
          </Link>
        </li>


        <li
          className="relative"
          onMouseEnter={() => setShowSpecialists(true)}
          onMouseLeave={() => setShowSpecialists(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer text-black">
            Specialists <IoIosArrowDown />
          </div>

          {showSpecialists && (
            <div className="absolute top-6 left-0 bg-white shadow-lg rounded-md p-3 z-50 min-w-[180px]">

              {specialities.length > 0 ? (
                specialities.map((spec) => (
                  <p
                    key={spec}
                    onClick={() => {
                      router.push(`/doctors/specialist/${spec}`)
                      setShowSpecialists(false)
                    }}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-100 rounded-md text-sm"
                  >
                    {spec}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-400 px-3 py-2">
                  No specialists
                </p>
              )}

            </div>
          )}
        </li>


        <li className="group relative">
          <Link href="/contact" className="text-black">
            Contact
          </Link>
        </li>

      </ul>

      {/* right side */}
      <div className="flex items-center gap-4 relative">

        {token ? (
          <div className="flex gap-2 items-center relative">

            <Image
              src={user?.image || assets.profile_pic}
              alt="profile"
              width={32}
              height={32}
              className="rounded-full w-8 h-8 object-cover"
            />

            <IoIosArrowDown
              onClick={() => setShowMenu(!showMenu)}
              className="text-[20px] cursor-pointer"
            />

            {showMenu && (
              <div className="absolute z-50 right-0 top-12 text-slate-700">
                <div className="w-48 flex flex-col gap-3 rounded-md bg-slate-100 p-4 shadow-lg">

                  <Link href="/auth/profile" onClick={() => setShowMenu(false)}>
                    My Profile
                  </Link>

                  <Link href="/auth/myAppointments" onClick={() => setShowMenu(false)}>
                    My Appointments
                  </Link>

                  <p onClick={logOut} className="cursor-pointer">
                    Logout
                  </p>

                </div>
              </div>
            )}

          </div>
        ) : (
          <button
            onClick={handleClick}
            className="cursor-pointer text-blue-500 bg-white px-6 rounded-md py-1 hidden md:block border border-blue-200 hover:bg-blue-500 hover:text-white transition-all"
          >
            Login
          </button>
        )}
        <button  className="cursor-pointer text-blue-500 bg-white px-6 rounded-md py-1 hidden md:block border border-blue-200 hover:bg-blue-500 hover:text-white transition-all"
            onClick={() => router.push("https://full-stack-doctor-appointment-booki-roan.vercel.app")}
            >
              Addmin
          </button>

        {/* mobile menu icon*/}
        <Image
          src={assets.menu_icon}
          alt="menu"
          width={24}
          height={24}
          className="w-10 md:hidden cursor-pointer"
          onClick={() => setShowMenu(true)}
        />

      </div>

      {/* mobile menu list */}
      <div className={`${showMenu ? "fixed" : "hidden"} md:hidden top-0 right-0 w-full h-full z-[60] bg-white`}>

        <div className="flex justify-between items-center px-4 py-4 bg-gray-100 border-b">

          <Link href="/" onClick={() => setShowMenu(false)}>
            <Image src={assets.logo} alt="logo" width={80} />
          </Link>

          <Image
            src={assets.cross_icon}
            alt="close"
            width={32}
            height={32}
            onClick={() => setShowMenu(false)}
            className="cursor-pointer"
          />

        </div>

        <ul className="flex flex-col gap-4 p-6 text-lg">

          <li onClick={() => setShowMenu(false)} className="cursor-pointer py-2 px-4 rounded-md hover:text-white hover:bg-blue-500 transition-all duration-300">
            <Link href="/">Home</Link>
          </li>

          <li onClick={() => setShowMenu(false)} className="cursor-pointer py-2 px-4 rounded-md hover:text-white hover:bg-blue-500 transition-all duration-300">
            <Link href="/about">About</Link>
          </li>

          <li onClick={() => setShowMenu(false)} className="cursor-pointer py-2 px-4 rounded-md hover:text-white hover:bg-blue-500 transition-all duration-300">
            <Link href="/doctors">Doctors</Link>
          </li>

          {/* mobile specialities */}
          {specialities.map((spec) => (
            <li
              key={spec}
              onClick={() => {
                setShowMenu(false)
                router.push(`/doctors/specialist/${spec}`)
              }}
              className="pl-2 text-sm text-gray-700"
            >
              {spec}
            </li>
          ))}


          <li onClick={() => setShowMenu(false)} className="cursor-pointer py-2 px-4 rounded-md hover:text-white hover:bg-blue-500 transition-all duration-300">
            <Link href="/contact">Contact</Link>
          </li>

          {!token ? (
            <li onClick={() => { setShowMenu(false); handleClick() }} className="cursor-pointer py-2 px-4 rounded-md hover:text-white hover:bg-blue-500 transition-all duration-300">
              Login / Create Account
            </li>
          ) : ((
            <li onClick={() => { setShowMenu(false); router.push("/auth/profile") }} className="cursor-pointer py-2 px-4 rounded-md hover:text-white hover:bg-blue-500 transition-all duration-300">
              My-Profile
            </li>
          ))

          }

<li  className="cursor-pointer py-2 px-4 rounded-md hover:text-white hover:bg-blue-500 transition-all duration-300">
            <Link href="https://full-stack-doctor-appointment-booki-roan.vercel.app/">Admin</Link>
          </li>
        </ul>

      </div>

    </div>
  )
}

export default Navbar