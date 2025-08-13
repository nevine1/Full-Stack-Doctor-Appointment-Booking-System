"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading, setToken } from '@/store/slices/doctorsSlice';
import { toast } from 'react-toastify';

import axios from 'axios'
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const { token, isLoading } = useSelector((state) => state.doctors)
  const [mode, setMode] = useState("Sign Up");
  const [userInfo, setUserInfo] = useState({
    name: " ", 
    email: "", 
    password: ""
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
     setUserInfo((prev) => ({...prev, [name] : value}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = userInfo; 
      dispatch(setIsLoading(true))
      if (mode === "Sign Up") { //register route
        
        const res = await axios.post(`${backUrl}/api/users/register`, { name, email, password });
        if (!name || !email || !password) {
          toast.error("Please fill all fields");
            console.log("Please fill all fields");
            return;
        }
       
        if (res.data.success) {
          console.log("User:", res.data.data);
          toast.success(`${name} has been successfully registered, now you should login`);
          
          setMode('login')//to login after registration 
        } else {
          console.log("Error from backend:", res.data.message);
        }
      } else {
        // when login 
        const res = await axios.post(`${backUrl}/api/users/login`, { email, password });
        if (!email || !password) {
          toast.error("Email or password should not be empty ");
        }
        if (res.data.success && res.data.token) {

          dispatch(setToken(res.data.token))
          router.push('/auth/profile')
          toast.success(`${name} has successfully logged in`);
          
        } else {
          console.log(res.data.message || "Logged in failed")
        }
      }
      
    } catch (err) {
      console.log(err.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
  console.log(' token is:', token)
  return (
    <div className="  rounded-xl  ">
      <form className="md:w-[60vw] sm:w-[75vw] min-w-[500px] mx-auto md:mt-20 sm:mt-5  bg-blue-50  border shadow-md border-gray-300 m-auto p-10 rounded-xl"
        onSubmit={handleSubmit}
        >
              <div className="flex flex-col gap-6 items-center justify-start">
                <p className="text-lg font-semibold">{mode === `Sign Up` ? "Create account" : "Login"}</p>
                <p>Please {mode === `Sign Up` ? "Create account" : "Login"} to book appointment</p>
                    
                {
                  mode === "Sign Up" && 
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    placeholder='Full Name'
                    className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                    required
                   />
                 }
          
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                  required
                /> 
                <input 
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  placeholder='Password'
                  className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                     required
            />
                  <button type="submit" className="py-3  md:mx-10 sm:mx-2 tex-lg  w-full text-white bg-blue-500 rounded-full">
                 {
                  mode === `Sign Up` ? "Create account" : "Login "
                  
                  }
                  </button>
                  <div>
                    {
                    mode === `Sign Up` 
                    ?  <p>Already have an account? <span onClick={() => setMode("Login")} className="cursor-pointer">Log In</span></p>
                    : <p>Create new account ? <span onClick={() => setMode("Sign Up")} className="cursor-pointer">Sign Up</span></p>
                    
                  }
                </div>
            </div>
                
              
             
      </form>
    </div>
  )
}

export default Login
