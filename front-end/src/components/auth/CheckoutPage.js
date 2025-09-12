"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const CheckoutPage = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const { token } = useSelector((state) => state.users)
    const searchParams = useSearchParams();
   const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const docId = searchParams.get("docId");
    const slotDate = searchParams.get("slotDate");
    const slotTime = searchParams.get("slotTime");
  /* useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const docId = searchParams.get("docId");
    const slotDate = searchParams.get("slotDate");
    const slotTime = searchParams.get("slotTime");

    if (success) {
        toast.success("Payment successful! Confirming appointment...");
        
      axios.post(`${backUrl}/api/users/confirm-appointment`, {
        doctorId: docId,
        slotDate,
        slotTime,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      })
      .then(res => {
          if (res.data.success) {
            console.log('checkout res is:', res)
            toast.success("Appointment confirmed!");
            
        }
      })
      .catch(err => {
          toast.error("Could not confirm appointment.");
          console.log(err.message)
      });
    }

    if (canceled) {
      toast.error("Payment canceled.");
    }
  }, [searchParams]); */

  const confirmPayment = async () => {
      
      try {
        const res = await axios.post(`${backUrl}/api/users/confirm-payment`, { doctorId: docId, slotDate, slotTime }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
            console.log('checkout res is:', res)
            toast.success("Appointment confirmed!");
            
        }
        
      } catch (err) {
        console.log(err.message);
        toast.error(err.message)
      }
  }
  
  useEffect(() => {
    confirmPayment()
  }, [ searchParams ])
  return <h1>Processing Checkout...</h1>;
};

export default CheckoutPage;
