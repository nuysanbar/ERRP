const Product=require("../../data/Product");
const RetailerProduct=require("../../data/RetailerProduct")
const PendingProduct=require("../../data/PendingProducts")
var recombee=require("recombee-api-client")
var rqs = recombee.requests;
var privateToken="dnd6Tav4GksaTyatcBgaO3VTsWwhhYLr6Tws4iIM877BZNcyK3GduLySqXMjFdB0"
var client = new recombee.ApiClient("astu-dev",privateToken,{region:'us-west'})
const getProducts=async(req,res)=>{
    var productInfo=[];
    const products= await RetailerProduct.find({retailerUserName:req.username})
    console.log(products)
    if(!products){
        return res.status(204).json({"message":"No products available"})
    }
    console.log(products)
    for(let i=0; i<products.length; i++){
        var resp=await Product.findOne({barcode:products[i].barcode})
        productInfo.push(resp)
    }
    res.status(200).json({products,productInfo})
}
const getProduct = async(req,res)=>{
    if(!req?.params?.barcode){
        return res.status(400).json({"message":"barcode is required"})
    }
    const product= await RetailerProduct.findOne({retailerUserName:req.username,barcode:req.params.barcode}).exec()
    if(!product){
        return res.status(204).json({"message":"product is not available"})
    }
    var productInfo=await Product.findOne({barcode:req.params.barcode})
    if(!productInfo){
        return res.status(204).json({"message":"product is not available"})
    }
    res.json({product,productInfo})
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
        const result=await PendingProduct.create({
                "barcode":barcode,
                "brandName":brandname,
                "type":type,
                "brand":brand,
                "details":details,
                "imgUrl":pictures,
                "price":price,
                "availableAmount":amount,
                "retailerUserName":req.username,
                "usedOrNew":usedornew
            })

        // const result=await Product.create({
        //     "barcode":barcode,
        //     "brandName":brandname,
        //     "type":type,
        //     "brand":brand,
        //     "details":details,
        //     "imgUrl":pictures
        // })
        // console.log(result);
        // const result2= await RetailerProduct.create({
        //     "barcode":barcode,
        //     "price":price,
        //     "availableAmount":amount,
        //     "retailerUserName":req.username,
        //     "usedOrNew":usedornew,
        // })
        // console.log(result2)
        var rqst=new rqs.SetItemValues(barcode,{
            "brandName":brandname,
            "type":type,
            "brand":brand,
            "details":details
        })
        rqst.timeout=10000
        client.send(rqst,(err,response)=>{
            if(err){
                console.log(err)
            }else{
                console.log(response)
            }
         })
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
        })
        console.log(result2)
        res.status(201).json({"success":"new product is created"})

    }catch(err){
        res.status(500).json({"error":"server problem"})
    }
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
    const retailerProduct=await RetailerProduct.deleteOne({"retailerUserName":req.username,"barcode":req.params.barcode})
    console.log(retailerProduct)
    res.sendStatus(200)
    return 0
}
module.exports={getProducts,getProduct,addProduct,addNewProduct,addOldProduct,updateAmount,updatePrice,deleteProduct}