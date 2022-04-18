import imageController from '../controllers/images';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,imageController.create)
route.get('/getAll',userAuth,imageController.getimages)
route.get('/getOne/', userAuth,imageController.getOneimages)
route.put('/update/', userAuth,imageController.updateimages)
route.delete('/delete/', userAuth,imageController.deleteimages)
module.exports=route