import express from 'express';
import { getDoctors , getDoctorData } from '../controllers/doctorController.js'


const doctorRoute = express.Router();

doctorRoute.get('/get-doctors', getDoctors);
doctorRoute.get('/get-doctor', getDoctorData);

export default doctorRoute; 