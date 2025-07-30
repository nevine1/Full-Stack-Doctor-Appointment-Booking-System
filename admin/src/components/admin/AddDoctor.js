"use client"
import React from 'react'

const AddDoctor = () => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-40 md:w-[30vw] w-[400px] mx-auto md:mt-20 sm:mt-5 sm:w-[90vw] bg-blue-50 border shadow-md border-gray-300 m-auto p-10 rounded-xl"
      >
        <div className="flex flex-col gap-6 items-center justify-start">
          <p className="text-lg font-semibold">
            {state === "Admin" ? "Admin" : "Doctor"} Login
          </p>
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="mb-3 pl-3 py-2 border border-gray-300 bg-white w-full rounded-md"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="mb-3 pl-3 py-2 border border-gray-300 bg-white w-full rounded-md"
          />
          <button
            type="submit"
            className="py-2 w-full text-white bg-blue-400 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <div>
            {state === "Admin" ? (
              <p className="text-gray-500 text-sm">
                Are you a doctor?{" "}
                <span
                  onClick={() => setState("Doctor")}
                  className="cursor-pointer text-blue-400 hover:underline"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                Are you admin?{" "}
                <span
                  onClick={() => setState("Admin")}
                  className="cursor-pointer text-blue-400 hover:underline"
                >
                  Login here
                </span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor
