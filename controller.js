const jwt = require('jsonwebtoken');
const components = require('./components')


exports.addData = async(req,res,next)=>{
    if(req.user.auth!=='admin'){
        return res.status(201).send({message:"You Are Unauthorised",status: false,resp: true});
    }
    const addData = await components.addData(req.body.data,res)
    if(addData){
        res.status(200).send({message:"Your Destination is Added Successfully",status: true,resp: true});
    }else{
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
    }
}

exports.getAllUser = async(req,res,next)=>{
    try{
        const allUser = await components.getAllUser(req,res);
        res.status(200).send({data:allUser,status:true,resp:true});
    }
    catch{
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
    }
}
exports.getAllAdmin = async(req,res,next)=>{
    try{
        const allAdmin = await components.getAllAdmin(req,res);
        res.status(200).send({data:allAdmin,status:true,resp:true});
    }
    catch{
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
    }
}

exports.getAllData = async(req,res,next)=>{
    try{
        const allData = await components.getAllData(req,res)
        res.status(200).send({data:allData,status:true,resp:true});
    }
     catch(err){
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
     }
}

exports.getDataByUserId = async(req,res,next)=>{
    try{const dataById = await components.getDataByUserId(req.params.id,res)
      res.status(200).send({data:dataById,status:true,resp:true})
    }
     catch(err){
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
     }
}

exports.getDataById = async(req,res,next)=>{
    try{const dataById = await components.getDataById(req.params.id,res)
        res.status(200).send({data:dataById,status:true,resp:true})
    }
     catch(err){
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
     }
}
exports.getImages = async(req,res,next)=>{
    try{const imgById = await components.getImages(req.params.id,res);
        res.status(200).send({data:imgById,status:true,resp:true});
    }
     catch(err){
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
     }
}
exports.upadateData = async(req,res,next)=>{
    if(req.user.auth!='admin'){
        return res.status(201).send({message:"You Are Unauthorised",status: false,resp: true});
    }
    const upadateData = await components.upadateData(req.params.id,req.body.data,res)
    if(upadateData){
        res.status(200).send({message:"Your Data Has Been Updated Successfully",status: true,resp: true});
    }else{
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
    }
}
exports.upadateUser = async(req,res,next)=>{
    const upadateUser = await components.upadateUser(req.params.id,req.body.data,res)
    if(upadateUser){
        res.status(200).send({message:"User Data Updated Successfully.",status: true,resp: true})
    }else{
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});

    }
}
exports.deleteData = async(req,res,next)=>{
    if(req.user.auth!='admin'){
        return res.status(201).send({message:"You Are Unauthorised",status: false,resp: true});
    }    
    const deleteData = await components.deleteData(req.params.id,res)
    if(deleteData){
    res.status(200).send({message:"Data Deleted Successfully",status: true,resp: true})
    }else{
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
    }
}
exports.register = async(req,res)=>{
    const addUser = await components.addUser(req.body.data,res)
    if(addUser==="Invalid"){
        res.status(201).send({message:"Invalid Key. Please Provide a Valid Key.",status: false,resp: true})
    }
    else if(addUser){
         res.status(200).send({message:"User Added Successfully.",status: true,resp: true})
    }else{
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
    }
} 
exports.login = async(req,res)=>{
    let getUser = await components.getUser(req.body.data,res);
    if(getUser==="NotFound" && req.body.data.changePass){
        res.status(201).send({message:"Curent Password is Invalid. Please Write Correct Password",status: false,resp: true});
    }
    else if(getUser==="NotFound"){
        res.status(201).send({message:"Please Enter Valid Login Credentials",status: false,resp: true});
    }
    else if(getUser[0] && req.body.data.changePass){
        res.status(200).send({data:getUser,status:true,resp:true})
    }
    else if(getUser[0]){
        const token = jwt.sign(getUser[0],process.env.SECRET_KEY,{
            expiresIn: "1d"
        });
        getUser[0]["token"] = token; 
        res.status(200).send({data:getUser[0],status:true,resp:true})
    }else {
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
    }
}
exports.forgetPassword = async(req,res,next)=>{
    let forgetPassword = await components.forgetPassword(req.body.data,res);
    if(forgetPassword==="NotFound"){
        res.status(200).send({message:"No Such Username Present Please Register",status: false,resp: true});
    }
    else if(forgetPassword){ 
        req.body.data.id = forgetPassword;
        next();
    }else {
        res.status(201).send({message:"There is Some  Issue Try After Some Time.",status: false,resp: true});
    }
}
exports.changePassword = async(req,res,next)=>{
    const data = req.body.updateData?req.body.updateData:{username:req.body.data.username,auth:req.body.data.auth, password: req.body.data.otp,id:req.body.data.id};
    let changePassword = await components.changePassword(data,res);
    if(changePassword){
            res.status(200).send({data:changePassword,status: true,resp: true});
    }else {
         res.status(200).send({message:"Invalid Login Credentials",status: false,resp: true});
    }
}