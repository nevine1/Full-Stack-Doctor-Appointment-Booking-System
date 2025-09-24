"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({ children }) {
  const { adminToken } = useSelector((state) => state.admin);
  const { doctorToken } = useSelector((state) => state.doctors);
  const router = useRouter();

  // Protect routes
  useEffect(() => {
    if (!adminToken && !doctorToken) {
      router.push("/"); 
    }
  }, [adminToken, doctorToken, router]);

  // Determine role from token
  const role = adminToken ? "Admin" : doctorToken ? "Doctor" : null;

  
  if (!role) return null;

  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="h-[64px] w-full bg-white shadow-md border-b border-gray-200 flex items-center">
        <Navbar role={role} />
      </header>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        <aside className="w-[220px] bg-blue-50 shadow-md min-h-screen">
          <SideBar role={role} />
        </aside>

        <main className="flex-1  bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
