const jwt = require('jsonwebtoken');


exports.validateToken = (req,res,next) =>{
    let token = req.body.headers && req.body.headers.Authorization?req.body.headers.Authorization:req.headers.authorization;
    
    try{
        let user = jwt.verify(token,process.env.SECRET_KEY);
        req.user = user;
        next();
    } 
    catch{
        res.status(201).send({message:"Token Is Invalid. Please Login before going to Any Page.",status:false,resp:true});
    }
}
exports.validateTokenAdmin = (req,res,next) =>{
    let token = req.body.headers && req.body.headers.Authorization?req.body.headers.Authorization:req.headers.authorization;
    
    try{
        let user = jwt.verify(token,process.env.SECRET_KEY);
        if(user.auth==="admin"){
            req.user = user;
            next();
        }
        else{
            res.status(201).send({message:"Token Is Invalid. You Are not Autherised For This API.",status:false,resp:true});
        }
    } 
    catch{
        res.status(201).send({message:"Token Is Invalid. Please Login before going to Any Page.",status:false,resp:true});
    }
}