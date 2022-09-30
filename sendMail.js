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
      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.data.username,
        subject: 'Forgot Password Email ',
        text: req.body.data.otp?`Your OTP is ${req.body.data.otp}`:
        `Use the Link To Reset Your Password ${process.env.FRONT_END}/resetpassword/${req.body.data.auth}/${req.body.data.id}`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        }else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send({data:"Email Sent on Provided Email ID",status: true,resp: true});
}