// const Notification=require("../../data/Notification")
const RetailerProduct=require("../../data/RetailerProduct")
const getNotifications=async(req,res)=>{
    try{
    const recentlyReviewed=await RetailerProduct.find({"retailerUserName":req.username,"reviewed.date":{$gte:new Date('2022-06-17T10:03:46.000Z')}}) 
    res.status(200).json(recentlyReviewed)
    }catch(err){
        res.status(404).json({"message":"page isn't available"})
    }
}
module.exports={getNotifications}