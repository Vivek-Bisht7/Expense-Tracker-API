const User = require('../models/userModel');
const bcrypt = require('bcrypt');

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
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

module.exports = {userRegistration};
