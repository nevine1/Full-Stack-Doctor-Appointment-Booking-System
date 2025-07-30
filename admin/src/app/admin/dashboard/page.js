"use client" 
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const page = () => {
  const { setIsLoading, adminToken } = useSelector((state) => state.admin);
  console.log('dashboard admin Token', adminToken);
  return (
    <div>
      dashbord
    </div>
  )
}

export default page
