import jwt from "jsonwebtoken";
import Business from "../models/business";
import User from "../models/user";
require("dotenv").config();

const adminAuth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        const business=await Business.findOne({_id:decoded._id,'tokens.token':token})
        if(!business || decoded.role!=='admin'){
            throw new Error()
        }
        req.token=token
        req.business=business
        next()
    }catch(e){
        res.status(401).send({error:'AUTHENTICATION_ERROR'})
    }
}

const userAuth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        const business=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!business || decoded.role!=='user'){
            throw new Error()
        }
        req.token=token
        req.business=business
        next()
    }catch(e){
        res.status(401).send({error:'AUTHENTICATION_ERROR'})
    }
}
const businessAuth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        const business=await Business.findOne({_id:decoded._id,'tokens.token':token})
        if(!business || decoded.role!=='business'){
            throw new Error()
        }
        req.token=token
        req.business=business
        next()
    }catch(e){
        res.status(401).send({error:'AUTHENTICATION_ERROR'})
    }
}
    
module.exports={
    adminAuth,
    userAuth,
    businessAuth
}