"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../assets/assets";
import { logout } from "@/store/slices/adminSlice";
import { setDoctorToken } from "@/store/slices/doctorsSlice";
import Link from "next/link";
const Navbar = ({ role }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { adminToken } = useSelector((state) => state.admin);
  const { doctorToken } = useSelector((state) => state.doctors);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("doctorToken");

    // Clear Redux state
    dispatch(logout());
    dispatch(setDoctorToken(""));

    // Redirect safely without leaving dashboard in history
    router.replace("/");
  };

  // Navigate to frontend
  const handleFrontEnd = () => {
    router.push("https://full-stack-doctor-appointment-booki-ten.vercel.app");
  };

  return (
    <div className="flex flex-row items-center justify-between w-full px-6 sm:px-10 py-3 bg-white shadow-md">


      {/* <div className="flex flex-row items-center gap-4">
        {(role === "Admin" || role === "Doctor") && assets.admin_logo && (
          <Image
            src={assets.admin_logo}
            alt={`${role} Logo`}
            width={120}
            height={50}
            className="cursor-pointer"
            onClick={() => router.push(`/${role.toLowerCase()}/dashboard`)}
          />
        )}
        <span className="text-sm text-gray-600 px-2 py-0.5 rounded-full bg-gray-100">
          {role}
        </span>
      </div> */}

      <div className="flex gap-4">
        <Link
          href="/doctor/dashboard"
          className="px-4 py-2 text-[12px] font-medium bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Doctor
        </Link>

        <Link
          href="/admin/dashboard"
          className="px-6 py-2 text-[12px] bg-blue-500 text-white rounded-lg transition-all duration-300 hover:border hover:border-blue-500 hover:text-blue-500 hover:bg-white"
        >
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Navbar;