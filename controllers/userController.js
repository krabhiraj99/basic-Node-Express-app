const asyncHandler = require('express-async-handler');
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds =  10;
require('dotenv').config();


const registerUser = asyncHandler(async (req, res) => {
    const {userName, email, password} = req.body;
    if(!userName || !email || !password){
        res.status(400);
        throw new Error("All Field are required");
    }else{
        const hashedPassword =  await bcrypt.hash(password, saltRounds);
    
        const user = await User.create({
            userName,
            email, 
            password: hashedPassword,
        });
        
        console.log(`user created ${user}`);
        res.status(200).send({userName, email});
    }
});
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Email and Password are Required to login");
    }

    const user = await User.find({email:email});
  
    if(user && await bcrypt.compare(password, user[0].password)){

        const accessToken = jwt.sign({
            user: {
                userName: user[0].userName,
                email: user[0].email,
                _id: user[0]._id,
            }
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: "1m",
        }
        );

        console.log("Access Token >>", accessToken);
        // res.status(200).send({data : {
        //     userName: user[0].userName,
        //     email: user[0].email
        // }});
        res.status(200).send({
            accessToken
        });

        // res.status(200).send({user});
    }
});
const currentUser = asyncHandler(async (req, res) => {
    res.json({"msg" : "Current user details"});
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};