const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://Longson2003s:sonn2003@cluster0.xv9rvsd.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB", err);
  });

app.listen(port,() => {
    console.log("server is running on port 8000");
});



const User = require("./models/user");
const Order = require("./models/order");
const { send } = require("process");



//funtions to send verification email to the user
const sendVerificationEmail = async (email,verificationToken) => {
  //create a nodemailer transport 

  const  transport = nodemailer.createTransport({
    //configuration the email service
    service:"gmail",
    auth:{
      user:"longson20062003@gmail.com",
      pass:""
    }
  })
}

//enpoint to register in the app
app.post("/register",async(req,res) => {
  try{
    const {name,email,password} = req.body;

    //check if the email is already registered
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"email already registered"});
    }


    //create a new user
    const newUser = new User({name, email, password});

    //generte and store the verification token 
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();
    //send verification token email to the user
    sendVerificationEmail(newUser.email,newUser.verificationToken);
  }catch(error){
    console.log("error registering user", error);
    res.status(500).json({message:"register failed"});
  }
})