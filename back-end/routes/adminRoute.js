
import express from 'express';
import {addDoctor, loginAdmin} from '../controllers/adminController.js';
import upload from '../middleware/multer.js';

const adminRoute = express.Router();


adminRoute.post('/add-doctor', upload.single('image'), addDoctor);
adminRoute.post('/login-admin', loginAdmin);
export default adminRoute;
