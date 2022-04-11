import sgMail from '@sendgrid/mail'
import emailTemplate from '../helper/index'
require('dotenv').config()

sgMail.setApiKey(process.env.ATTEND_KEY_SENDGRIND)

const sendEmail = async (info,token) => {

    const mailOption = {
        from: `"My Books"<${process.env.EMAIL}>`,
        to: info.email,
        subject: "Dear User Thank you for Registering",
        html: emailTemplate(info,token)
    }

    try {
        const sendmail = sgMail.send(mailOption)

        return sendmail
    } catch (error) {
        return error;
    }
}
module.exports = sendEmail