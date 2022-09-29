const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv'); 
const cors = require('cors');
const controller = require('./controller') 
const { validateToken,validateTokenAdmin } = require('./validateToken');
const {sendEmail}= require('./sendMail');

 

const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}); 

app.get('/check',controller.check);
app.get('/getAllData',validateToken,controller.getAllData);
app.get('/getDataByUserId/:id',validateToken,controller.getDataByUserId);
app.get('/getDataById/:id',validateToken,controller.getDataById);
app.get('/getImages/:id',validateToken,controller.getImages);
app.post('/upadateUser/:id',validateToken,controller.upadateUser);


app.post('/addData',validateTokenAdmin,controller.addData);
app.post('/upadateData/:id',validateTokenAdmin,controller.upadateData);
app.delete('/deleteData/:id',validateTokenAdmin,controller.deleteData);

app.get('/getAllUser',controller.getAllUser);
app.get('/getAllAdmin',controller.getAllAdmin);
app.post('/register', controller.register);
app.post('/login', controller.login);
app.post('/resetPassword/:auth/:id', controller.resetPassword);
app.post('/forgetPassword',controller.forgetPassword,sendEmail);
app.post('/changePassword',validateToken,controller.changePassword);


app.listen(process.env.PORT,()=>{console.log("Server Running")})
// exports.app = functions.https.onRequest(app); 