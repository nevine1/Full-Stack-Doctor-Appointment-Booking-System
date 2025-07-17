"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { assets } from '../assets/assets'
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true); // if true, user is logged in
  const router = useRouter(); 

  const handleClick = () => router.push('/auth/login')

  return (
    <nav className="w-full bg-brandBlue border-b border-gray-200">
      <div className="flex justify-between items-center px-6 py-4 md:px-10">
        
        {/* Logo */}
        <Image
          src={assets.logo}
          alt="logo" 
          width={100}
          height={100}
          className="w-32 md:w-40 cursor-pointer"
          onClick={() => router.push('/')}
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-md">
          {["Home", "About", "Doctors", "Contact"].map((item, index) => (
            <li key={index} className="group relative">
              <Link href={`/${item === "Home" ? "" : item.toLowerCase()}`} className="text-black">
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right-side */}
        <div className="flex items-center gap-4">
          {token ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                <Image src={assets.profile_pic} alt="profile pic" width={32} height={32} className="rounded-full w-8" />
                <IoIosArrowDown className="text-xl" />
              </div>

              {showMenu && (
                <div className="absolute right-0 mt-4 w-48 rounded-md bg-slate-100 p-4 shadow-lg z-50">
                  <p className="cursor-pointer hover:text-black" onClick={() => router.push('/auth/profile')}>My Profile</p>
                  <p className="cursor-pointer hover:text-black" onClick={() => router.push('/auth/appointment')}>My Appointments</p>
                  <p className="cursor-pointer hover:text-black" onClick={() => setToken(false)}>Logout</p>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleClick} className="hidden md:block bg-blue-500 text-white px-6 py-2 rounded-full">
              Create account
            </button>
          )}

          {/* Mobile menu icon */}
          <Image
            src={assets.menu_icon}
            alt="menu icon"
            width={32}
            height={32}
            className="block md:hidden cursor-pointer w-7"
            onClick={() => setShowMenu(true)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${showMenu ? "fixed" : "hidden"} top-0 right-0 w-full h-full bg-blue-50 z-50 transition-all duration-500`}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
          <Link href="/" onClick={() => setShowMenu(false)}>
            <Image src={assets.logo} alt="logo" width={100} height={100} className="w-28" />
          </Link>
          <Image
            src={assets.cross_icon}
            alt="close icon"
            width={32}
            height={32}
            className="cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>
        <ul className="flex flex-col gap-4 px-6 py-6 text-sm">
          {["Home", "About", "Doctors", "Contact"].map((item, index) => (
            <li key={index} onClick={() => setShowMenu(false)}>
              <Link href={`/${item === "Home" ? "" : item.toLowerCase()}`} className="text-black">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar
