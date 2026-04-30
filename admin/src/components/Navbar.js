"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../assets/assets";
import { logout } from "@/store/slices/adminSlice";
import { setDoctorToken } from "@/store/slices/doctorsSlice";
import { IoMdClose } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { adminToken } = useSelector((state) => state.admin);
  const { doctorToken } = useSelector((state) => state.doctors);

  const [open, setOpen] = useState(false);

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
    <div className="w-full px-4 sm:px-8 py-3 bg-white shadow-md flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Image
          src={assets.admin_logo}
          alt="Logo"
          width={110}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        {isAdmin && (
          <span className="hidden sm:inline text-xs bg-gray-100 px-2 py-1 rounded">
            Admin
          </span>
        )}

        {isDoctor && !isAdmin && (
          <span className="hidden sm:inline text-xs bg-gray-100 px-2 py-1 rounded">
            Doctor
          </span>
        )}
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-3">

        {isDoctor && !isAdmin && (
          <button
            onClick={() => router.push("/doctor")}
            className="px-3 py-2 text-xs bg-gray-200 rounded hover:bg-gray-300"
          >
            Doctor Panel
          </button>
        )}

        {isAdmin && (
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="px-4 py-2 text-xs bg-blue-500 text-white rounded hover:bg-white hover:text-blue-500 border border-blue-500"
          >
            Admin Panel
          </button>
        )}

        {(isAdmin || isDoctor) && (
          <button
            onClick={handleLogout}
            className="px-3 py-2 text-xs text-red-500 border border-red-400 rounded hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        )}

        {!isAdmin && !isDoctor && (
          <>
            <button
              onClick={() =>
                router.push("https://full-stack-doctor-appointment-booki-ten.vercel.app/")
              }
              className="px-3 py-2 text-xs text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:text-white"
            >
              User
            </button>

            <button
              onClick={() => router.push("/auth")}
              className="px-3 py-2 text-xs text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:text-white"
            >
              Doctor
            </button>

            <button
              onClick={() => router.push("/admin/dashboard")}
              className="px-3 py-2 text-xs text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:text-white"
            >
              Admin
            </button>
          </>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <IoMdClose /> : <RiMenu2Fill />}
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-3 p-4 md:hidden">

          {isDoctor && !isAdmin && (
            <button onClick={() => router.push("/doctor")}>
              Doctor Panel
            </button>
          )}

          {isAdmin && (
            <button onClick={() => router.push("/admin/dashboard")}>
              Admin Panel
            </button>
          )}

          {(isAdmin || isDoctor) && (
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          )}

          {!isAdmin && !isDoctor && (
            <>
              <button
                onClick={() =>
                  router.push("https://full-stack-doctor-appointment-booki-ten.vercel.app/")
                }
              >
                User
              </button>

              <button onClick={() => router.push("/auth")}>
                Doctor
              </button>

              <button onClick={() => router.push("/admin/dashboard")}>
                Admin
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;