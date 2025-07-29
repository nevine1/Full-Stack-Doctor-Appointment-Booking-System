import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { logout } from '../store/slices/adminSlice'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { assets } from '@/assets/assets'
const Navbar = () => {
  const { adminToken, isLoading } = useSelector((state) => state.admin)
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
     dispatch(setIsLogin(false))
   
  }
  return (
    <div className="flex flex-row items-center justify-between py-4 px-6 sm:px-10 border-b border-gray-400 bg-white">
      <div className="flex flex-row gap-6 items-center">
        <Image
        src={assets.admin_logo}
        alt="logo"
        width={100}
        height={100}
        className="w-44 py-0 cursor-pointer md:w-40"
          onClick={() => router.push('/')}
          
        />
        <p className='text-xs text-gray-600 py-0.5 px-3 rounded-full border border-gray-500'>{adminToken ? "Admin" : "Doctor"}</p>
      </div>
      
      <button type="button" onClick={handleLogout}
        className="px-6 py-1 bg-blue-500 text-sm text-white rounded-lg transition-all duration-400
          hover:cursor-pointer border hover:border-blue-500 hover:text-blue-500 hover:bg-white"
      > Log out</button>
    </div>
  )
}

export default Navbar
