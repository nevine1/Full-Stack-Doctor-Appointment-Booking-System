import express from 'express';
import { getDoctors } from '../controllers/doctorController.js'


const doctorRoute = express.Router();

doctorRoute.get('/get-doctors', getDoctors);

export default doctorRoute; 