import serviceController from '../controllers/internal_services';
import { userAuth } from '../middlewares/auth'
import express from 'express'
const route = express.Router()
route.post('/create',userAuth, serviceController.create)
route.get('/getAll', serviceController.getinternal_services)
route.get('/getOne/', serviceController.getOneinternal_services)
route.put('/update/', serviceController.updateinternal_services)
route.delete('/delete/',serviceController.deleteinternal_services)
route.get('/count',serviceController.countService)
route.get('/countById',serviceController.CountServiceById)
route.get('/getServiceById/',serviceController.getServiceById)
module.exports = route