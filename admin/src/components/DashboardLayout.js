"use client";
import SideBar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const  DashboardLayout = ({ children }) => {
  const { adminToken } = useSelector((state) => state.admin);
  const { doctorToken } = useSelector((state) => state.doctors);
  const router = useRouter();

  useEffect(() => {
    if (!adminToken && !doctorToken) {
      router.push("/");
    }
  }, [adminToken, doctorToken]);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="h-[64px] w-full bg-white flex items-center z-20 relative">
        <Navbar />
      </header>

      {/* Sidebar + main content */}
      <div className="flex">
        {(adminToken || doctorToken) && (
          <aside className="w-[220px] bg-blue-50 shadow-md min-h-screen">
            <SideBar />
          </aside>
        )}

        <main className="flex-1 p-6 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout; 