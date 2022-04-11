import express from "express";
const route=express.Router()
import userRoute from './user'
import adminRoute from './admin'
route.use('/user',userRoute)
route.use('/admin',adminRoute)
module.exports=route