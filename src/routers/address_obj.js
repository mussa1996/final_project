import addressController from '../controllers/address_obj';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,addressController.create)
route.get('/getAll',userAuth,addressController.getaddress_obj)
route.get('/getOne/', userAuth,addressController.getOneaddress_obj)
route.put('/update/', userAuth,addressController.updateaddress_obj)
route.delete('/delete/', userAuth,addressController.deleteaddress_obj)
module.exports=route