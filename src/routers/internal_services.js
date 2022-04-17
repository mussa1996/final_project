import serviceController from '../controllers/internal_services';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,serviceController.create)
route.get('/getAll',userAuth,serviceController.getinternal_services)
route.get('/getOne/', userAuth,serviceController.getOneinternal_services)
route.put('/update/', userAuth,serviceController.updateinternal_services)
route.delete('/delete/', userAuth,serviceController.deleteinternal_services)
module.exports=route