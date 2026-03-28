"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { assets } from '../assets/assets'
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/usersSlice'


const Navbar = () => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false)
  const [showMenu, setShowMenu] = useState(false);


  const { token, user } = useSelector((state) => state.users)
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth/login')
  }

  // Handle Hydration: Ensures client-side state matches server-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const logOut = () => {
    dispatch(logout());
    setShowMenu(false);
    router.push('/')
  }

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="flex flex-row justify-between items-center py-6 px-4 md:px-10 border-b border-gray-200 bg-brandBlue">


      <Image
        src={assets.logo}
        alt="logo"
        width={100}
        height={100}
        className="w-44 py-0 cursor-pointer md:w-40"
        onClick={() => router.push('/')}
      />


      <ul className="hidden md:flex gap-6 text-md">
        {["Home", "About", "Doctors", "Specialist", "Contact"].map((item) => (
          <li key={item} className="group relative">
            <Link href={`/${item === "Home" ? "" : item.toLowerCase()}`} className="text-black">
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>


      <div className="flex items-center gap-4 relative">
        {token ? (
          <div className="flex gap-2 items-center relative">
            <Image
              src={user?.image || assets.profile_pic}
              alt="profile pic"
              width={32}
              height={32}
              className="rounded-full w-8 h-8 object-cover"
            />
            <IoIosArrowDown
              onClick={() => setShowMenu(!showMenu)}
              className="text-[20px] cursor-pointer"
            />

            {showMenu && (
              <div className="absolute z-50 right-0 top-12 text-slate-700 transition-all duration-400">
                <div className="w-48 flex flex-col gap-3 rounded-md bg-slate-100 p-4 shadow-lg">
                  <Link
                    href="/auth/profile"
                    className="cursor-pointer hover:text-black"
                    onClick={() => setShowMenu(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/auth/myAppointments"
                    className="cursor-pointer hover:text-black"
                    onClick={() => setShowMenu(false)}
                  >
                    My Appointments
                  </Link>
                  <p className="cursor-pointer hover:text-black" onClick={logOut}>Logout</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleClick} className="cursor-pointer text-blue-500 bg-white px-6 rounded-md py-1 hidden md:block border border-blue-200 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-md">
            Login
          </button>
        )}

        {/* Mobile Menu Icon */}
        <Image
          src={assets.menu_icon}
          alt="menu icon"
          width={24}
          height={24}
          className="w-10 md:hidden cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
      </div>


      <div className={`${showMenu ? "fixed" : "hidden"} md:hidden top-0 right-0 w-full h-full z-[60] bg-white transition-all`}>
        <div className="flex justify-between items-center px-4 py-4 bg-gray-100 border-b border-gray-300">
          <Link href="/" onClick={() => setShowMenu(false)} className="hover:bg-gray-300 transition-colors duration-300 p-1 rounded">
            <Image src={assets.logo} alt="small logo" width={80} className="w-20" />
          </Link>
          <Image
            src={assets.cross_icon}
            alt="closing icon"
            width={32}
            height={32}
            className="cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>
        <ul className="flex flex-col gap-4 text-md p-6">
          {["Home", "About", "Doctors", "Contact"].map((item) => (
            <li key={item} onClick={() => setShowMenu(false)}>
              <Link href={`/${item === "Home" ? "" : item.toLowerCase()}`} className="text-black text-lg block py-2">
                {item}
              </Link>
            </li>
          ))}
          {!token && (
            <li onClick={() => { setShowMenu(false); handleClick(); }}>
              <p className=" font-medium py-2">Login / Create Account</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar;