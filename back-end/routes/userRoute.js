import express from 'express'
import  authUser  from '../middleware/authUser.js'
import {
    registerUser, loginUser, updateUser,
    userDetails, bookAppointment, getUserAppointments,
    cancelAppointment
} from '../controllers/userController.js';
import  upload from '../middleware/multer.js'
const userRoute = express.Router();


userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/user-details', authUser, userDetails);
userRoute.put('/update-user',upload.single('image'), authUser, updateUser); //use upload because user data has image file to update(form-data)
userRoute.post('/book-appointment', authUser, bookAppointment);
userRoute.post('/get-appointment', authUser, getUserAppointments);
userRoute.post('/cancel-appointment', authUser, cancelAppointment);

export default userRoute; 