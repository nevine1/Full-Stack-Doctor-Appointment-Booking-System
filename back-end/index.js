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
  'https://full-stack-doctor-appointment-booki-ten.vercel.app',
  'http://localhost:3000', // Include  local dev port if needed
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // This matches the 'include' mode from your frontend
}));

app.use(cors())
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