import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Function to create a token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login user
const loginUser = async (req, res) => {
    // Your login logic here
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User Doesn't exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(errorr)
        res.json({success:false,message:"Error"})
        
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        // Checking if user already exists
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) { // Fixed the spelling mistake "lenght" to "length"
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); // Changed "res,json" to "res.json"
    }
};

export { loginUser, registerUser };
