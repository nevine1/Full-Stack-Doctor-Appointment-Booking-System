"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '@/store/slices/doctorsSlice';
import Link from 'next/link'
import axios from 'axios'
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const { token } = useSelector((state) => state.doctors)
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target
     setUserInfo((prev) => ({...prev, [name] : value}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      if (state === "Sign Up") { //register route
        
        const res = await axios.post(`${backUrl}/api/users/register`, { name, email, password });
          if (!name || !email || !password) {
            console.log("Please fill all fields");
            return;
        }
       
        if (res.data.success) {
          console.log("User:", res.data.data);
          dispatch(setToken(res.token))
          setState('login')//to login after registration 
        } else {
          console.log("Error from backend:", res.data.message);
        }
      }
      
    } catch (err) {
      console.log(err.message)
    }
  }
  console.log('registeration token is:', token)
  return (
    <div className="  rounded-xl  ">
      <form className="md:w-[60vw] sm:w-[75vw] min-w-[500px] mx-auto md:mt-20 sm:mt-5  bg-blue-50  border shadow-md border-gray-300 m-auto p-10 rounded-xl"
        onSubmit={handleSubmit}
        >
              <div className="flex flex-col gap-6 items-center justify-start">
                <p className="text-lg font-semibold">{state === `Sign Up` ? "Create account" : "Login"}</p>
                <p>Please {state === `Sign Up` ? "Create account" : "Login"} to book appointment</p>
                    
                {
                  state === "Sign Up" && 
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) =>setName(e.target.value)}
                    placeholder='Full Name'
                    className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                    required
                   />
                 }
          
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) =>setEmail(e.target.value)}
                  placeholder="Email"
                  className="mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                  required
                /> 
                <input 
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) =>setPassword(e.target.value)}
                  placeholder='Password'
                  className="md:mx-10 sm:mx-2 mb-3 pl-3 py-2 border focus:outline-gray-200 border-gray-300 bg-white w-full rounded-md"
                     required
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
