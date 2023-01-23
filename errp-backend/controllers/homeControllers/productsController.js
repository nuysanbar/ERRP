const Product=require("../../data/Product");
const RetailerProduct=require("../../data/RetailerProduct")
const Dashboard=require("../../data/Dashboard")
const getProducts=async(req,res)=>{
    var productInfo=[];
    const products= await RetailerProduct.find({retailerUserName:req.username})
    if(!products){
        return res.status(204).json({"message":"No products available"})
    }
    for(let i=0; i<products.length; i++){
        var resp=await Product.findOne({barcode:products[i].barcode})
        productInfo.push(resp)
    }
    res.json({products,productInfo})
}
const getProduct = async(req,res)=>{
    var like=false;
    var dislike=false;
    if(!req?.params?.barcode){
        return res.status(400).json({"message":"barcode is required"})
    }
    const product= await RetailerProduct.findOne({retailerUserName:req.username,barcode:req.params.barcode}).exec()
    if(!product){
        return res.status(204).json({"message":"product is not available"})
    }
    const checkLike=product.likedBy.find((item)=>item===req.username)
    if(checkLike){
        like=true;
    }
    const checkDisLike=product.disLikedBy.find((item)=>item===req.username)
    if(checkDisLike){
        dislike=true;
    }
    var productInfo=await Product.findOne({barcode:req.params.barcode})
    if(!productInfo){
        return res.status(204).json({"message":"product is not available"})
    }
    res.json({product,productInfo,like,dislike})
}
const addProduct=async(req,res)=>{
    const barcode=req.body.barcode;
    if(!barcode) return res.status(400).json({"message":"barcode is needed"})
    const duplicate= await Product.findOne({barcode:barcode}).exec();
    if(duplicate){ 
        return res.status(200).json({"message":true})
    }
    else{ 
        return res.status(200).json({"message":false})
    }
}
const addNewProduct=async(req,res)=>{
    const pictures=[]
    console.log(req.body)
    console.log(req.files)
    for(let i=0; i<req.files.length; i++){
        pictures.push(req.files[i].filename)
    }
    console.log(pictures)
    const {barcode,brandname,type,brand,usedornew,details,price,amount}=req.body
    if(!barcode || !brandname ||!type ||!brand ||!usedornew || !details || !amount ) return res.status(400).json({"message":"fill all the products name appropriately"})
    const duplicate= await Product.findOne({barcode:barcode}).exec();
    if(duplicate) return res.sendStatus(409)
    try{
        const result=await Product.create({
            "barcode":barcode,
            "brandName":brandname,
            "type":type,
            "brand":brand,
            "details":details,
            "imgUrl":pictures
        })
        console.log(result);
        const result2= await RetailerProduct.create({
            "barcode":barcode,
            "price":price,
            "availableAmount":amount,
            "retailerUserName":req.username,
            "usedOrNew":usedornew,
            "likedCount":0,
            "disLikedCount":0,
        })
        console.log(result2)
        res.status(201).json({"success":"new product is created"})
    }catch(err){
        res.status(500).json({"error":"server problem"})
    }
}

const addOldProduct=async(req,res)=>{
    const {barcode,price,usedornew,amount}=req.body
    if(!barcode || !price ||!usedornew || !amount ) return res.status(400).json({"message":"fill all the product info appropriately"})
    const duplicate= await RetailerProduct.findOne({retailerUserName:req.username,barcode:barcode}).exec();
    if(duplicate) return res.sendStatus(409)
    try{
        const result2= await RetailerProduct.create({
            "barcode":barcode,
            "price":price,
            "availableAmount":amount,
            "usedOrNew":usedornew,
            "retailerUserName":req.username,
            "likedCount":0,
            "disLikedCount":0,
        })
        console.log(result2)
        res.status(201).json({"success":"new product is created"})

    }catch(err){
        res.status(500).json({"error":"server problem"})
    }
}

const soldOne=async(req,res)=>{
    const {price,amount}=req.body
    const dashboardRecord=await Dashboard.findOne({"username":req.username}).exec()
    const date=new Date()
    const year=date.getFullYear()
    const month=date.getMonth()+1
    const day=date.getDate()
    console.log(year,month,day)
    console.log(price,amount)
    if(dashboardRecord){
        dashboardRecord.sales.push({
            date:new Date(year,month,day,0,0,0),
            barcode:req.params.barcode,
            amount:1,
            price:parseInt(price)
        })
        dashboardRecord.save()
    }else{
        await Dashboard.create({
            username:req.username,
            sales:[{
                date:new Date(year,month,day,0,0,0),
                barcode:req.params.barcode,
                amount:1,
                price:price
            }]
        })
    }
    const retailerProduct=await RetailerProduct.updateOne({"retailerUserName":req.username,"barcode":req.params.barcode},{"availableAmount":amount-1})
    res.sendStatus(200)
}
const updatePrice=async(req,res)=>{
    const {price}=req.body
    if(!price) return res.sendStatus(400)
    const retailerProduct=await RetailerProduct.updateOne({"retailerUserName":req.username,"barcode":req.params.barcode},{"price":parseInt(price)})
    console.log(retailerProduct)
    return 0
}
const updateAmount=async(req,res)=>{
    const {amount}=req.body
    if(!amount) return res.sendStatus(400)
    const retailerProduct=await RetailerProduct.updateOne({"retailerUserName":req.username,"barcode":req.params.barcode},{"availableAmount":parseInt(amount)})
    console.log(retailerProduct)
    return 0
}
const deleteProduct=async(req,res)=>{
    const {price,amount}=req.body
    const dashboardRecord=await Dashboard.findOne({"username":req.username}).exec()
    const date=new Date()
    const year=date.getFullYear()
    const month=date.getMonth()+1
    const day=date.getDate()
    console.log(year,month,day)
    console.log(price,amount)
    if(dashboardRecord){
        dashboardRecord.sales.push({
            date:new Date(year,month,day,0,0,0),
            barcode:req.params.barcode,
            amount:amount,
            price:parseInt(price)
        })
        dashboardRecord.save()
    }else{
        await Dashboard.create({
            username:req.username,
            sales:[{
                date:new Date(year,month,day,0,0,0),
                barcode:req.params.barcode,
                amount:amount,
                price:price
            }]
        })
    }
    console.log(price,amount)
    const retailerProduct=await RetailerProduct.deleteOne({"retailerUserName":req.username,"barcode":req.params.barcode})
    console.log(retailerProduct)
    res.sendStatus(200)
    return 0
}


module.exports={getProducts,getProduct,addProduct,addNewProduct,addOldProduct,soldOne,updateAmount,updatePrice,deleteProduct}