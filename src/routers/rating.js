import ratingController from '../controllers/rating.js';
import { userAuth } from '../middlewares/auth'
import express from 'express'
const route = express.Router()
route.post('/create/',ratingController.create)
route.get('/getAll', ratingController.getRating)
route.get('/getReviews', ratingController.getReviews)
module.exports = route 