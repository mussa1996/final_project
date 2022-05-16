import cron from 'node-cron'
import sendEmail from '../services/SendEmailReport'

export default ()=>{
  cron.schedule("*/1 * * * *",()=>{
    sendEmail('','report').then(()=>{
        console.log('Email sent successfully')
    }).catch((err)=>{
        console.log(err)
    })
})
}