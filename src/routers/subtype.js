import subtypeController from '../controllers/subtype';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,subtypeController.create)
route.get('/getAll',userAuth,subtypeController.getsubtype)
route.get('/getOne/', userAuth,subtypeController.getOnesubtype)
route.put('/update/', userAuth,subtypeController.updatesubtype)
route.delete('/delete/', userAuth,subtypeController.deletesubtype)
module.exports=route