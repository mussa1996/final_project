import businessController from '../controllers/business';
import {adminAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/login',businessController.loginUser)
route.post('/logout',adminAuth,businessController.logout)
route.get('/getAll',adminAuth,businessController.findAll)
route.get('/getOne/',adminAuth,businessController.findOne)
route.delete('/delete/',adminAuth,businessController.deleteUser)
module.exports=route
 