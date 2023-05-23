const Product=require('../../data/Product')
const db= require('mongoose');
const RetailerProduct=require("../../data/RetailerProduct")
const getSearch=async (req,res)=>{
    var params = req.query;
    var search=params.search;
    const cursor = await Product.find({"brandName" : {$regex : search}},{"barcode":true,"brandName":true,"imgUrl":true});
    console.log(cursor)
    if(cursor){
       return res.status(200).json(cursor)
    }
    else{
        return res.status(200).json({"message":"No product called "+search+ " available"})
    }
}
module.exports={getSearch}
