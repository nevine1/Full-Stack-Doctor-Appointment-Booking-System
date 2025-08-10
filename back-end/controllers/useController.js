import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const registerUser = async (req, res) => {
    
    try {
        const { name, email, phone, password } = req.body; 
        if (!name || !email || !phone || !password) {
            return res.json({
                success: false, 
                message: "This field is  required"
            })
        }
        //validation for email, name, pasword;
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
        
        const userInfo = {
            name, 
            email, 
            phone, 
            password: hashedPass, 
            date: new Date()
        }
           
        
        const regUser = new User(regUser);
        const user = await regUser.save();

        return res.json({
            success: success, 
            message: "New user is added", 
            data: user,
        })
    } catch (err) {
        return res.json({
            success: false, 
            message: "user can not register"
        })
    }
}

export { registerUser}