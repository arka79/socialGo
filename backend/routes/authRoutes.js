const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const router = express.Router();


router.post("/signup" , async(req , res)=>{
     try{
         const {username , email , password} = req.body;

         const userexist = await User.findOne({email});
         if(userexist) return res.json ({error: "User already exists need to signIn"});

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
     }
});


router.post("/login" , async(req , res)=>{
    try {
        const {username , email , password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.json({error : "User not found"});

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.json({error : "Password not matching"});

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
         res.json({error : error.message});
        
    }
});

module.exports = router;