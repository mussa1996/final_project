import sgMail from '@sendgrid/mail'
import ejs from 'ejs';
import path from 'path';
require ('dotenv').config();

sgMail.setApiKey(process.env.ATTEND_KEY_SENDGRIND)

const sendEmail = async (userInfo,action) =>{  
  let template;
  let subject;
  let emailto;
  switch (action) {
    case 'signup':
      template = '../public/template/signUp.ejs';
      subject = 'Welcome to Smart City Application ';
      emailto = userInfo.email;
      break;
    case 'forgotPassword':
      template = '../public/template/forgotPassword.ejs';
      subject = 'Change Password';
      emailto = userInfo.email;
      break;
    default:
      template = '';
  }

const data = await ejs.renderFile(path.join(__dirname, template),userInfo);
  
  const mailOptions = {
    from: `"Smart City Application"<${process.env.EMAIL}>`,
    to: emailto,
    subject,
    html: data
  };
  try {
    const sendmail = sgMail.send(mailOptions);
    return sendmail;
  }
  catch(err){
     return err;;
  }
}
export default sendEmail;