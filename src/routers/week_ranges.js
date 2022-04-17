import weekController from '../controllers/week_ranges';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,weekController.create)
route.get('/getAll',userAuth,weekController.getweek_ranges)
route.get('/getOne/', userAuth,weekController.getOneweek_ranges)
route.put('/update/', userAuth,weekController.updateweek_ranges)
route.delete('/delete/', userAuth,weekController.deleteweek_ranges)
module.exports=route