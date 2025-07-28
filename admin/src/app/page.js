"use client"
import Login from "@/components/auth/Login";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
export default function Home() {
  const { adminToken } = useSelector((state) => state.admin);
  
  return (
    <div >
      {
        adminToken ? (
          <>
            <Navbar/>
            
          </>
        ) : (
          <Login />
        )
      }
    </div>
  );
}
