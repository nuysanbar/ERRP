// const Notification=require("../../data/Notification")
const RetailerProduct=require("../../data/RetailerProduct")
const getNotifications=async(req,res)=>{
    const recentlyLiked=await RetailerProduct.find({"retailerUserName":req.username,"likedBy.date":{$gte:new Date('2022-06-17T10:03:46.000Z')}},{barcode:1,likedBy:1})
    const recentlyDisLiked=await RetailerProduct.find({"retailerUserName":req.username,"disLikedBy.date":{$gte:new Date('2022-06-17T10:03:46.000Z')}},{barcode:1,disLikedBy:1})
    const recentlyReviewed=await RetailerProduct.find({"retailerUserName":req.username,"reviewed.date":{$gte:new Date('2022-06-17T10:03:46.000Z')}},{barcode:1,reviewed:1})
    res.status(200).json({recentlyLiked,recentlyDisLiked,recentlyReviewed})
}
module.exports={getNotifications}