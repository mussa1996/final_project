import userController from '../controllers/user';
import express from 'express'
const route=express.Router()
route.post('/signup',userController.createUser)
route.post('/login',userController.loginUser)
route.post('/logout',userController.logout)
route.get('/getAll',userController.findAll)
route.get('/getOne/', userController.findOne)
route.put('/update/',userController.updateUser)
route.delete('/delete/', userController.deleteUser)
route.post('/forgetpassword',userController.forgetPassword)
route.put('/resetPassword',userController.resetPassword)
route.get('/count',userController.CountUser)
route.get('/countById',userController.CountUserById)
module.exports=route  