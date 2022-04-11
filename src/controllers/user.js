import User from "../models/user";
import sendEmail from "../helper/sendEmail";
import sendResetEmail from "../helper/sendResetEmail";
// import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
const _ = require("lodash");
require("dotenv").config();
exports.createUser = async (req, res) => {
  const user = new User({
    businessName: req.body.businessName,
    ownerName: req.body.ownerName,
    address: req.body.address,
    businessType: req.body.businessType,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    // role: req.body.role,
  });
  try {
    const data = await user.save();
    // const token = await user.generateAuthToken();
    const userData = user;
    const email = await sendEmail(userData);

    res.status(200).send({
      message: email,
      user: data,
      token: token,
    });
    console.log(userData);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({message:"sigup failed, try again!!!"},error.message);
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    
    const token = await user.generateAuthToken();
    res.status(200).send({ message: "Login successfully", user });
  } catch (error) {
    res.status(404).send({ message: "Login failed, check your email and password try again" },error.message);
  }
  next();
};


exports.updateUser = async(req,res)=>{
  const user = new User({
      _id:req.query.id,
      businessName: req.body.businessName,
      ownerName: req.body.ownerName,
      address: req.body.address,
      businessType: req.body.businessType,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
      // role: req.body.role,
  });
  User.updateOne({_id:req.query.id},user).then(()=>{
       res.status(201).send({
           message:'User updated successfully',
           user
       });
  }).catch((error)=>{
      res.json({
          error:error
      });
  })
}

exports.logout = async(req,res)=>{
  try {
      const {token}=req;
      const userId=req.user._id.toString()
      const users = await User.findOne({_id:userId}).catch((error) => {
          return res.status(400).json({
              error: error,
              
          });
      })
      if(users.token !== token){
        return  res.status(404).send({
          message: 'Token not found',
      })
      }

      await User.findByIdAndUpdate(req.user._id,{token:null})
      res.status(200).send({ message: "Logout successful!" });
          
  } catch (error) {
      return res.status(500).send("Server error");
  }
}
exports.findOne = async (req, res) => {
    try {
      const user = await User.findById(req.query.id);
      res.status(201).send({
        message: "operation successful",
        user,
      });
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  exports.deleteUser = async (req, res) => {
    try {
      await User.deleteOne({ _id: req.query.id });
      return res.status(201).json("delete successfully");
    } catch (error) {
      return res.status(404).send({ message: "delete failed" },error.message);
    }
  };
exports.findAll = async (req, res) => {
  await User.find().then((data) => {
    res.status(200).send({
      message: "Users found are:",
      data,
    });
  });
};
exports.forgetPassword = (req, res) => {
  try {
    const { email } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ error: "user of this email does not exists" });
      }

      const restoken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "20m",
      });
      req.token = restoken;
      req.user = user;
      const mailOption = {
        email: email,
        subject: "Reset your password",
        html: `<p>Dear User, you  requested a password reset to restore access to your account.</p> <br> <a href=${process.env.FRONTEND_URL}/userRoute/reset-password?token=${restoken}><b>Reset password Link</b></a>`,
        name: "Welcome to My Books, Click on the link below to reset  your Password",
        body: `<a href=${process.env.FRONTEND_URL}/userRoute/verification?token=${restoken}>Link</a>`,
      };
      const userData = {
        user,
        resentLink: restoken,
      };
      console.log(userData);
      // // user.resentLink=token

      return User.updateOne({ _id: user._id }, userData, (err, success) => {
        if (err) {
          return res.status(400).json({ error: err });
        } else {
          // console.log(transport)
          const sendmail = sendResetEmail(mailOption, restoken);
          if (sendmail) {
            return res
              .status(200)
              .json({
                message: "Email has been sent, kindly follow the instructions",
                userData,
              });
          }
        }
      });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
exports.resetPassword = (req, res) => {
  const { resentLink, newPassword } = req.body;
  if (resentLink) {
    jwt.verify(
      resentLink,
      process.env.SECRET_KEY,
      function (error, decodedToken) {
        if (error) {
          return res.json({
            error: "incorrect token or it is expired",
          });
        }
        User.findOne({ resentLink }, (err, user) => {
          if (err || !user) {
            return res
              .status(400)
              .json({ error: " user of this token does not exists" });
          }
          const obj = {
            ...user,
            password: newPassword,
          };
          user = _.extend(user, obj);
          // res.json({user})
          user.save((err, result) => {
            if (result) {
              return res
                .status(200)
                .json({ message: "Your password has been changed" });
            } else {
              return res.status(400).json({ error: "reset password error" });
            }
          });
        });
      }
    );
  } else {
    return res.status(400).json({ error: "Authentication Error" });
  }
};
exports.verify = async (req, res) => {
  const token = req.query.token;
  const id = jwt.verify(token, process.env.SECRET_KEY);
  const userExist = await User.findOne({ _id: id });
  if (!userExist)
    return res.status(404).json({ message: "User could not be found" });
  if (userExist.isVerified === true)
    return res.status(200).json({ message: "The user is verified" });
  const verifiedAccount = await User.updateOne(
    { _id: id },
    { isVerified: true }
  );
  return res.status(200).json({
    message: "Account verified sucessfully",
    verifiedAccount,
  });
};
