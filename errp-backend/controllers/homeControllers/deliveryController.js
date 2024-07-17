const Order=require('../../data/order')
const accepted=async(req,res)=>{
    const {id}=req.body;
    if(!id){
        return res.status(401).json({"message":"bad request"})
    }
    const result= await Order.updateOne({_id:id},{delivered:true})
    return res.sendStatus(201)
}
const refund=async(req,res)=>{
    const {id}=req.body;
    if(!id){
        return res.status(401).json({"message":"bad request"})
    }
    const result= await Order.updateOne({_id:id},{refund:true,delivered:true})
    return res.sendStatus(201)
}
module.exports={accepted,refund}
