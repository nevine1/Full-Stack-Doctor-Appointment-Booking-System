
import express from 'express';
import {addDoctor, loginAdmin} from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';

const adminRoute = express.Router();

//sending the authAdmin with adding new doctor , to send the token 
//which has the admin email and password , to can login later 
adminRoute.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRoute.post('/login-admin', loginAdmin);
export default adminRoute;
