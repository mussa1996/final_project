import hourController from '../controllers/hours';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,hourController.create)
route.get('/getAll',userAuth,hourController.gethours)
route.get('/getOne/', userAuth,hourController.getOnehours)
route.put('/update/', userAuth,hourController.updatehours)
route.delete('/delete/', userAuth,hourController.deletehours)
module.exports=route