const Product=require("../data/Product");
const RetailerProduct=require("../data/RetailerProduct")
const User=require("../data/User")
const Order=require("../data/order")

const getOrders=async(req,res)=>{
    var data=[]
    const results=await Order.find({"status":"Paid","delivered":false,"refund":false})
    for(let i=0; i<results.length;i++){
        const retailer=await User.findOne({"username":results[i].retailerUserName},{firstname:true,lastname:true,city:true,subcity:true}).exec()
        const costumer=await User.findOne({"username":results[i].costumerUserName},{city:true,subcity:true}).exec()
        data.push({retailer,costumer,orderId:results[i]._id,brand:results[i].ItemName,date:results[i].date,prime:results[0].prime})
    }
    return res.status(201).json(data)
}
const getSelections=async(req,res)=>{
    var data=[]
    // const results=await Order.find({"deliveredBy":req.username})
    const results=await Order.find({"status":"Paid","delivered":false,"refund":false})
    for(let i=0; i<results.length;i++){
        const retailer=await User.findOne({"username":results[i].retailerUserName},{firstname:true,lastname:true,city:true,subcity:true}).exec()
        const costumer=await User.findOne({"username":results[i].costumerUserName},{city:true,subcity:true}).exec()
        data.push({retailer,costumer,orderId:results[i]._id,brand:results[i].ItemName,date:results[i].date,prime:results[0].prime})
    }
    return res.status(201).json(data)
}
const getHistory=async(req,res)=>{
    var data=[]
    // const results=await Order.find({"deliveredBy":req.username,isDeliveredTwo:true})
    const results=await Order.find({"status":"Paid","delivered":false,"refund":false})
    for(let i=0; i<results.length;i++){
        const retailer=await User.findOne({"username":results[i].retailerUserName},{firstname:true,lastname:true,city:true,subcity:true}).exec()
        const costumer=await User.findOne({"username":results[i].costumerUserName},{city:true,subcity:true}).exec()
        data.push({retailer,costumer,orderId:results[i]._id,brand:results[i].ItemName,date:results[i].date,prime:results[0].prime})
    }
    return res.status(201).json(data)
}
const getOrderDetail=async(req,res)=>{
    const id=req.params.id
    const result=await Order.findOne({"id":id},{sellerCode:false,pdtToken:false}).exec()
    if(result){
        const retailer=await User.findOne({"username":result.retailerUserName},{imgUrl:true,firstname:true,lastname:true,city:true,subcity:true,phoneNum:true,lat:true,lon:true}).exec()
        const costumer=await User.findOne({"username":result.costumerUserName},{imgUrl:true,firstname:true,lastname:true,city:true,subcity:true,phoneNum:true,lat:true,lon:true}).exec()
        const product=await Product.findOne({"barcode":result.barcode})
        res.status(201).json({result,retailer,costumer,product})
    }else{
        res.status(404).json({"message":"bad request"})
    }
}

module.exports={getOrders,getSelections,getHistory,getOrderDetail}