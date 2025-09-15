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
  const appointmentId = searchParams.get("appointmentId");
  const sessionId = searchParams.get("session_id");

  const confirmPayment = async () => {
    try {
      if (!success || !appointmentId || !sessionId) return;

      toast.info("Payment successful! Confirming appointment...");

      const sessionRes = await axios.get(
        `${backUrl}/api/payment/session/${sessionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const paymentIntentId = sessionRes.data.payment_intent;

      const res = await axios.post(
        `${backUrl}/api/users/confirm-payment`,
        { appointmentId, paymentIntentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Appointment confirmed!");
        router.push("/auth/profile");
      }
    } catch (err) {
      console.log(" Error confirming payment:", err.message);
      toast.error("Could not confirm appointment.");
    }
  };

  const cancelPayment = async () => {
    try {
      if (!canceled || !appointmentId) return;

      toast.warning("Payment canceled. Updating appointment...");

      await axios.post(
        `${backUrl}/api/users/cancel-payment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      router.push("/auth/myAppointments"); // go back to appointments page
    } catch (err) {
      console.log(" Error canceling payment:", err.message);
      toast.error("Could not cancel payment.");
    }
  };

  useEffect(() => {
    if (success) confirmPayment();
    if (canceled) cancelPayment();
  }, [searchParams]);

  if (success) return <h1>Processing Checkout...</h1>;
  if (canceled) return <h1>Payment canceled. Redirecting...</h1>;

  return <h1>Loading...</h1>;
};

export default CheckoutPage;
