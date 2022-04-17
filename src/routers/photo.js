import photoController from '../controllers/photo';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,photoController.create)
route.get('/getAll',userAuth,photoController.getphoto)
route.get('/getOne/', userAuth,photoController.getOnephoto)
route.put('/update/', userAuth,photoController.updatephoto)
route.delete('/delete/', userAuth,photoController.deletephoto)
module.exports=route