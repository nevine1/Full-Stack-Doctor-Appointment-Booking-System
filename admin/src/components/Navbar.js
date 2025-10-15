"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../assets/assets"
import { logout } from "@/store/slices/adminSlice";
import { setDoctorToken } from "@/store/slices/doctorsSlice";

const Navbar = ({ role }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { adminToken } = useSelector((state) => state.admin)
  const { doctorToken } = useSelector((state) => state.doctors)

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    dispatch(setDoctorToken(""));
    router.push("/");
  };

  const handleFrontEnd = () => {
    router.push('../../../front-end/')
  }
  return (
    <div className="flex flex-row items-center justify-between w-full px-6 sm:px-10">
      <div className="flex flex-row items-center gap-4">
        { role === "Admin" && assets.admin_logo ? (
          <Image
            src={assets.admin_logo}
            alt="Admin Logo"
            width={120}
            height={50}
            className="cursor-pointer"
            onClick={() => router.push("/admin/dashboard")}
          />
        ) : role === "Doctor" &&  (
          <Image
            src={assets.admin_logo}
            alt="Doctor Logo"
            width={120}
            height={50}
            className="cursor-pointer"
            onClick={() => router.push("/doctor/dashboard")}
          />
        ) }

        <span className="text-sm text-gray-600 px-2 py-0.5 rounded-full bg-gray-100">
          {role}
        </span>
      </div>
        <button onClick={handleFrontEnd}>FrontEnd</button>
      <button
        type="button"
        onClick={handleLogout}
        className="px-6 py-2 bg-blue-500 text-[12px] text-white rounded-lg transition-all duration-300 hover:border hover:border-blue-500 hover:text-blue-500 hover:bg-white"
      >
        {  role } log out
      </button>
    </div>
  );
};

export default Navbar;
