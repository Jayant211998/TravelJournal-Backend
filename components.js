const keyList = require('./key.json'); 
const firebase = require('firebase-admin');
const credentials = require('./credentials.json')

firebase.initializeApp({
    credential: firebase.credential.cert(credentials)
})

const db = firebase.firestore();

exports.addData=async(req,res)=>{
    //const db = getdb();
    try {
        const response = db.collection(process.env.DB3)
            .doc(req.id)
            .set({   
            userid:req.userid,
            id:req.id,
            title:req.title,
            location:req.location,
            description:req.description,
            startDate:req.startDate,
            endDate:req.endDate,
            link:req.link,
            image:req.image,
            imageList: req.imageList,
            })
            return response;
    }
    catch(err){
        console.log(err);
    }                                    
}
exports.addUser=async(req,res)=>{
    // const db = getdb();
    const formData = req;
    if(formData.auth === "admin" && !keyList.keys.find(key => key === formData.key)){
        return "Invalid";
    }
    try{const response = await db.collection(formData.auth)
        .doc(formData.id)
        .set({   
            id:formData.id,
            auth:formData.auth,
            username:formData.username,
            name:formData.name,
            password:formData.password,
            key:formData.key,
            image:formData.image
        })
        return response;
    }
    catch(err){
        console.log(err);
    }                                            
}
exports.getAllData=async(req,res)=>{
    //const db = getdb();
    try{
        const response = db.collection(process.env.DB3).get()
        let responseArr = [];
        (await response).forEach(doc => {
            responseArr.push(doc.data());
        })
        return responseArr;
    }
    catch(err){
        console.log(err)
    }  
}
exports.getAllUser = async(req,res) =>{
    //const db = getdb();
    try{
        const response = db.collection(process.env.DB2).get()
        let responseArr = [];
        (await response).forEach(doc => {
            responseArr.push(doc.data());
        })
        return responseArr;
    }
    catch(err){
        console.log(err)
    }
}
exports.getAllAdmin = async(req,res) =>{
    //const db = getdb();
    try{
        const response = db.collection(process.env.DB1).get()
        let responseArr = [];
        (await response).forEach(doc => {
            responseArr.push(doc.data());
        })
        return responseArr;
    }
    catch(err){
        console.log(err)
    }
}

exports.getDataById=async(destid,res)=>{
    // const db = getdb();
    try{
        const response = (await db.collection(process.env.DB3).where('id','==',destid).get());
        let responseArr = [];
        (await response).forEach(doc => {
            responseArr.push(doc.data());
        })
        return responseArr;
    }
    catch(err){
        console.log(err);
    }
}
exports.getDataByUserId=async(userID,res)=>{
    // const db = getdb();
    try{
        const response = await db.collection(process.env.DB3).where('userid','==',userID).get();
        let responseArr = [];
        (await response).forEach(doc => {
            responseArr.push(doc.data());
        })
        return responseArr;
    }
    catch(err){
        console.log(err);
    }
}

exports.getImages=async(destid,res)=>{
    //const db = getdb();
    try{
        const response = (await db.collection(process.env.DB3).where('id','==',destid).get());
        let responseArr = [];
        (await response).forEach(doc => {
            responseArr.push(doc.data());
        })
        return responseArr[0].imageList;
    }
    catch(err){
        console.log(err);
    }    
     
    
}
exports.getUser=async(req,res)=>{
    // const db = getdb();
    try{
        const response = (await db.collection(req.auth)
                                .where('username','==',req.username)
                                .where('password','==',req.password)
                                .where('key','==',req.key)                        
                                .get());
        let responseArr = [];
        (await response).forEach(doc => {
            responseArr.push(doc.data());
        })
        if(responseArr[0])
            return responseArr;
        return "NotFound";
    }
    catch(err){
        console.log(err);
    }
      
}
 
exports.forgetPassword=async(req,res)=>{
    //const db = getdb(); 
    try{
        const response = (await db.collection(req.auth)
                                .where('username','==',req.username)                  
                                .get());
        let responseArr = [];
        (await response).forEach(doc => {
            responseArr.push(doc.data());
        })
 
        if(responseArr[0])
            return responseArr[0].id;
        return "NotFound";
    }
    catch(err){
        console.log(err);
    }                                            
}


exports.upadateData=async(destid,req,res)=>{
    // const db = getdb();
    try{
        const response = (await db.collection(process.env.DB3)
                        .doc(destid)
                        .update({id:req.id,
                            title:req.title,
                            location:req.location,
                            description:req.description,
                            startDate:req.startDate,
                            endDate:req.endDate,
                            link:req.link,
                            image:req.image,
                            imageList: req.imageList
                        })
                        );
        return response;
    }
    catch(err){
        console.log(err);
    }
}
exports.upadateUser=async(userid,req,res)=>{
    // const db = getdb();
    try{
        const response = (await db.collection(req.auth)
                        .doc(userid)
                        .update({name:req.name,
                                 image:req.image
                        })
                        );
        return response;
    }
    catch(err){
        console.log(err);
    }                                       
}
exports.changePassword=async(req,res)=>{
    //const db = getdb();
    try{
        const response = (await db.collection(req.auth)
                        .doc(req.id)
                        .update({
                            password:req.password
                        })
                        );
        return response;
    }
    catch(err){
        console.log(err);
    }                                            
}

exports.deleteData=async(destId,res)=>{
    // const db=getdb();
    try{
        const response = (await db.collection(process.env.DB3)
                        .doc(destId)
                        .delete()
                        );
        return response;
    }
    catch(err){
        console.log(err);
    } 
   
}
