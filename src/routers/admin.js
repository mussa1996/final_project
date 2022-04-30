import businessController from '../controllers/business';
import { adminAuth } from '../middlewares/auth'
import express from 'express'
const route = express.Router()
route.post('/login', businessController.loginUser)
route.post('/logout', adminAuth, businessController.logout)
route.get('/getAll', businessController.findAll)
route.get('/getOne/', businessController.findOne)
route.delete('/delete/', businessController.deleteUser)
route.get('/count', businessController.CountBusiness)
module.exports = route