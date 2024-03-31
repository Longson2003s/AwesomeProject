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

app.listen(port, () => {
  console.log("server is running on port 8081");
});

const User = require("./models/user");
const Order = require("./models/order");
const { send } = require("process");

//funtions to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport

  const transporter = nodemailer.createTransport({
     //configure the email service 
     service:"gmail",
     auth:{
      user:"longson20062003@gmail.com",
      pass:""
     }
  });

  //compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "email verification",
    text: `please click the following link to verify your email : http://localhost:8081/verify/${verificationToken}`,
  };

  //send the email
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log("error sending verification email", error);
  }
};
//enpoint to register in the app
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already registered" });
    }

    //create a new user
    const newUser = new User({ name, email, password });

    //generte and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();
    //send verification token email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "register failed" });
  }
});

//end point to verify email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //find the user with the give verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "invalid verification token" });
    }

    //mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;


  await user.save();

  res.status(200).json({ message:"email verified successfully"})
  } catch (error) {
    res.status(500).json({ message: "email verification filed" });
  }
});

const generateSecretKey =  () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
}

const secretKey = generateSecretKey();

//end ponit login the user!
app.post("/login,async", async (req,res) => {
    try{
      const {email,password} = req.body;

      //check if the user exits
      const user = await User.findOne({email});
      if(!user){

        return res.status(401).json({message:"invalid email or password"});

      }
      //check if the password is correct
      if(user.password !== password){
        return res.status(401).json({message:"invalid password"});
      }

     
      //genrate a token 
      const token = jwt.sign({userId:user.id},secretKey);

      res.status(200).json({token})
    }catch(error){
      res.status(500).json({message:"login failed"});
    }
})