import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary'
const registerUser = async (req, res) => {
    
    try {
        const { name, email,  password } = req.body; 
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


const updateUser = async (req, res) => {
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
};
export { registerUser, loginUser , updateUser, userDetails }