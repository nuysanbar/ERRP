const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../data/User');

const handleAuth=async (req,res)=>{
    console.log(req.body)
    const {username,password}=req.body;
    if(!username || !password)return res.status(400).json({"message":"both username and password is required"});
    const foundUser= await User.findOne({username:username}).exec();
    if(!foundUser) return res.status(400).json({"message":"username is not available sign up first"});
    if(foundUser.suspended)return res.status(400).json({"message":"your are temporarly banned from accessing your account contact us"});
    const match= await bcrypt.compare(password,foundUser.password);
    if(match){
        const roles=foundUser.roles;
        const access_token=jwt.sign(
            {
                "userInfo":{
                    "username":foundUser.username,
                    "roles":roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1d'}
        )
        const refresh_token=jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        )
        foundUser.refreshToken=refresh_token;
        console.log(access_token.split('.'));
        const result=await foundUser.save();
        console.log(result);
        res.cookie('jwt',refresh_token,{httpOnly:true,sameSite:'None',maxAge:24*60*60*1000}); //secure:true in production
        res.json({access_token,foundUser});
    }else{
        res.status(401).json({"message":"wrong password"})
    }
}

module.exports={handleAuth}