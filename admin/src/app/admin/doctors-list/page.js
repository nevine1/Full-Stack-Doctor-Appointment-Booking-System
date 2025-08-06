import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
const page = () => {
  const { adminToken,  } = useSelector((state) => state.auth);
  
  const fetchAllDoctors = async () => {
    try {
      
    } catch (err) {
      console.log(message.err)
    }
  }
  return (
    <div>
      doctors list pageeeeeeeeee
    </div>
  )
}

export default page
