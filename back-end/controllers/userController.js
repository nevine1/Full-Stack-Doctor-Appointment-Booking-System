import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js'
import appointment from '../models/appointmentModel.js';
import { v2 as cloudinary } from 'cloudinary'
const registerUser = async (req, res) => {
    
    try {
        const { name, email, password } = req.body; 
        
        if (!name || !email || !password) {
            return res.json({
                success: false, 
                message: "This field is  required"
            })
        }
        //validation for email, name, password;
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
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt)

        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.json({
                success: false,
                message: "This email is already existing, please use another email"
            })
        }
        
        const userData = {
            name, 
            email, 
            password: hashedPass, 
            date: new Date(), 
        }
        
        const regUser = new User(userData);
        const user = await regUser.save();
        const token = jwt.sign({ id: user._id } , process.env.JWT_SECRET)
        return res.json({
            success: true, 
            message: "New user is added", 
            data: user, 
            token
        })
        
    } catch (err) {
        return res.json({
            success: false, 
            message: err.message
        })
    }
}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
             return res.json({
                success: false, 
                message: "User is not existing",
            })
        }

        const matchedPass = await bcrypt.compare(password, user.password);

        if (matchedPass) {
            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
             return res.json({
                success: true, 
                message: "user logged in successfully",
                 data: user, 
                token
            })
        } else {
            return res.json({
                success: false, 
                message: "user email or password is incorrect",
            }) 
        }
       
    } catch (err) {
        console.log(err.message)
        return res.json({
            success: false, 
            message: err.message
        })
    }
}

const userDetails = async (req, res) => {

    try {
        //getting the userId from the token 
        const userId = req.userId;
        console.log("userId from body:", userId);
        const userDetails = await User.findById(userId).select("-password");
        
        return res.json({
            success: true,
            data: userDetails
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}


/* const updateUser = async (req, res) => {
    try {
        const { userId, name, email, phone, address, DOB, gender } = req.body;
        const fileImage = req.file;

        // Make sure address is included in the validation check if it's a required field
        if ( !name || !email || !DOB || !phone || !gender) {
            return res.status(400).json({ // Use status code 400 for bad requests
                success: false,
                message: "Missing data"
            });
        }

        let updateData = {
            name,
            email,
            phone,
            DOB,
            gender,
            address: JSON.parse(address),
        };

        
        
        //  upload to Cloudinary first
        if (fileImage) {
            const uploadImage = await cloudinary.uploader.upload(fileImage.path, { resource_type: "image" });
            updateData.image = uploadImage.secure_url;
        }

        // Find the user by userId and update their details.
        // The { new: true } option is very important here to make the mongoose  return the updated document.
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
console.log('upated user is:', updatedUser)
        // Check if a user was actually found and updated
        if (!updatedUser) {
            return res.status(404).json({ // Use status code 404 for not found
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({ // Use status code 200 for a successful request
            success: true,
            message: 'User info updated successfully',
            data: updatedUser
        });

    } catch (err) {
        return res.json({ 
            success: false,
            message: err.message
        });
    }
}; */


const updateUser = async (req, res) => {
    try {
        const { userId, name, email, phone, address, DOB, gender } = req.body;
        const fileImage = req.file;

        // Log incoming request data for debugging
        console.log("Request body userId:", userId);
        console.log("Raw request body:", req.body);

        // Make sure address is included in the validation check if it's a required field
        if (!name || !email || !DOB || !phone || !gender) {
            return res.status(400).json({ // Use status code 400 for bad requests
                success: false,
                message: "Missing data"
            });
        }

        let updateData = {
            name,
            email,
            phone,
            DOB,
            gender,
            address: JSON.parse(address),
        };

        // Log what we’re about to update
        console.log("Update data object before DB update:", updateData);

        // If there’s an image, upload to Cloudinary first
        if (fileImage) {
            const uploadImage = await cloudinary.uploader.upload(fileImage.path, { resource_type: "image" });
            updateData.image = uploadImage.secure_url;
            console.log("Uploaded new image URL:", updateData.image);
        }

        // Find the user by userId and update their details.
        // The { new: true } option is very important here to make Mongoose return the updated document.
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        console.log("Updated user from DB:", updatedUser);

        // Check if a user was actually found and updated
        if (!updatedUser) {
            return res.status(404).json({ // Use status code 404 for not found
                success: false,
                message: 'User not found'
            });
        }

        
        return res.status(200).json({ // Use status code 200 for a successful request
            success: true,
            message: 'User info updated successfully',
            data: updatedUser
        });

    } catch (err) {
        console.error("Error in updateUser:", err.message);
        return res.json({ 
            success: false,
            message: err.message
        });
    }
};
//booking an appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await Doctor.findById(docId).select("-password");
        
        //check doctor availability 
        if (!doctor.available) {
            return res.json({
                success: false,
                message: "Doctor is not available right now, please try again later!"
            })
        }
        //if the doctor is available to book appointment
        const slots_booked = docData.slots_booked;

        //check if slot available 
        if (slots_booked[slotDate]) { //if the slots booked date is available 
            if (slots_booked[slotDate].includes(slotsTime)) { //and if slots_booked at this date has this time
                //this condition mean this date and time is already booked and look for another time
                return res.json({
                    success: false,
                    message: `To book at: ${slotTime} at this date ${slotDate} is already booked`,
                })
            } else {
                slots_booked[slotDate].push(slotTime)
            }

        } else {
            //if this date has slot times not booked
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime)
        }
        
        //after checking the slots_booked available or not , just get the user data to book
        const userData = await User.findById(userId).select("-password");
        //after getting the slots booked , delete the slots_booked from the doctor data
        delete docData.slots_booked

        const appointmentData = {
            userId, 
            doctorId, 
            userData, 
            docData,
            amount: docData.fees,
            slotTime, 
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointment(appointmentData);
        const appointment = await newAppointment.save();

        //save new slots data to doc data 
         await Doctor.findByIdAndUpdate(docId, { slots_booked });
        return res.json({
            success: true, 
            message: "New appointment has been booked"
        })
        
    } catch (err) {
        return res.json({
            success: false, 
            message: err.message
        })
    }
}

export { registerUser, loginUser , updateUser, userDetails, bookAppointment }