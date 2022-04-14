import userController from '../controllers/user';
import {adminAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/login',userController.loginUser)
route.post('/logout',adminAuth,userController.logout)
route.get('/getAll',adminAuth,userController.findAll)
route.get('/getOne/',adminAuth,userController.findOne)
route.delete('/delete/',adminAuth,userController.deleteUser)
module.exports=route
 