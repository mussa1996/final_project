import Controller from '../services/Payment';
import express from 'express'
const route=express.Router()
route.post('/createPayment',Controller.payment)
module.exports=route  