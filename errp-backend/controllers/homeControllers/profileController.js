const User=require("../../data/User")
const bcrypt=require("bcrypt")
const getProfile=async (req,res)=>{
    const user= await User.findOne({"username":req.username})
    user.refreshToken=''
    res.json(user)
}
const updateProfile=async (req,res)=>{
    const user= await User.findOne({"username":req.username})
    console.log(user)
    const {fullname,password}=req.body
    if(req.file) user.imgUrl=req.file.filename
    if(fullname) user.fullname=fullname
    if(password) {
        const hashedPwd= await bcrypt.hash(password,10);
        user.password=hashedPwd
    }

    console.log(user)
    res.sendStatus(200)
}
module.exports={getProfile,updateProfile}
