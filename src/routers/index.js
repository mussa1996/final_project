import express from "express";
const route=express.Router()
import userRoute from './user'
import adminRoute from './admin'
import productRoute from './product'
import addressRoute from './address_obj'
import awardRoute from './awards'
import categoryRoute from './category'
import hourRoute from './hours'
import imageRoute from './images'
import serviceRoute from './internal_services'
import photoRoute from './photo'
import subcategoryRoute from './subcategory'
import subtypeRoute from './subtype'
import weekRoute from './week_ranges'
route.use('/user',userRoute)
route.use('/admin',adminRoute)
route.use('/product',productRoute)
route.use('/address',addressRoute)
route.use('/award',awardRoute)
route.use('/category',categoryRoute)
route.use('/hour',hourRoute)
route.use('/image',imageRoute)
route.use('/service',serviceRoute)
route.use('/photo',photoRoute)
route.use('/subcategory',subcategoryRoute)
route.use('/subtype',subtypeRoute)
route.use('/week',weekRoute)
module.exports=route