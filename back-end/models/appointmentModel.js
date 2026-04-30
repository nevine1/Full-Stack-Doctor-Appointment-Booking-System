import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   // if you have a User model
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",    //  tells Mongoose to link to Doctor model
        required: true,
    },
    slotDate: {
        type: Date,
        required: true,
    },
    slotTime: {
        type: String,
        required: true,
    },
    userData: {
        type: Object,
        required: true,
    },
    docData: {
        type: Object,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    canceled: {
        type: Boolean,
        default: false,
    },
    onlinePayment: {
        type: Boolean,
        default: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },

})

const appointmentModel = mongoose.model.Appointment || mongoose.model("Appointment", appointmentSchema);
export default appointmentModel;