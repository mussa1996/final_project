import Controller from '../services/Payment';
import ControllerDownload from '../services/excelController';
import express from 'express'
const route=express.Router()
route.post('/createPayment',Controller.payment)
route.get('/getPayment',Controller.getPayment)
route.get('/getPaymentById',Controller.getPaymentById)
route.get('/getPaymentByBusinessId',Controller.getPaymentByBusinessId)
route.get('/getPaymentByUserId',Controller.getPaymentByUserId)
route.delete('/deletePayment',Controller.deletePayment)
route.get('/downloadReport', ControllerDownload.download);
 
module.exports=route  
 