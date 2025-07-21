
import validator from 'validator';
import bcrypt from 'bcrypt'
import Doctor from '../models/doctorModel.js';
import upload from '../middleware/multer.js';
import {v2 as cloudinary} from 'cloudinary'
//API for adding new doctor 
const addDoctor = async (req, res) => {
  try {
      
      const { name, email, password, image, speciality, degree, fees, experience, about, available, address, slots_booked } = req.body;
    const imageFile = req.file;
    
    //check if doctor data are available or not; 
   /*  if (!name || !email || !password || !image || !speciality || !degree || !fees || !experience || !about ||  !address ) {
      return resp.json({
        success: false,
        message: "Missing details"
      })
     
    } */
    
    //validate email format 
     if (!validator.isEmail(email)) {
        return res.json({
          success: false, 
          message: "please enter a valid email"
        })
    }
    
    //validate strong password
    const strongPassword = validator.matches(password, /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/);
    if (password < 6 ) {
      return res.json({
        success: false, 
        message: "Password should be more than 6 characters"
      })
    }

    //crypt password 
    const salt = await bcrypt.genSalt(10)
    const hashPw = bcrypt.hash(password, salt);
    
    //uploading image file 
    /* const uploadedImage = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = uploadedImage.secure_url;  */
      const dataUri = bufferToDataUri(req.file);
      const uploadedImage = await cloudinary.uploader.upload(dataUri, {
        folder: 'doctors',
        resource_type: 'image'
      });
    //creating doctor data 
    const doctorData = {
      name, email, speciality, degree, fees, experience, about, available, slots_booked,
      password: hashPw, 
      image: imageUrl,
      address: JSON.parse(address), 
      date: Date.now()
    }
    const newDoctor = new Doctor(doctorData);
    //save newDoctor object to the database 
    await newDoctor.save();
    return res.json({
      success: true, message: "New doctor added to database", data: newDoctor
    })
    } catch (error) {
    return res.json({
      success: false, 
      message: error.message
        })
    }
}

export default addDoctor
