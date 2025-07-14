"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const Login = () => {
    const router = useRouter();
    const [state, setState] = useState("Sign Up");
    const [fullName, setFullName ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
  return (
    <div className="  rounded-xl  ">
          <form className="md:w-[30vw] w-[400px] mx-auto md:mt-20 sm:mt-5 sm:w-[90vw] bg-blue-50  border shadow-md border-gray-300 m-auto p-10 rounded-xl">
              <div className="flex flex-col gap-6 items-center justify-start">
                <p className="text-lg font-semibold">{state === `Sign Up` ? "Create account" : "Login"}</p>
                <p>Please {state === `Sign Up` ? "Create account" : "Login"} to book appointment</p>
                    
                {
                  state === "Sign Up" && 
                  <input
                    type="text"
                    name="full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder='Full Name'
                    className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                    />
                 }
          
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
                  <button type="submit" className="py-3  md:mx-10 sm:mx-2 tex-lg  w-full text-white bg-blue-500 rounded-full">
                 {
                  state === `Sign Up` ? "Create account" : "Login "
                  
                  }
                  </button>
                  <div>
                    {
                    state === `Sign Up` 
                    ?  <p>Already have an account? <span onClick={() => setState("Login")} className="cursor-pointer">Log In</span></p>
                    : <p>Create new account ? <span onClick={() => setState("Sign Up")} className="cursor-pointer">Sign Up</span></p>
                    
                  }
                </div>
            </div>
                
              
             
      </form>
    </div>
  )
}

export default Login
