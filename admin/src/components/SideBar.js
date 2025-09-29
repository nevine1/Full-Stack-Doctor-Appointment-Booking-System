'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { usePathname } from 'next/navigation';

const SideBar = () => {
  const { adminToken } = useSelector((state) => state.admin);
  const { doctorToken } = useSelector((state) => state.doctors);
  const pathname = usePathname();

  const navLinks = [
    { href: '/admin/dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { href: '/admin/all-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { href: '/admin/add-doctor', icon: assets.add_icon, label: 'Add Doctor' },
    { href: '/admin/doctors-list', icon: assets.doctor_icon, label: 'Doctors List' },
    { href: '/doctor/dashboard', icon: assets.add_icon, label: 'Dashboard' },
    { href: '/doctor/appointments', icon: assets.doctor_icon, label: "Doctor's Appointments" },
    { href: '/doctor/profile', icon: assets.doctor_icon, label: "Doctor's Profile" },
  ];

 
  const linksToRender = adminToken ? navLinks.slice(0, 4) : doctorToken ? navLinks.slice(4, 7) : [];

  return (
    <div>
      {linksToRender.length > 0 && (
        <ul className="py-4 px-5 mt-4 flex flex-col gap-4">
          {linksToRender.map(({ href, icon, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-100 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {/* Icon always visible */}
                  <Image src={icon} width={24} height={24} alt={`${label} icon`} />

                  {/* Label hidden on small screens, visible on md+ */}
                  <span className="hidden md:inline text-[13px]">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SideBar;
