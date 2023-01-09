
const getDashboard=(req,res)=>{
    res.status(200).json({"dashboard":req.username + " dashboard"})
}

module.exports={getDashboard}