"use client" 
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Dashboard from '@/components/admin/Dashboard';

const page = () => {
  const { setIsLoading, adminToken } = useSelector((state) => state.admin);
  console.log('dashboard admin Token', adminToken);
  return (
    <div>
      <Dashboard/>
    </div>
  )
}

export default page
