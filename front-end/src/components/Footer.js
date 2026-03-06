"use client"
import React from "react"
import Image from "next/image"
import { assets } from "@/assets/assets"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Footer = () => {
    const router = useRouter()

    return (
        <footer className="bg-gray-50 mt-20 md:mx-10 px-4 sm:px-6 lg:px-20">
            <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20 py-10 text-gray-500">
                {/* Left section */}
                <div className="md:w-1/2">
                    <Image
                        src={assets.logo}
                        alt="logo"
                        width={100}
                        height={100}
                        className="w-36 mb-4 cursor-pointer"
                        onClick={() => router.push("/")}
                    />
                    <p className="leading-6 text-sm md:text-base">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book.
                    </p>
                </div>

                {/* Middle section */}
                <div className="flex-1">
                    <h2 className="font-bold text-lg md:text-xl mb-4 text-gray-700">
                        Company
                    </h2>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href="/" className="hover:text-blue-500 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="hover:text-blue-500 transition-colors">
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="hover:text-blue-500 transition-colors">
                                Delivery
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="hover:text-blue-500 transition-colors">
                                Privacy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right section */}
                <div className="flex-1">
                    <h2 className="font-bold text-lg md:text-xl mb-4 text-gray-700">
                        Get In Touch
                    </h2>
                    <p className="text-xs md:text-sm py-1">+0-000-000-000</p>
                    <p className="text-xs md:text-sm py-1">greatstackdev@gmail.com</p>
                </div>
            </div>

            <hr className="border-gray-300" />

            <div className="flex justify-center items-center py-6">
                <p className="text-xs md:text-sm text-gray-400">
                    © 2026 Great Stack.dev - All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer