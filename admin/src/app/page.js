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
    <div >
      {
        adminToken ? (
          <>
            <Navbar />


          </>
        ) : (
          <Login />
        )
      }
    </div>
  );
}
