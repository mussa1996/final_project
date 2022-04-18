import express from "express";
const route=express.Router()
import userRoute from './user'
import adminRoute from './admin'
import productRoute from './product'
import awardRoute from './awards'
import categoryRoute from './category'
import serviceRoute from './internal_services'
route.use('/business',userRoute)
route.use('/admin',adminRoute)
route.use('/product',productRoute)
route.use('/award',awardRoute)
route.use('/category',categoryRoute)
route.use('/service',serviceRoute)
module.exports=route