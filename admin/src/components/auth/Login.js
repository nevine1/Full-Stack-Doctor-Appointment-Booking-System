"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { updateAdminToken, setIsLogin } from '@/store/slices/adminSlice'
import 'dotenv'
import { toast } from 'react-toastify'
const Login = () => {
  const router = useRouter();
  const { isLoggedIn, adminToken } = useSelector((state) => state.admin);
  console.log('adminToken is:', adminToken)
  const dispatch = useDispatch()
    const [state, setState] = useState("Admin");
    const [email, setEmail ] = useState('')
  const [password, setPassword] = useState('')
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      dispatch(setIsLogin(true))
      if (state === "Admin") {
        
        const res = await axios.post(`${backUrl}/api/admin/admin-login`, { email, password })
        const { token, message } = res;
        console.log('message is:', message)
        console.log('token in  is', token)
      
        if (res.data.token) {
          localStorage.setItem("adminToken", res.data.token);
          
          dispatch(updateAdminToken(res.data.token))
          console.log('adminToken', adminToken)
          toast.success('Admin successfully logged in');
          //router.push('/profile')
           
        } else {
          return toast.error(res.data.message)
        }

      //this is else for if (state === "Admin") 
      } else {
        console.log('can not login')
      }

      
    } catch (err) {
      dispatch(setIsLogin(false))
      console.log(err);

   }
  }
  console.log('adminToken is: ', adminToken)
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
                  <button type="submit" className="py-2 cursor-pointer md:mx-10 sm:mx-2 tex-lg  w-full text-white bg-blue-400 rounded-md">
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
