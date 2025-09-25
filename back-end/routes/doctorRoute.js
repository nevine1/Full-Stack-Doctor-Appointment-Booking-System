import express from 'express';
import {
    getDoctors, getDoctorData,
    doctorLogin , getDoctorAppointments
} from '../controllers/doctorController.js'
import doctorAuth  from '../middleware/authDoctor.js'

const doctorRoute = express.Router();

doctorRoute.get('/get-doctors', getDoctors);
doctorRoute.get('/get-doctor/:id', getDoctorData);
doctorRoute.post('/doctor-login', doctorLogin);
doctorRoute.get('/doctor-appointments', doctorAuth, getDoctorAppointments);

export default doctorRoute; 