
import cron from 'node-cron'
import moment from 'moment'
require('dotenv').config()
import Order from '../models/order'
import sendEmail from '../services/SendEmailReport'
import excel from 'exceljs';
const download =async (req,res) => {
  Order.find({where: {
    payment_date: {
      [moment.gte]: moment().subtract(1, 'day').toDate()
    }
  }
}).populate("user", "fullname").populate("business", "name").then((objs) => {
    let order = [];

    objs.forEach((obj) => {
     order.push({
       user_id:obj.user,
       business_id:obj.business,
       total_amount:obj.total_amount,
       address:obj.address,
        payment_id:obj.payment_id
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Attendences");

    worksheet.columns = [
      { header: "User Id", key: "user_id", width: 25 },
      { header: "Business Id", key: "business_id", width: 25 },
      { header: "Total Amount", key: "total_amount", width: 10 },
      { header: "Address", key: "address", width: 10 },
      { header: "Payment Id", key: "payment_id", width: 10 },
    ];

    // Add Array Rows
    worksheet.addRows(order);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Order.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

// new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)>5
const task= cron.schedule("* 1 * * *",async (res) => {
  const userInfo={
    email:"niyodusengamussa@gmail.com"
  }
  const emailMessage = await sendEmail(userInfo)
  res.send(emailMessage, (err, data) => {
  if (err) {
      console.log("error occurred", err)
  } else {
      console.log("Email for report sent",data)
  }
})
})
task.start()

module.exports={download}
