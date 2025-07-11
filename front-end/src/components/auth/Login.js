"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
const Login = () => {
    const router = useRouter();
    const [state, setState] = useState("Sign UP");
    const [fullName, setFullName ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
  return (
    <div className="md:w-[30vw] mx-auto md:mt-15 sm:mt-5 sm:w-[100vw] bg-blue-50 rounded-lg shadow-md ">
          <form className="   border border-gray-300 m-auto p-10 ">
              <div className="flex flex-col gap-6 items-center justify-start">
                <p>{state === `Sign UP` ? "Create Account" : "Log In"}</p>
                <p>Please {state === `Sign UP` ? "Create Account" : "Log In"} to book appointment</p>
          
              
                 <input
                    type="text"
                    name="full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder='Full Name'
                    className="md:mx-10 sm:mx-2 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                  />
                  <input
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                      placeholder='email'
                      className="md:mx-10 sm:mx-2 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"

                  />
                  
                <input 
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                      placeholder='password'
                      className="md:mx-10 sm:mx-2 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"

                       />
                  <button type="submit" className="py-3  md:mx-10 sm:mx-2 tex-lg  w-full text-white bg-blue-500 rounded-full">
                  {state === `Sign UP` ? "Create Account" : "Log In"}
                  </button>
                
            </div>
                
              
             
      </form>
    </div>
  )
}

export default Login
