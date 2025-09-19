"use client"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
     const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL 
    const dispatch = useDispatch();
    const { adminToken } = useSelector((state) => state.admin)
    const { appointments } = useSelector((state) => state.appointments);
    const [dashedData, setDashedData] = useState({});

    const dashboardData = async () => {
        try{
            const res = await axios.get(`${backUrl}/api/admin/dashboard-data`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                    }
            })
            console.log('res is ', res.data)
            if (res.data.success) {
                setDashedData(res.data.data)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {

        dashboardData(); 

    }, [adminToken])

  return (
      <div>
          {
              dashedData.length > 0 && 
              (
                  <div>
                      <p> doctors numbers are: {doctors.length}</p>
                  </div>
              )
          }
    </div>
  )
}

export default Dashboard