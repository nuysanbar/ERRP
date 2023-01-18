const bcrypt=require('bcrypt');
const User=require('../data/User');
const handleNewUser=async(req,res)=>{
    console.log('controller being called...')
    console.log(req.body)
    console.log(req.file)
    const {username,fullname,password,role}=req.body;
    if(!username || !password|| !role || !fullname)return res.status(400).json({"message":"username and password required"})
    const duplicate= await User.findOne({username:username}).exec();
    if(duplicate) return res.sendStatus(409);
    try{
        const hashedPwd= await bcrypt.hash(password,10);
        const result=await User.create({
            "username":username,
            "fullname":fullname,
            "password":hashedPwd,
            "roles":parseInt(role),
            "imgUrl":req.file.filename
        })
        console.log(result);
        res.status(201).json({"success":"new username is created"})
    }catch(err){
        res.status(500).json({"error":"server problem"})
    }
}
module.exports={handleNewUser};

