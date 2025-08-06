import validator from 'validator';
import bcrypt from 'bcrypt';
import Doctor from '../models/doctorModel.js'; // Ensure this path is correct
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
  try {
    //  req.body
    const {
      name, email, password, speciality,
      degree, fees, experience, about, available, address, slots_booked
    } = req.body;

    const imageFile = req.file;

    // --- Validation 
    if (!imageFile || !imageFile.path) {
      console.error("Validation Error: Image file or path is missing.");
      return res.status(400).json({ success: false, message: "Image file is missing." });
    }

    if (!email) { 
      console.error("Validation Error: Email is missing.");
      return res.status(400).json({ success: false, message: "Email is required." });
    }
    if (!validator.isEmail(email)) {
      console.error("Validation Error: Invalid email format.");
      return res.status(400).json({ success: false, message: "Please enter a valid email." });
    }

    if (!password) { 
      console.error("Validation Error: Password is missing.");
      return res.status(400).json({ success: false, message: "Password is required." });
    }
    if (password.length < 5) {
      console.error("Validation Error: Password too short.");
      return res.status(400).json({ success: false, message: "Password should be more than 5 characters." });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(password, salt);

    // Upload to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      folder: "doctors" // Ensure this folder exists or is desired in Cloudinary
    });

    // Delete local file after successful Cloudinary upload
    if (fs.existsSync(imageFile.path)) {
      fs.unlinkSync(imageFile.path);
    } else {
      console.warn(`Warning: Local file not found for deletion: ${imageFile.path}`);
    }

    const imageUrl = imageUpload.secure_url;

    // Prepare doctor data for saving
    const doctorData = {
      name,
      email,
      password: hashPw,
      image: imageUrl,
      speciality,
      degree,
      fees: Number(fees), 
      experience,
      about,
      available, //available === 'true', // Ensure conversion to Boolean from string "true" / "false"
      slots_booked, //Number(slots_booked || 0), // Default to 0 if not provided, convert to Number
      // Safely parse address, assuming it comes as a JSON string
      address: address ? JSON.parse(address) : {}, // Handle case where address might be missing or not a string
      date: Date.now()
    };

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    console.log("Doctor successfully added:", newDoctor.email);
    return res.status(201).json({ // Use 201 for successful resource creation
      success: true,
      message: "New doctor added to database",
      data: newDoctor
    });

  } catch (error) {
    console.error("CATCH BLOCK ERROR in addDoctor:", error); // Log the full error object
    // Provide more descriptive error messages based on the error type if possible
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: `Validation failed: ${error.message}` });
    } else if (error.message.includes("Unexpected token") || error.message.includes("JSON")) {
      return res.status(400).json({ success: false, message: "Error parsing address field. Make sure it's valid JSON." });
    }
    return res.status(500).json({ // Use 500 for internal server errors
      success: false,
      message: error.message || "An unknown internal server error occurred."
    });
  }
};

//get all doctors from the database for admin panel
const getDoctors = async (req, res) => {
  try {
    
    const doctors = await Doctor.find().select('-password')
    
    return res.json({
      success: true, data: doctors
    })
  } catch(err) {
    return res.json({
      success: false,
      message: err.message
    })
  }
}
//api for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.json({
        success: true,
        message: "Admin successfully logged in",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: 'Email or password is invalid',
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

export {
  addDoctor, adminLogin,
  getDoctors
};