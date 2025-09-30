import express from 'express';
import {
    getDoctors, getDoctorData,
    doctorLogin, getDoctorAppointments, 
    doctorCompleteAppointment,
    doctorCancelAppointment
} from '../controllers/doctorController.js'
import authDoctor  from '../middleware/authDoctor.js'

const doctorRoute = express.Router();

doctorRoute.get('/get-doctors', getDoctors);
doctorRoute.get('/get-doctor/:id', getDoctorData);
doctorRoute.post('/doctor-login', doctorLogin);
doctorRoute.get('/doctor-appointments', authDoctor, getDoctorAppointments);
doctorRoute.post('/doctor-complete-appointment', authDoctor, doctorCompleteAppointment);
doctorRoute.post('/doctor-cancel-appointment', authDoctor, doctorCancelAppointment);

export default doctorRoute; 