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
    {
      href: '/admin/dashboard',
      icon: assets.home_icon,
      label: 'Dashboard',
    },
    {
      href: '/admin/all-appointments',
      icon: assets.appointment_icon,
      label: 'Appointments',
    },
    {
      href: '/admin/add-doctor',
      icon: assets.add_icon,
      label: 'Add Doctor',
    },
    {
      href: '/admin/doctors-list',
      icon: assets.doctor_icon,
      label: 'Doctors List',
    },
    {
      href: '/doctor/dashboard',
      icon: assets.add_icon,
      label: 'Dashboard ',
    },
    {
      href: '/doctor/appointments',
      icon: assets.doctor_icon,
      label: "Doctor's Appointments",
    },
    {
      href: '/doctor/profile',
      icon: assets.doctor_icon,
      label: "Doctor's Profile",
    },
  ];

  return (
    <div>
      {adminToken ?  (
        <ul className=" py-4 px-5 mt-4 flex flex-col gap-4">
          {navLinks.slice(0, 4).map(({ href, icon, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href} >
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 text-[13px] py-2 rounded-md transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-100 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Image src={icon} width={24} height={24} alt={`${label} icon`} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : doctorToken ? (
          <ul className="text-xs py-4 px-5 mt-4 flex flex-col gap-4">
            {navLinks.slice(4, 7).map(({ href, icon, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 text-[13px] px-4 py-2 rounded-md transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-100 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Image src={icon} width={24} height={24} alt={`${label} icon`} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
      ) : null 
    }

     
    </div>
  );
};

export default SideBar;

