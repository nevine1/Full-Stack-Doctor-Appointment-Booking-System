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

        if ( !name || !email || !DOB || !phone   || !gender) {
            return res.json({
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
           //address: JSON.parse(address) 
        };

        // If there's an image, upload to Cloudinary first
        if (fileImage) {
            const uploadImage = await cloudinary.uploader.upload(fileImage.path, { resource_type: "image" });
            updateData.image = uploadImage.secure_url;
        }

        //find the user by userId , then update his details
        const updatedUser = await User.findByIdAndUpdate(userId, updateData);
        // new: true , it makes the mongodb updated the old data with the new one 
        return res.json({
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