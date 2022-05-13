import productController from '../controllers/product';
import { businessAuth } from '../middlewares/auth'
import express from 'express'
const route = express.Router()
route.post('/create',businessAuth, productController.create)
route.get('/getAll',productController.getProduct)
route.get('/getOne/', productController.getOneProduct)
route.put('/update/', productController.updateProduct)
route.delete('/delete/', productController.deleteProduct)
route.get('/count', productController.countProduct)
route.get('/countById',productController.CountProductById)
route.get('/getProductById/',productController.getProductById)
module.exports = route