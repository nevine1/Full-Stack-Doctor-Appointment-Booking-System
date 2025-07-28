"use client"
import { useEffect } from 'react'
import Login from "@/components/auth/Login";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import Link from "next/link";
export default function Home() {
  const { adminToken } = useSelector((state) => state.admin);
  useEffect(() => {
    console.log(adminToken)
  })
  return (
    <div >
      {
        adminToken ? (
          <>
            <Navbar />
            <div className="flex flex-col items-start gap-3 ">
              <SideBar />
              <ul>
                <li><Link href="/">Dashboard</Link></li>
                <li><Link href="/">Doctors List</Link></li>
                <li><Link href="/"> Add a doctor</Link></li>
                <li><Link href="/">All Appointments</Link></li>
              </ul>
            </div>
            
          </>
        ) : (
          <Login />
        )
      }
    </div>
  );
}
