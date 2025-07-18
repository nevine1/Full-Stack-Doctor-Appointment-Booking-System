import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
const app = express();
const port = process.env.PORT || 4000 

//connect to mongodb
connectDB();

// using middleware 
app.use(express.json());
app.use(cors());

//end points 
app.get('/', (req, res) => {
    res.send("app is working")
})

//starting express app
app.listen(port, () => {
    console.log('Server is Starting at port #: ', port)
})