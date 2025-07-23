// controllers/adminController.js
import validator from 'validator';
import bcrypt from 'bcrypt';
import Doctor from '../models/doctorModel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const addDoctor = async (req, res) => {
  try {
    const {
      name, email, password, speciality,
      degree, fees, experience, about, available, address, slots_booked
    } = req.body;

    const imageFile = req.file;
    
    console.log("🧪 FILE:", req.file);
    console.log("🧪 BODY:", req.body);
    
    if (!imageFile || !imageFile.path) {
      return res.json({ success: false, message: "Image file is missing" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 5) {
      return res.json({ success: false, message: "Password should be more than 5 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(password, salt);

    //  Upload to Cloudinary (optional)
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      folder: "doctors"
    });

    //  Delete local file after upload (optional)
    fs.unlinkSync(imageFile.path);

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashPw,
      image: imageUrl,
      speciality,
      degree,
      fees,
      experience,
      about,
      available,
      slots_booked,
      address: JSON.parse(address),
      date: Date.now()
    };

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    return res.json({
      success: true,
      message: "New doctor added to database",
      data: newDoctor
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

export default addDoctor;
