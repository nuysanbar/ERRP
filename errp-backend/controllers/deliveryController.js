const Product=require("../data/Product");
const RetailerProduct=require("../data/RetailerProduct")
const User=require("../data/User")
const Order=require("../data/order")

const getOrders=async(req,res)=>{
    const results=await Order.find({"status":"Paid","delivered":false,"refund":false})
    var data=[]
    for(let i=0; i<results.length;i++){
        const retailer=await User.findOne({"username":results[i].retailerUserName},{firstname:true,lastname:true,city:true,subcity:true}).exec()
        const costumer=await User.findOne({"username":results[i].costumerUserName},{city:true,subcity:true}).exec()
        data.push({retailer,costumer,orderId:results[i]._id,brand:results[i].ItemName})
    }
    return res.status(201).json(data)
}
const getSelections=async(req,res)=>{
    console.log(req.username)
    const result=await Order.find({"deliveredBy":req.username})
    console.log(result)
    res.status(201).json(result)
}
const getOrderDetail=async(req,res)=>{
    const id=req.params.id
    const result=await Order.findOne({"id":id},{sellerCode:false,pdtToken:false}).exec()
    if(result){
        const retailer=await User.findOne({"username":result.retailerUserName},{imgUrl:true,firstname:true,lastname:true,city:true,subcity:true,phoneNum:true}).exec()
        const costumer=await User.findOne({"username":result.costumerUserName},{imgUrl:true,firstname:true,lastname:true,city:true,subcity:true,phoneNum:true}).exec()
        const product=await Product.findOne({"barcode":result.barcode})
    }
    console.log(result)
    res.status(201).json({result,retailer,costumer,product})
}

module.exports={getOrders,getSelections,getOrderDetail}