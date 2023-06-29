const Product=require("../data/Product");
const RetailerProduct=require("../data/RetailerProduct")
const User=require("../data/User")
const Saved=require("../data/Saved")
const Favorite=require("../data/Favorite")
const Order=require("../data/order")
const Merchant=require("../data/merchant")
const bcrypt=require("bcrypt")
const getCustomers=async(req,res)=>{
    const results=await User.find({roles:2001},{password:false})
    return res.status(201).json(results)
}
const getUser=async(req,res)=>{
    console.log(req.params.username)
    const result=await User.findOne({"username":req.params.username},{username:true,roles:true}).exec()
    res.status(201).json(result)
}
const getRetailers=async(req,res)=>{
    const results=await User.find({roles:5508},{password:false})
    return res.status(201).json(results)
}
const getDeliverers=async(req,res)=>{
    const results=await User.find({roles:3011},{password:false})
    return res.status(201).json(results)
}
const getProducts=async(req,res)=>{
    const results= await Product.find()
    return res.status(201).json(results)
}
const addUser=async(req,res)=>{

    const {username,firstname,lastname,password,role,subcity,city,lat,lon,phoneNum,email,sellerCode,pdtToken}=req.body;
    if(!username || !password|| !role || !firstname || !lastname || !subcity || !city|| !lat || !lon || !phoneNum ||!email) return res.status(400).json({"message":"bad request"})
    const duplicate= await User.findOne({username:username}).exec();
    if(duplicate) return res.sendStatus(409);
    if(role==5508){
        if(!sellerCode || !pdtToken){
            return res.status(400).json({"message":"selleCode and pdtToken needed"})
        }
        try{
            const addToMerchant= await Merchant.create({
                "username":username,
                "sellerCode":sellerCode,
                "pdtToken":pdtToken
            })
            console.log(addToMerchant)
            console.log("merchant row added")
        }catch(err){
            return res.status(500).json({"error":"server problem"})
        }
    }
    try{
        const hashedPwd= await bcrypt.hash(password,10);
        const result=await User.create({
            "username":username,
            "firstname":firstname,
            "lastname":lastname,
            "subcity":subcity,
            "city":city,
            "password":hashedPwd,
            "roles":parseInt(role),
            "lat":parseFloat(lat),
            "lon":parseFloat(lon),
            "email":email,
            "phoneNum":parseInt(phoneNum),
            "imgUrl":req.file.filename,
            
        })
        console.log(result);
        console.log("new user added")
       return  res.status(201).json({"success":"new username is created"})
    }catch(err){
       return res.status(500).json({"error":"server problem"})
    }    
}
const editProduct=async(req,res)=>{
    const pictures=[]
    console.log("inside edit product")
    console.log(req.params.barcode)
    console.log(req.files)
    console.log(req.body)
    if(req.files){
        for(let i=0; i<req.files.length; i++){
            pictures.push(req.files[i].filename)
        }
    }
    const {brandname,type,brand,details}=req.body
    try{
        const result= await Product.findOne({"barcode":req.params.barcode})
        if(brandname)result.brandName=brandname
        if(type)result.type=type
        if(brand)result.brand=brand
        if(details)result.details=details
        if(pictures.length>0)result.imgUrl=pictures
        result.save()
        console.log("edit product is added")
        res.status(201).json({"success":"product is updated successfully"})
    }catch(err){
        res.status(500).json({"error":"server problem"})
    }
}
const addLicense=async(req,res)=>{
    console.log(req.params.id)
    try{
        const result= await User.findOne({"username":req.params.id}).exec()
        if(result) result.license=req.file.filename
        result.save()
        console.log("license added")
        res.status(201).json({"success":"license is updated successfully"})
    }catch(err){
        res.status(500).json({"error":"server problem"})
    }
}
const deleteUser=async(req,res)=>{
    const username=req.params.username;
    const role=req.params.role
    console.log(username,role)
    console.log("delete operation progressing")
    if(!username||!role)return res.sendStatus(404)
    try{
    if(role=="retailer"){ 
        const allDelivered=await Order.findOne({"retailerUserName":username,"delivered":false})
        if(!allDelivered){
        const deleteUser=await User.deleteOne({"username":username})
        const deleteProducts=await RetailerProduct.deleteMany({"retailerUserName":username})
        const deleteMerchant=await Merchant.deleteOne({"username":username})
        const deleteSaved=await Saved.deleteMany({"username":username})
        const deleteFavorites=await Favorite.deleteOne({"username":username})
        console.log("retailer deleted successfully")
        return res.status(201).json({"message":username+" deleted succesfully"})
    }}else{
        const deleteUser2=await User.deleteOne({"username":username})
        const deleteSaved2=await Saved.deleteMany({"username":username})
        const deleteFavorites2=await Favorite.deleteOne({"username":username})
        return res.status(201).json({"message":username+" deleted succesfully"})
    }}catch(err){
        return res.status(500).json({"message":"server problem"})
    }
}
const editMember=async(req,res)=>{
    const username=req.params.username;
    const {role,lat,lon,sellerCode,pdtToken}=req.body;
    const result=await User.findOne({"username":username})
    try{
    if(role==5508){
        const result2=await Merchant.findOne({"username":username})
        if(lat)result.lat=lat;
        if(lon)result.lon=lon;
        if(sellerCode)result2.sellerCode=sellerCode;
        if(pdtToken)result2.pdtToken=pdtToken;
    }else{
        if(lat)result.lat=lat;
        if(lon)result.lon=lon;
    }
    return res.status(201).json({"message":usersname+"edited member"})
    }catch(err){
        return res.status(500).json({"message":"server problem"})
    }
}
const toggleSuspend=async(req,res)=>{
    const username=req.params.id;
    console.log(username)
    try{
        const result=await User.findOne({"username":username}).exec()
        var status=result.suspended;
        result.suspended=!status;
        result.save()
        return res.status(201).json({"message":username+"status is updated member"})
    }catch(err){
        return res.status(500).json({"message":"server problem"})
    }
}
module.exports={editProduct, addUser,getCustomers,getProducts,editMember,getUser,deleteUser,getRetailers,getDeliverers,addLicense,toggleSuspend}