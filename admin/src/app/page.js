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
    console.log('admin token is:', adminToken)
  })

  useEffect(() => {
    if (adminToken) {
      console.log('Admin token exists, redirecting to dashboard...')
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      {
        adminToken ? (
          <>
            <Navbar />


          </>
        ) : (
          <Login />
        )
      }
      <h1 >Welcome To Admin Dashboard</h1>
      <Link href="/admin/dashboard">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click here for admin Dashboard
        </button>
      </Link>
    </div>
  );
}
