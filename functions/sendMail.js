const nodemailer = require('nodemailer');


module.exports.sendEmail=(req,res,next)=>{
      const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
      port: 465,
      host: 'smtp.gmail.com'
      });
      const OTP = (Math.floor(100000 + Math.random() * 900000)).toString();
      req.body.data.otp = OTP;
      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.data.username,
        subject: 'Forgot Password Email ',
        text: 'Password is '+OTP
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        }else {
          console.log('Email sent: ' + info.response);
        }
      });
      next();
}