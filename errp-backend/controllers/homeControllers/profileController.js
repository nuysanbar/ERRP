
const getProfile=(req,res)=>{
    res.status(200).json({"profile":req.username + " profile"})
}

module.exports={getProfile}