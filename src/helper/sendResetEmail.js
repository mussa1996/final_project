import sgMail from '@sendgrid/mail'
import emailTemplate from './resetIndex'
require('dotenv').config()

sgMail.setApiKey(process.env.ATTEND_KEY_SENDGRIND)

const sendEmail = async (info,restoken) => {

    const mailOption = {
        from: `"My Books"<${process.env.EMAIL}>`,
        to: info.email,
        subject: "Dear User Thank you Resetting",
        html: emailTemplate(info,restoken)
    }

    try {
        const sendmail = sgMail.send(mailOption)

        return sendmail
    } catch (error) {
        return error;
    }
}
module.exports = sendEmail