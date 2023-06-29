const Product=require("../data/Product");
const RetailerProduct=require("../data/RetailerProduct")
const User=require("../data/User")
const Saved=require("../data/Saved")
const Favorite=require("../data/Favorite")
const Order=require("../data/order")
const Merchant=require("../data/merchant")
const bcrypt=require("bcrypt")

const getRetailer=async(req,res)=>{
    const result=await User.findOne({"username":req.params.id}).exec()
    console.log(result)
    res.status(201).json(result)
}
const getDeliverer=async(req,res)=>{
    const result=await User.findOne({"username":req.params.id}).exec()
    console.log(result)
    res.status(201).json(result)
}
const getRetailerProducts=async(req,res)=>{
    console.log(req.params.id)
    var data=[]
    const results=await RetailerProduct.find({"retailerUserName":req.params.id})
    if(!results)return res.status(201).json(data)
    for(let i=0; i<results.length; i++){
        var product=await Product.findOne({"barcode":results[i].barcode}).exec()
        var obj={barcode:results[i].barcode,brandName:product.brandName,price:results[i].price,usedOrNew:results[i].usedOrNew}
        data.push(obj)
    }
    return res.status(201).json(data)
}
const getProduct=async(req,res)=>{
    const result=await Product.findOne({"barcode":req.params.id}).exec()
    console.log(result)
    res.status(201).json(result)
}
const getProductRetailers=async(req,res)=>{
    console.log(req.params.id)
    var data=[]
    const results=await RetailerProduct.find({"barcode":req.params.id})
    if(!results)return res.status(201).json(data)
    for(let i=0; i<results.length; i++){
        var retailer=await User.findOne({"username":results[i].retailerUserName}).exec()
        var obj={username:retailer.username,firstname:retailer.firstname,lastname:retailer.lastname,city:retailer.city,subcity:retailer.subcity}
        data.push(obj)
    }
    return res.status(201).json(data)
}
const getOrders=async(req,res)=>{
    var data=[]
    const results=await Order.find({"status":"Paid"})
    if(results.length>0){
    for(let i=0; i<results.length;i++){
        const retailer=await User.findOne({"username":results[i].retailerUserName},{firstname:true,lastname:true,city:true,subcity:true}).exec()
        const costumer=await User.findOne({"username":results[i].costumerUserName},{city:true,subcity:true}).exec()
        data.push({retailer,costumer,orderId:results[i]._id,brand:results[i].ItemName,date:results[i].date,prime:results[i].prime})
    }}
    return res.status(201).json(data)
}
const getSingleOrder=async(req,res)=>{
    const id=req.params.id
    try{
    const result=await Order.findOne({"_id":id},{sellerCode:false,pdtToken:false}).exec()
    if(result!==null){
        const retailer=await User.findOne({"username":result.retailerUserName},{imgUrl:true,firstname:true,lastname:true,city:true,subcity:true,phoneNum:true,lat:true,lon:true}).exec()
        const costumer=await User.findOne({"username":result.costumerUserName},{imgUrl:true,firstname:true,lastname:true,city:true,subcity:true,phoneNum:true,lat:true,lon:true}).exec()
        const product=await Product.findOne({"barcode":result.barcode})
        return res.status(201).json({result,retailer,costumer,product})
    }else{
        return res.status(404).json({"message":"bad request"})
    }}catch(errr){
        return res.status(500).json({"message":"server problem"})
    }
}
const dashboardData=async(req,res)=>{
    const data=[]
    const orders=await Order.find({status:"Paid"},{delivered:true,TotalAmount:true})
    var revenue=0;
    for(let i=0; i<orders.length;i++){
        revenue+=orders[i].TotalAmount
    }
    data.push({totalOrders:orders.length})
    const delivered=orders.filter((item)=>item.delivered==true)
    data.push({totalOrdersDelivered:delivered.length})
    const users=await User.find({})
    const deliverers=users.filter((item)=>item.roles==3011)
    const consumers=users.filter((item)=>item.roles==2001)
    const retailers=users.filter((item)=>item.roles==5508)
    data.push({deliverers:deliverers.length})
    data.push({consumers:consumers.length})
    data.push({retailers:retailers.length})
    data.push({revenue:revenue})
    console.log("dashboard data sent")
    res.status(200).json(data)
}
module.exports={getRetailer,getRetailerProducts,getProduct,getProductRetailers,getOrders,getSingleOrder,getDeliverer,dashboardData}