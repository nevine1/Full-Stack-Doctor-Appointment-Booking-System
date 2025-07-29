"use client";
import SideBar from "@/components/SideBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
export default function AdminLayout({ children }) {
  const { adminToken } = useSelector((state) => state.admin);
  const router = useRouter();

  useEffect(() => {
    if (!adminToken) {
      router.push("/");
    } else {
        router.push('/admin/dashboard')
    }
  }, [adminToken]);

 

  return (
      <div className="min-h-screen">
      {/* Navbar full width */}
      <header className="h-[64px] w-full shadow-sm border-b bg-white flex items-center px-4 z-20 relative">
        <Navbar />
      </header>

      {/* Layout below Navbar */}
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[220px] bg-red-100 shadow-md min-h-screen">
          <SideBar />
        </aside>

        {/* main pages content */}
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}