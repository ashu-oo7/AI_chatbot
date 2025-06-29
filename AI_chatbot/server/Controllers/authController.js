import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async(req,res)=>{
    try{
        const {firstName, lastName, email, password} = req.body;

        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }   

        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({firstName, lastName, email, password: hashedPassword});
        res.status(201).json({
            message: "User registered successfully",
        });
    }
    catch(err){
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Internal server error" });
    }

}

const login  = async(req,res) =>{
    try{

        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true, secure: true });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    }
    catch(err){
        console.error("Error logging in user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export  { register, login };