const Order =require("../../data/order")
const getDashboard=async(req,res)=>{
    const dashboardRecord=await Order.find({"retailerUserName":req.username, "status":"Paid"},{"date":true,"TotalAmount":true,"ItemName":true,"barcode":true})

    if(!dashboardRecord) return res.status(200).json({"message":"No sales record is found yet"})
    res.status(200).json(dashboardRecord)
}
module.exports={getDashboard}
