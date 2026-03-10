import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoute from './routes/adminRoute.js';
import doctorRoute from './routes/doctorRoute.js';
import userRoute from './routes/userRoute.js';
import paymentRoute from './routes/paymentRoute.js';

const app = express();
const port = process.env.PORT || 5000

// using middleware 
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://full-stack-doctor-appointment-booki-ten.vercel.app",
  "https://full-stack-doctor-appointment-booking-system-d8kozoegn.vercel.app",
  "https://full-stack-doctor-appointment-booking-system-v6je-r7963bujl.vercel.app",
  "https://full-stack-doctor-appointment-booki-six.vercel.app/",
  "https://full-stack-doctor-appointment-booking-system-v6je-cnexvwsg2.vercel.app",
  "https://full-stack-doctor-appointment-book-git-d0c86b-nevine1s-projects.vercel.app",
  "https://full-stack-doctor-appointment-booking-system-v6je-9ceczkts2.vercel.app"

];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.use(express.urlencoded({ extended: true })); // <--- This parses URL-encoded bodies
app.use('/uploads', express.static('uploads'));
//connect to mongodb and cloudinary 
connectDB();
connectCloudinary()



//api end points 
app.use('/api/admin', adminRoute) // <--- Multer middleware is applied within adminRoute.js
app.use('/api/doctors', doctorRoute);
app.use('/api/users', userRoute);
app.use('/api/payment', paymentRoute);


app.get('/', (req, res) => {
  res.send("app is working")
})
//starting express app
app.listen(port, () => {
  console.log('Server is Starting at port #: ', port)
});