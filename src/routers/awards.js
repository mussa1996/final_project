import awardController from '../controllers/awards';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,awardController.create)
route.get('/getAll',userAuth,awardController.getawards)
route.get('/getOne/', userAuth,awardController.getOneawards)
route.put('/update/', userAuth,awardController.updateawards)
route.delete('/delete/', userAuth,awardController.deleteawards)
module.exports=route