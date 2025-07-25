"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Link from 'next/link'
import 'dotenv'
const Login = () => {
  const router = useRouter();
  const { isLoggedIn, adminToken } = useSelector((state) => state.admin);
  const dispatch = useDispatch()
    const [state, setState] = useState("Admin");
    const [email, setEmail ] = useState('')
  const [password, setPassword] = useState('')
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      if (state === "Admin") {
        
        const res = await axios.post(`${backUrl}/api/admin/login-admin`, { email, password })
        
        if (res.success) {
          console.log(data.token)
          
        }
      } else {
        
      }
    } catch (err) {
      console.log(err);

   }
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit}
        className=" mt-40 md:w-[30vw] w-[400px] mx-auto md:mt-20 sm:mt-5 sm:w-[90vw] bg-blue-50  border shadow-md border-gray-300 m-auto p-10 rounded-xl">
              <div className="flex flex-col gap-6 items-center justify-start">
                <p className="text-lg font-semibold">{state === "Admin" ? "Admin" : "Doctor"} Login</p>
                  <input
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                      placeholder='Email'
                      className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                  />
                  
                <input 
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                      placeholder='Password'
                      className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"

                       />
                  <button type="submit" className="py-2  md:mx-10 sm:mx-2 tex-lg  w-full text-white bg-blue-400 rounded-md">
                    Login
                  </button>
                  <div>
                    {
                    state === `Admin` 
                    ?  <p className="text-gray-500 text-sm">Are you doctor?  <span onClick={() => setState("Doctor")} className="cursor-pointer text-blue-400 hover:underline">Login here</span></p>
                    : <p className="text-gray-500 text-sm">Are you admin?  <span onClick={() => setState("Admin")} className="cursor-pointer text-blue-400 hover:underline">Login here</span></p>
                    
                  }
                </div>
            </div>
             
      </form>
    </div>
  )
}

export default Login
