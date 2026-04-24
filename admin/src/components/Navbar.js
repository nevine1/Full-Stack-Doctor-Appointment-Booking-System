"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../assets/assets";
import { logout } from "@/store/slices/adminSlice";
import { setDoctorToken } from "@/store/slices/doctorsSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { adminToken } = useSelector((state) => state.admin);
  const { doctorToken } = useSelector((state) => state.doctors);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("doctorToken");
    dispatch(logout());
    dispatch(setDoctorToken(""));
    router.replace("/");
  };

  const isAdmin = !!adminToken;
  const isDoctor = !!doctorToken;

  return (
    <div className="flex flex-row items-center justify-between w-full px-6 sm:px-10 py-3 bg-white shadow-md">


      <div className="flex flex-row items-center gap-4">
        <Image
          src={assets.admin_logo}
          alt="Logo"
          width={120}
          height={50}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        {isAdmin && (
          <span className="text-sm text-gray-600 px-2 py-0.5 rounded-full bg-gray-100">
            Admin
          </span>
        )}
        {isDoctor && !isAdmin && (
          <span className="text-sm text-gray-600 px-2 py-0.5 rounded-full bg-gray-100">
            Doctor
          </span>
        )}
      </div>


      <div className="flex gap-4 items-center">

        {isDoctor && !isAdmin && (
          <button
            onClick={() => router.push("/doctor")}
            className="px-4 py-2 text-[12px] font-medium bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Doctor Panel
          </button>
        )}

        {isAdmin && (
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="px-6 py-2 text-[12px] bg-blue-500 text-white rounded-lg transition-all duration-300 hover:border hover:border-blue-500 hover:text-blue-500 hover:bg-white"
          >
            Admin Panel
          </button>
        )}


        {(isAdmin || isDoctor) && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-[12px] font-medium text-red-500 border border-red-400 rounded hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        )}

      </div>

      {
        !isAdmin && !isDoctor && (
          <div className="flex gap-4 items-center">
            <button
              onClick={() => router.push("https://full-stack-doctor-appointment-booki-ten.vercel.app/")}
              className="cursor-pointer px-4 py-2 text-[12px] font-medium text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:text-white transition"
            >
              User
            </button>
            <button
              onClick={() => router.push("/auth")}
              className="cursor-pointer px-4 py-2 text-[12px] font-medium text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:text-white transition"
            >
              Doctor
            </button>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="cursor-pointer px-4 py-2 text-[12px] font-medium text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:text-white transition"
            >
              Admin
            </button>
          </div>
        )
      }
    </div>
  );
};

export default Navbar;