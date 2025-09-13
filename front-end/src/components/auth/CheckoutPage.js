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
  const appointmentId = searchParams.get("appointmentId"); //  should come from success_url
  const sessionId = searchParams.get("session_id");        //  Stripe session id

  const confirmPayment = async () => {
    try {
      if (!success || !appointmentId || !sessionId) return;

      toast.info("Payment successful! Confirming appointment...");

      //get paymentIntentId from Stripe session
      const sessionRes = await axios.get(`${backUrl}/api/payment/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const paymentIntentId = sessionRes.data.payment_intent;

      // Confirm appointment in backend
      const res = await axios.post(
        `${backUrl}/api/users/confirm-payment`,
        { appointmentId, paymentIntentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
console.log('payment res is;', res)
      if (res.data.success) {
        toast.success("Appointment confirmed!");
        router.push("/auth/profile");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Could not confirm appointment.");
    }
  };

  useEffect(() => {
    confirmPayment();
  }, [searchParams]);

  return <h1>Processing Checkout...</h1>;
};

export default CheckoutPage;
