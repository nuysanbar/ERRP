const User=require("../../data/User")
const bcrypt=require("bcrypt")
const getProfile=async (req,res)=>{
    const user= await User.findOne({"username":req.username})
    user.refreshToken=''
    res.json(user)
}
const updateProfile=async (req,res)=>{
    try{
    const user= await User.findOne({"username":req.username})
    console.log(user)
    const {firstname,lastname,city,subcity,phone,email,password}=req.body
    console.log(req.body)
    if(req.file) user.imgUrl=req.file.filename
    if(firstname) user.firstname=firstname
    if(lastname)user.lastname=lastname
    if(city)user.city=city
    if(subcity)user.subcity=subcity
    if(phone)user.phoneNum=phone
    if(email)user.email=email
    if(password) {
        const hashedPwd= await bcrypt.hash(password,10);
        user.password=hashedPwd
    }
    user.save()
    console.log(user)
    res.sendStatus(200)
    }catch(err){
        res.status(500).json({"message":"server problem"})
    }
}
module.exports={getProfile,updateProfile}
