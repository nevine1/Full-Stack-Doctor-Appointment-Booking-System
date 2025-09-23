"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/adminSlice";
import { setDoctorToken } from "@/store/slices/doctorsSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Navbar = () => {
  const { adminToken } = useSelector((state) => state.admin);
  const { doctorToken } = useSelector((state) => state.doctors);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    dispatch(setDoctorToken(""));
    router.push("/");
  };

  // determine admin role or doctor role 
  const role = adminToken ? "Admin" : doctorToken ? "Doctor" : "";
  const logo = adminToken ? assets.admin_logo : doctorToken ? assets.doctor_logo : assets.default_logo;

  // determine redirectPath after role login 
  const redirectPath = adminToken ? "/admin/dashboard" : doctorToken ? "/doctor/dashboard" : "/";

  return (
    <div className="flex items-center justify-between shadow-md w-full py-4 px-6 sm:px-10 border-b border-gray-300 bg-white">
      <div className="flex items-center gap-4">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer"
          onClick={() => router.push(redirectPath)}
        />
        {role && (
          <p className="text-xs text-gray-600 py-0.5 px-3 rounded-full border border-gray-300">
            {role}
          </p>
        )}
      </div>

      {(adminToken || doctorToken) && (
        <button
          type="button"
          onClick={handleLogout}
          className="px-6 py-1 bg-blue-500 text-sm text-white rounded-lg hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 transition"
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default Navbar;
