const Dashboard=require("../../data/Dashboard")
const getDashboard=async(req,res)=>{
    const dashboardRecord=await Dashboard.findOne({"username":req.username}).exec()
    if(!dashboardRecord) return res.status(400).json({"message":"No sales record is found yet"})
    res.status(200).json(dashboardRecord)
}

module.exports={getDashboard}