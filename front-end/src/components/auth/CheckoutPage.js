"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const router = useRouter();
  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { token } = useSelector((state) => state.users);
  const searchParams = useSearchParams();

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const appointmentId = searchParams.get("appointmentId"); // comes from success_url
  const sessionId = searchParams.get("session_id");        // Stripe session id

  const confirmPayment = async () => {
    try {
      if (!success || !appointmentId || !sessionId) return;

      toast.info("Payment successful! Confirming appointment...");

      //  Get Stripe session info
      const sessionRes = await axios.get(
        `${backUrl}/api/payment/session/${sessionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
 
      const paymentIntentId = sessionRes.data.payment_intent;

      // confirm appointment in backend
      const res = await axios.post(
        `${backUrl}/api/users/confirm-payment`,
        { appointmentId, paymentIntentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Appointment confirmed!");
        router.push("/auth/myAppointments");
      }
    } catch (err) {
      console.log("Error confirming payment:", err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    confirmPayment();
  }, [searchParams]);

  if (canceled) {
    return <h1>Payment canceled. Please try again.</h1>;
  }

  return <h1>Processing Checkout...</h1>;
};

export default CheckoutPage;
