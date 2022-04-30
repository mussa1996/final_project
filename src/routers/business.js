import businessController from '../controllers/business';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/signup',businessController.createUser)
route.put('/verify/',businessController.verify)
route.post('/login',businessController.loginUser)
route.post('/logout', userAuth,businessController.logout)
// route.get('/getAll',businessController.findAll)
route.get('/getOne/', userAuth,businessController.findOne)
route.put('/update/',businessController.updateUser)
route.delete('/delete/', businessController.deleteUser)
route.post('/forgetpassword',businessController.forgetPassword)
route.put('/resetPassword',businessController.resetPassword)
route.get('/count',businessController.CountBusiness)
route.get('/getAllByCategory',businessController.findByCategory)
route.get('/countById',businessController.CountBusinessById)
module.exports=route