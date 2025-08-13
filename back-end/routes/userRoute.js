import express from 'express'
import  authUser  from '../middleware/authUser.js'
import { registerUser , loginUser , updateUser, userDetails} from '../controllers/userController.js';
const userRoute = express.Router();


userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/user-details', authUser, userDetails);
userRoute.post('/update', updateUser);


export default userRoute; 