"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateAdminToken, setAdminLoading } from "@/store/slices/adminSlice";
import { setDoctorToken } from "@/store/slices/doctorsSlice";
import { toast } from "react-toastify";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admin);

  const [role, setRole] = useState("Admin"); // default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    dispatch(setAdminLoading(false));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setAdminLoading(true));

    try {
      if (role === "Admin") {
        // Admin login
        const res = await axios.post(`${backUrl}/api/admin/admin-login`, { email, password });

        if (res.data.token) {
          dispatch(updateAdminToken(res.data.token));
          localStorage.setItem("adminToken", res.data.token);
          toast.success("Admin logged in successfully");
          router.replace("/admin/dashboard"); // replace prevents back navigation
        } else {
          toast.error(res.data.message || "Admin login failed");
        }
      } else {
        // Doctor login
        const res = await axios.post(`${backUrl}/api/doctors/doctor-login`, { email, password });

        if (res.data.success && res.data.token) {
          dispatch(setDoctorToken(res.data.token));
          localStorage.setItem("doctorToken", res.data.token);
          toast.success("Doctor logged in successfully");
          router.replace("/doctor/dashboard");
        } else {
          toast.error(res.data.message || "Doctor login failed");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login error");
    } finally {
      dispatch(setAdminLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8 sm:p-10"
      >
        {/* Role Switch */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${role === "Admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setRole("Admin")}
          >
            Admin
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${role === "Doctor" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => setRole("Doctor")}
          >
            Doctor
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {role === "Admin" ? "Admin Login" : "Doctor Login"}
            </h2>
          </div>


          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          />

          <div className="relative flex items-center">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 cursor-pointer"
            >
              {showPass ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </div>
          </div>


          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;