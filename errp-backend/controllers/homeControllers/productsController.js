const Product=require("../../data/Product");
const RetailerProduct=require("../../data/RetailerProduct")
const getProducts=(req,res)=>{
    res.status(200).json({"products":req.username +" products"})
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
module.exports={getProducts,addProduct,addNewProduct,addOldProduct}