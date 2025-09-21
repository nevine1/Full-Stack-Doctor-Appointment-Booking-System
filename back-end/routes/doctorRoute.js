import express from 'express';
import { getDoctors , getDoctorData, doctorLogin } from '../controllers/doctorController.js'


const doctorRoute = express.Router();

doctorRoute.get('/get-doctors', getDoctors);
doctorRoute.get('/get-doctor/:id', getDoctorData);
doctorRoute.post('/doctor-login', doctorLogin);

export default doctorRoute; 