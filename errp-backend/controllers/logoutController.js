const User=require('../data/User');
const handleLogout= async (req,res)=>{
    // delete access token in the front end
    const cookie=req.cookies;
    if(!cookie?.jwt) return res.sendStatus(204); // no content successfull message
    const refreshToken=cookie.jwt;
    //is there refresh token in the db
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser){ 
        res.clearCookie('jwt',{ httpOnly:true});
        return res.sendStatus(204);
    }

    // Delete refresh token
    foundUser.refreshToken='';
    const result= await foundUser.save();
    console.log(result);
    res.clearCookie('jwt',{httpOnly:true})       // secure:true  only serves on https
    res.sendStatus(204);
    
}

module.exports={handleLogout};