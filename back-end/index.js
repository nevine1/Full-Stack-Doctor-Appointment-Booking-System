import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoute from './routes/adminRoute.js';


const app = express();
const port = process.env.PORT || 4000 

// using middleware 
app.use(express.json()); // <--- This parses JSON bodies
app.use(cors());
app.use(express.urlencoded({ extended: true })); // <--- This parses URL-encoded bodies
app.use('/uploads', express.static('uploads'));
//connect to mongodb and cloudinary 
connectDB();
connectCloudinary()
//api end points 
app.use('/api/admin', adminRoute) // <--- Multer middleware is applied within adminRoute.js

app.get('/', (req, res) => {
    res.send("app is working")
})
//starting express app
app.listen(port, () => {
    console.log('Server is Starting at port #: ', port)
});