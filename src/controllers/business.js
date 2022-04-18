import Business from "../models/business";
import sendEmail from "../helper/sendEmail";
import sendResetEmail from "../helper/sendResetEmail";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import uploader from "../helper/storage";
const _ = require("lodash");
require("dotenv").config();
exports.createUser = async (req, res) => {
  const images=req.files.photo;
  const response=await uploader(images.tempFilePath)
  console.log("images path",response)
  const business = new Business({
    business_name: req.body.business_name,
    owner_name: req.body.owner_name,
    address: req.body.address,
    category: req.body.category,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    photo:response.secure_url,
    website:req.body.website,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
    // role: req.body.role,
  });
  try {
    const data = await business.save();
    const token = await business.generateAuthToken();
    const businessData = business;
    const email = await sendEmail(businessData,token);

    res.status(200).send({
      message: email,
      user: data,
      token: token,
    });
    console.log(businessData);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({message:"signup failed, try again!!!"},error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const business = await Business.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await business.generateAuthToken();

    res.status(201).send({
      message: "operation successful",
      business,
      token,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateUser = async(req,res)=>{
  const images=req.files.photo;
  const response=await uploader(images.tempFilePath)
  console.log("images path",response)
  const business = new Business({
    _id:req.query.id,
    business_name: req.body.business_name,
    owner_name: req.body.owner_name,
    address: req.body.address,
    category: req.body.category,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    photo:response.secure_url,
    website:req.body.website,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
    // role: req.body.role,
  });
  Business.updateOne({_id:req.query.id},business).then(()=>{
       res.status(200).send({
           message:'User updated successfully',
           business
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
      const businessId=req.business._id.toString()
      const business = await Business.findOne({_id:businessId}).catch((error) => {
          return res.status(400).json({
              error: error,
              
          });
      })
      if(business.token !== token){
        return  res.status(404).send({
          message: 'Token not found',
      })
      }

      await Business.findByIdAndUpdate(req.business._id,{token:null})
      res.status(200).send({ message: "Logout successful!" });
          
  } catch (error) {
      return res.status(500).send("Server error");
  }
}
exports.findOne = async (req, res) => {
    try { 
      const business = await Business.findById(req.query.id);
      res.status(200).send({
        message: "operation successful",
        business,
      });
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  exports.deleteUser = async (req, res) => {
    try {
      await Business.deleteOne({ _id: req.query.id });
      return res.status(200).json("delete successfully");
    } catch (error) {
      return res.status(404).send({ message: "delete failed" },error.message);
    }
  };
exports.findAll = async (req, res) => {
  await Business.find().then((data) => {
    res.status(200).send({
      message: "business found are:",
      data,
    });
  });
};


exports.forgetPassword= async (req,res)=>{
  try {
      const {email}=req.body;
      await Business.findOne({email},async (err,business)=>{
          if(err || !business){
              return res.status(400).json({error:"business of this email does not exists"})
          }
          const businessInfo = {
              token:jwt.sign({_id: business._id},process.env.SECRET_KEY,{expiresIn:'20m'}),
              email:business.email
          }
          await sendResetEmail(businessInfo,'forgotPassword').then(()=>{
              console.log('Email sent successfully',businessInfo)
          }).catch((err)=>{
              console.log(err)
          })
          return res.status(200).send({message:'Token Sent Successfully',businessInfo})
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
          const businessInfo = await Business.findOne({_id:data._id.toString()})
          if(!businessInfo) return res.status('404').send({message:"User not found"})
          const newHashedPassword = await bcrypt.hash(newPassword, 8);
          await Business.findByIdAndUpdate(businessInfo._id,{password:newHashedPassword}).catch((err)=>{return res.status(403).send({message:'failed to update'})})
          return res.status('201').send({message:'Password changed successfully'})
      }else{
          return res.status('404').send({message:"Business not found"})
      }
  }catch(error){
      return res.status(500).send(error.message)
  } 
}

 
exports.verify = async (req, res) => {
  const token = req.query.token;
  const id = jwt.verify(token, process.env.SECRET_KEY);
  const businessExit = await Business.findOne({ _id: id });
  if (!businessExit)
    return res.status(404).json({ message: "Business could not be found" });
  if (businessExit.isVerified === true)
    return res.status(200).json({ message: "The business is verified" });
  const verifiedAccount = await Business.updateOne(
    { _id: id },
    { isVerified: true }
  );
  return res.status(200).json({
    message: "Account verified sucessfully",
    verifiedAccount,
  });
};
