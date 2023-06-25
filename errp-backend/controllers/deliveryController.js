const Product=require("../data/Product");
const User=require("../data/User")
const Order=require("../data/order")

const getOrders=async(req,res)=>{
    var data=[]
    const results=await Order.find({"status":"Paid","delivered":false,"refund":false,"deliveredBy":null})
    if(results.length>0){
    for(let i=0; i<results.length;i++){
        const retailer=await User.findOne({"username":results[i].retailerUserName},{firstname:true,lastname:true,city:true,subcity:true}).exec()
        const costumer=await User.findOne({"username":results[i].costumerUserName},{city:true,subcity:true}).exec()
        data.push({retailer,costumer,orderId:results[i]._id,brand:results[i].ItemName,date:results[i].date,prime:results[0].prime})
    }}
    return res.status(201).json(data)
}
const getSelections=async(req,res)=>{
    var data=[]
    const results=await Order.find({"deliveredBy":req.username,"isDeliveredTwo":false})
    // const results=await Order.find({"status":"Paid","delivered":false,"refund":false})
    if(results.length>0){
    for(let i=0; i<results.length;i++){
        const retailer=await User.findOne({"username":results[i].retailerUserName},{firstname:true,lastname:true,city:true,subcity:true}).exec()
        const costumer=await User.findOne({"username":results[i].costumerUserName},{city:true,subcity:true}).exec()
        data.push({retailer,costumer,orderId:results[i]._id,brand:results[i].ItemName,date:results[i].date,prime:results[0].prime})
        }
    }return res.status(201).json(data)
}
const getHistory=async(req,res)=>{
    var data=[]
    const results=await Order.find({"deliveredBy":req.username,isDeliveredTwo:true})
    console.log(results)
    if(results!==null){
    for(let i=0; i<results.length;i++){
        const retailer=await User.findOne({"username":results[i].retailerUserName},{firstname:true,lastname:true,city:true,subcity:true}).exec()
        const costumer=await User.findOne({"username":results[i].costumerUserName},{city:true,subcity:true}).exec()
        data.push({retailer,costumer,orderId:results[i]._id,brand:results[i].ItemName,date:results[i].date,prime:results[0].prime})
        }
     return res.status(201).json(data)
    }else{
        return res.status(404).json({"message":"bad request"})
    }
}
const getOrderDetail=async(req,res)=>{
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
const sendProve=async(req,res)=>{
    const id=req.params.id
    if(!req.file.filename) return res.status(404).json({"message":"bad request"})
    const result=await Order.findOne({"_id":id,"deliveredBy":req.username},{sellerCode:false,pdtToken:false}).exec()
    if(result){
        result.proveImg=req.file.filename
        result.isDeliveredTwo=true
        result.save()
        return res.status(200).json({"message":"image is set"})
    }else{
        return res.status(404).json({"message":"bad request"})
    }
}
const letMeShip=async(req,res)=>{
    console.log(req.body.id)
    const id=req.body.id
    const result=await Order.findOne({"_id":id,"deliveredBy":null},{sellerCode:false,pdtToken:false}).exec() 
    if(Boolean(result)){
        result.deliveredBy=req.username
        result.save()
        return res.status(200).json({"message":"image is set"})
    }else{
        return res.status(404).json({"message":"bad request"})
    }
}
module.exports={getOrders,getSelections,getHistory,getOrderDetail,sendProve,letMeShip}