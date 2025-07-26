"use client"
import Login from "@/components/auth/Login";
import { useSelector } from "react-redux";
export default function Home() {
  const { adminToken } = useSelector((state) => state.admin);
  
  return (
    <div >
      {
        adminToken ? (
          <>
            <h1>admin logged in </h1>
            
          </>
        ) : (
            <>
          
              <Login />
              </>
        )
      }
    </div>
  );
}
