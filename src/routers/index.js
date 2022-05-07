import express from "express";
const route=express.Router()
import userRoute from './business'
import adminRoute from './admin'
import productRoute from './product'
import awardRoute from './awards'
import categoryRoute from './category'
import serviceRoute from './internal_services'
import usersRoute from './user'
route.use('/business',userRoute)
route.use('/admin',adminRoute)
route.use('/product',productRoute)
route.use('/award',awardRoute)
route.use('/category',categoryRoute)
route.use('/service',serviceRoute)
route.use('/user',usersRoute)
module.exports=route 