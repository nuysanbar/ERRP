const Product=require("../../data/Product");
const RetailerProduct=require("../../data/RetailerProduct")
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
    const {barcode,brandname,model,price,amount}=req.body
    if(!barcode || !brandname || !model || !price || !amount ) return res.status(400).json({"message":"fill all the products name appropriately"})
    const duplicate= await Product.findOne({barcode:barcode}).exec();
    if(duplicate) return res.sendStatus(409)
    try{
        const result=await Product.create({
            "barcode":barcode,
            "brandName":brandname,
            "modelName":model,
            "imgUrl":req.file.filename
        })
        console.log(result);
        const result2= await RetailerProduct.create({
            "barcode":barcode,
            "price":price,
            "availableAmount":amount,
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

const addOldProduct=async(req,res)=>{
    const {barcode,price,amount}=req.body
    if(!barcode || !price || !amount ) return res.status(400).json({"message":"fill all the product info appropriately"})
    const duplicate= await RetailerProduct.findOne({retailerUserName:req.username,barcode:barcode}).exec();
    if(duplicate) return res.sendStatus(409)
    try{
        const result2= await RetailerProduct.create({
            "barcode":barcode,
            "price":price,
            "availableAmount":amount,
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
    console.log(req.body)
    return 0
}
const updatePrice=async(req,res)=>{
    console.log(req.body)
    return 0
}
const updateAmount=async(req,res)=>{
    console.log(req.body)
    return 0
}
const deleteProduct=async(req,res)=>{
    console.log(req.body)
    return 0
}


module.exports={getProducts,getProduct,addProduct,addNewProduct,addOldProduct,soldOne,updateAmount,updatePrice,deleteProduct}