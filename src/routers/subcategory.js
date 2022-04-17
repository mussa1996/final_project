import subcategoryController from '../controllers/subcategory';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,subcategoryController.create)
route.get('/getAll',userAuth,subcategoryController.getsubcategory)
route.get('/getOne/', userAuth,subcategoryController.getOnesubcategory)
route.put('/update/', userAuth,subcategoryController.updatesubcategory)
route.delete('/delete/', userAuth,subcategoryController.deletesubcategory)
module.exports=route