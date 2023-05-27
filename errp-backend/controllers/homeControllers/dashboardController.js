const Order =require("../../data/order")
const getDashboard=async(req,res)=>{
    const dashboardRecord=await Order.find({"retailerUserName":req.username, "status":"Paid"},{"date":true,"TotalAmount":true,"ItemName":true,"barcode":true})

    if(!dashboardRecord) return res.status(200).json({"message":"No sales record is found yet"})
    res.status(200).json(dashboardRecord)
}
const getPurchases=async(req,res)=>{
    const purchases= await Order.find({"costumerUserName":req.username,"status":"Paid"})
    if(!purchases) return res.status(200).json({"message":"No purchases yet"})
    res.status(200).json(purchases)
}

module.exports={getDashboard,getPurchases}
