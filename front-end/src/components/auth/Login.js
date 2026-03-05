"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setToken } from "@/store/slices/usersSlice";
import { toast } from "react-toastify";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { token, isLoading } = useSelector((state) => state.users);

  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userInfo;

    try {
      dispatch(setIsLoading(true));

      if (mode === "Sign Up") {
        if (!name || !email || !password) {
          toast.error("Please fill all fields");
          return;
        }

        const res = await axios.post(`${backUrl}/api/users/register`, {
          name,
          email,
          password,
        });

        if (res.data.success) {
          toast.success(`${name} registered successfully! Please log in.`);
          setMode("login");
        } else {
          toast.error(res.data.message || "Registration failed");
        }
      } else {
        if (!email || !password) {
          toast.error("Email or password cannot be empty");
          return;
        }

        const res = await axios.post(`${backUrl}/api/users/login`, {
          email,
          password,
        });

        if (res.data.success && res.data.token) {
          dispatch(setToken(res.data.token));
          toast.success("Welcome back!");
          router.push("/auth/profile");
        } else {
          toast.error(res.data.message || "Login failed");
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (token) router.push("/auth/profile");
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 px-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg 
                   bg-white shadow-xl border border-gray-200 
                   rounded-2xl p-6 sm:p-8 md:p-10 
                   transition-all duration-300"
      >
        <div className="flex flex-col gap-4 sm:gap-5">

          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {mode === "Sign Up" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              {mode === "Sign Up"
                ? "Register to book your appointment"
                : "Login to continue"}
            </p>
          </div>


          {mode === "Sign Up" && (
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2.5 text-sm sm:text-base
                         border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          )}


          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2.5 text-sm sm:text-base
                       border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />


          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2.5 pr-10 text-sm sm:text-base
                         border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 
                         text-gray-600 cursor-pointer hover:text-blue-500"
            >
              {showPass ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
            </div>
          </div>


          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600
                       text-white font-medium py-2.5 rounded-lg
                       transition-all duration-300 shadow-md
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Please wait..."
              : mode === "Sign Up"
                ? "Create Account"
                : "Login"}
          </button>

          {/* Switch Mode */}
          <p className="text-center text-sm text-gray-600">
            {mode === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setMode("login")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Log In
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => setMode("Sign Up")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;