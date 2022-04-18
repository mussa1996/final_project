import productController from '../controllers/product';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,productController.create)
route.get('/getAll',userAuth,productController.getProduct)
route.get('/getOne/', userAuth,productController.getOneProduct)
route.put('/update/', userAuth,productController.updateProduct)
route.delete('/delete/', userAuth,productController.deleteProduct)
module.exports=route