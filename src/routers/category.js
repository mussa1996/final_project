import categoryContoller from '../controllers/category';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',categoryContoller.create)
route.get('/getAll',categoryContoller.getcategory)
route.get('/getOne/',categoryContoller.getOnecategory)
route.put('/update/',categoryContoller.updatecategory)
route.delete('/delete/',categoryContoller.deletecategory)
module.exports=route