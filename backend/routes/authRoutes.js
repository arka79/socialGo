const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const router = express.Router();


router.post("/signup" , async(req , res)=>{
     try{
         const {username , email , password} = req.body;
 
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(email)) {
             return res.status(400).json({ error: "Invalid email format" });
         }
 
         if (!password || password.length < 6) {
             return res.status(400).json({ error: "Password must be at least 6 characters long" });
         }
 
         const userexist = await User.findOne({email});
         if(userexist) return res.status(409).json ({error: "User already exists need to signIn"});
 
         const salt = await bcrypt.genSalt(10);
         const hashedpass = await bcrypt.hash(password , salt);
         const user = await User.create({
            username,
            email,
            password: hashedpass,
         });
         
         res.json({message : "User created successfully"});
     }catch(error){
        console.error("error in user signup" , error);
        res.status(500).json({ error: "Internal server error" });
     }
  });


router.post("/login" , async(req , res)=>{
    try {
        const {username , email , password} = req.body;
 
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({error : "User not found"});
 
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.status(401).json({error : "Password not matching"});
 
        const token = jwt.sign(
            {id: user._id , username : user.username},
            process.env.JWT_SECRET,
            {expiresIn: "7d"},
        );
  
        res.json({
            message : "Login Success",
            token,
            user:{
               id: user._id,
               username : user.username,
            },
        });
 
    } catch (error) {
         res.status(500).json({error : error.message});
        
    }
 });

module.exports = router;