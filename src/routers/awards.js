import awardController from '../controllers/awards';
import { businessAuth } from '../middlewares/auth'
import express from 'express'
const route = express.Router()
route.post('/create',businessAuth, awardController.create)
route.get('/getAll', awardController.getawards)
route.get('/getOne/', awardController.getOneawards)
route.put('/update/',awardController.updateawards)
route.delete('/delete/', awardController.deleteawards)
route.get('/count', awardController.countAward)
route.get('/countById',awardController.CountAwardById)
route.get('/getAwardById/',awardController.getAwardById)
route.get('/getAllByCategory',awardController.findByCategory)
route.get('/getAwardByBusiness',awardController.getAwardByBusiness)
module.exports = route