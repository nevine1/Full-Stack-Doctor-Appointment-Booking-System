import Appointment from "../models/appointmentModel.js";
import Doctor from '../models/doctorModel.js'
import Stripe from 'stripe'



//pay online for the doc's appointment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const onlinePayment = async (req, res) => {

  try {
      const { appointmentId  } = req.body; //this appointmentId comes from the id of the booked slotTime when click on it to pay at the front end
      const appointment = await Appointment.findById(appointmentId).populate("doctorId");

if (!appointment) {
  return res.json({
    success: false,
    message: "This appointment not found!",
  });
}

const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items: [
    {
      price_data: {
        currency: "usd",
        unit_amount: appointment.doctorId.fees * 100, 
        product_data: {
          name: `Appointment with ${appointment.doctorId.name}`,
          description: `For ${appointment.doctorId.speciality} on ${appointment.slotDate} at ${appointment.slotTime}`,
          images: [appointment.doctorId.image],
        },
      },
      quantity: 1,
    },
  ],
  mode: "payment",
  success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/myAppointments/checkout?success=true&appointmentId=${appointment._id}&paymentIntentId={CHECKOUT_SESSION_PAYMENT_INTENT}`,
  cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/myAppointments/checkout?canceled=true`,
});

// Send session details to frontend
return res.json({
  success: true,
  url: session.url,
  appointmentId: appointment._id,
  paymentIntentId: session.payment_intent, // ✅ useful for refunds
});
      
  } catch (err) {
    return res.json({
      success: false, 
      message: err.message
    })
  }
}

const confirmPayment = async (req, res) => {
  try {
    const { appointmentId, paymentIntentId } = req.body;
console.log(paymentIntentId)
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.onlinePayment = true;    // true means it is paid 
    appointment.paymentIntentId = paymentIntentId; //  needed for refunds
    appointment.isCompleted = true;      
    await appointment.save();
 console.log('foncifakjpay men is;', appointment)
    res.json({
      success: true,
      message: "Appointment confirmed & paid", appointment
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: "Error confirming payment",
      error: error.message
    });
  }
};


export {
    confirmPayment,
    onlinePayment

 }