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
  const [mounted, setMounted ] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const { token, user } = useSelector((state) => state.users)
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth/login')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const logOut = () => {
    dispatch(logout());
    router.push('/')
  }
  if (!mounted) return; 
  console.log('token at navbar is,', token)
  
 
  return (
    <div className="flex flex-row justify-between items-center py-6 px-4 md:px-10 border-b border-gray-200 bg-brandBlue">
      
      {/* Logo */}
      <Image
        src={assets.logo}
        alt="logo"
        width={100}
        height={100}
        className="w-44 py-0 cursor-pointer md:w-40"
        onClick={() => router.push('/')}
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-md">
        {["Home", "About", "Doctors", "Contact"].map((item) => (
          <li key={item} className="group relative">
            <Link href={`/${item === "Home" ? "" : item.toLowerCase()}`} className="text-black">
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4 relative">
        {token ? (
          <div className="flex gap-2 items-center relative">
            <Image
              src={user.image}
              alt="profile pic"
              width={32}
              height={32}
              className="rounded-full w-8"
            />
            <IoIosArrowDown
              onClick={() => setShowMenu(!showMenu)}
              className="text-[20px] cursor-pointer"
            />
            {showMenu && (
              <div className="absolute z-50 right-0 top-12 text-slate-700 transition-all duration-400">
                <div className="w-48 flex flex-col gap-3 rounded-md bg-slate-100 p-4 shadow-lg">
                  <Link href="/auth/profile" className="cursor-pointer hover:text-black"
                    onClick={ () => setShowIcon(false)} >My Profile</Link>
                  <Link href="/auth/myAppointments" className="cursor-pointer hover:text-black"
                    onClick={() => setShowIcon(false)}>My Appointments</Link>
                 
                  {
                    token ? (
                     <p className="cursor-pointer hover:text-black" onClick={logOut}>Logout</p>
                    ) : (
                         <p className="cursor-pointer hover:text-black" onClick={handleClick}>Login</p>
                    )
                  }
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleClick} className="cursor-pointer bg-blue-500 text-white px-8 rounded-full py-2 hidden md:block">
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

      {/* Small Screen Menu */}
      <div className={`${showMenu ? "fixed" : "hidden"} md:hidden top-0 right-0 w-full h-full z-[60] bg-white transition-all`}>
        <div className="flex justify-between items-center px-4 py-4 bg-gray-100 border-b border-gray-300">
          <Link href="/" onClick={() => setShowMenu(false)}>
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
              <Link href={`/${item === "Home" ? "" : item.toLowerCase()}`} className="text-black">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
