const nodemailer = require('nodemailer')

var transporter=nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: 'pikowicak@gmail.com',
      pass: 'mrlgpxnjzjklqzvt'
    },
    tls:{
        rejectUnauthorized:false
    }
});

module.exports=transporter