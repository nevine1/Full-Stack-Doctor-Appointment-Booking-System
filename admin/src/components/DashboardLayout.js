"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({ children }) {
  const { adminToken } = useSelector((state) => state.admin);
  const { doctorToken } = useSelector((state) => state.doctors);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Protect routes
  useEffect(() => {
    if (!adminToken && !doctorToken) {
      router.replace("/"); // prevents going back to protected page
    } else {
      setIsChecking(false);
    }
  }, [adminToken, doctorToken, router]);

  const role = adminToken ? "Admin" : doctorToken ? "Doctor" : null;

  if (isChecking || !role) return null; // or add a spinner/loading indicator

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-[64px] w-full bg-white shadow-md border-b border-gray-200 flex items-center">
        <Navbar role={role} />
      </header>

      <div className="flex flex-1">
        <aside className="w-[220px] bg-blue-50 shadow-md min-h-screen">
          <SideBar role={role} />
        </aside>

        <main className="flex-1 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}