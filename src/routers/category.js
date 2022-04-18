import categoryContoller from '../controllers/category';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,categoryContoller.create)
route.get('/getAll',userAuth,categoryContoller.getcategory)
route.get('/getOne/', userAuth,categoryContoller.getOnecategory)
route.put('/update/', userAuth,categoryContoller.updatecategory)
route.delete('/delete/', userAuth,categoryContoller.deletecategory)
module.exports=route