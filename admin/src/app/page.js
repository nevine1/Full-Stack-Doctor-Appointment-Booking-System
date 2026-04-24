"use client";

import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">

      <h1 className="text-3xl font-bold">
        Welcome to My Medical App
      </h1>

      <p className="text-gray-600 text-center max-w-md">
        This is a demo project. You can explore the dashboard freely.
        Login is required to perform actions.
      </p>

      <div className="flex gap-4">
        <Link href="/admin/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded">
          Admin Dashboard
        </Link>

        <Link href="/auth" className="px-4 py-2 bg-green-500 text-white rounded">
          Doctor Dashboard
        </Link>
      </div>

    </div>
  );


}
export default page