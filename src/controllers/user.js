import User from "../models/user";
import sendEmail from "../helper/sendEmail";
import sendResetEmail from "../helper/sendResetEmail";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
const _ = require("lodash");
require("dotenv").config();
exports.createUser = async (req, res) => {
  const user = new User({
    business_name: req.body.business_name,
    owner_name: req.body.owner_name,
    address: req.body.address,
    business_type: req.body.business_type,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    // role: req.body.role,
  });
  try {
    const data = await user.save();
    const token = await user.generateAuthToken();
    const userData = user;
    const email = await sendEmail(userData,token);

    res.status(200).send({
      message: email,
      user: data,
      token: token,
    });
    console.log(userData);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({message:"signup failed, try again!!!"},error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.status(201).send({
      message: "operation successful",
      user,
      token,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateUser = async(req,res)=>{
  const user = new User({
      _id:req.query.id,
      business_name: req.body.business_name,
      owner_name: req.body.owner_name,
      address: req.body.address,
      business_type: req.body.business_type,
      phone: req.body.phone,
      password: req.body.password,
      // role: req.body.role,
  });
  User.updateOne({_id:req.query.id},user).then(()=>{
       res.status(200).send({
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
      res.status(200).send({
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
      return res.status(200).json("delete successfully");
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


exports.forgetPassword= async (req,res)=>{
  try {
      const {email}=req.body;
      await User.findOne({email},async (err,user)=>{
          if(err || !user){
              return res.status(400).json({error:"user of this email does not exists"})
          }
          const userInfo = {
              token:jwt.sign({_id: user._id},process.env.SECRET_KEY,{expiresIn:'20m'}),
              email:user.email
          }
          await sendEmail(userInfo,'forgotPassword').then(()=>{
              console.log('Email sent successfully',userInfo)
          }).catch((err)=>{
              console.log(err)
          })
          return res.status(200).send({message:'Token Sent Successfully',userInfo})
      }).clone()
  } catch (error) {
      return res.status(500).send(error.message)
  }
}

exports.resetPassword=async (req,res)=>{
  try{
      const{token,newPassword}=req.body;
      if(token){
          const data = await jwt.verify(token,process.env.SECRET_KEY)
          const userInfo = await User.findOne({_id:data._id.toString()})
          if(!userInfo) return res.status('404').send({message:"User not found"})
          const newHashedPassword = await bcrypt.hash(newPassword, 8);
          await User.findByIdAndUpdate(userInfo._id,{password:newHashedPassword}).catch((err)=>{return res.status(403).send({message:'failed to update'})})
          return res.status('201').send({message:'Password changed successfully'})
      }else{
          return res.status('404').send({message:"User not found"})
      }
  }catch(error){
      return res.status(500).send(error.message)
  } 
}

 
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
