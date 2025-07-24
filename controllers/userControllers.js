const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

require('dotenv').config();

const userRegistration = async (req,res)=>{
    try{
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required.."});
        }

        const existingUser = await User.findOne({ $or : [{username},{email}]});
        if(existingUser){
            return res.status(400).json({message:"Either username or email already exist.."});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({username,email,password:hashedPassword});
        await user.save();

        console.log("User registered successfullly");
        return res.status(201).json({success:true,message:"User registered successfullly"});
    }
    catch(err){
        console.log("Error while user registration : " + err.message);
        res.status(500).json({success:false,message:"Internal server error in Registration"});
    }
}

const userLogin = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){

            if (!process.env.JWT_SECRET) {
                console.error("JWT_SECRET is not defined in environment variables");
                return res.status(500).json({ message: "Internal server error" });
            }

            let token =  jwt.sign({id:user._id},process.env.JWT_SECRET);

            res.cookie("token",token , {
                httpOnly : true,
                maxAge : 24*60*60*1000
            });

            return res.status(200).json({message:"OK"});
        }
        else{
            return res.status(401).json({message:"Invalid Email or password"});
        }
    }
    catch(err){
        return res.status(500).json("Internal server error in Login")
    }

}

module.exports = {userRegistration , userLogin};
