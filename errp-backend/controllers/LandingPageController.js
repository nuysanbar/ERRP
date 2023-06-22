const User=require('../data/User');
const RetailerProduct=require('../data/RetailerProduct')
const Product=require('../data/Product')
const Saved=require('../data/Saved')
const Favorite=require('../data/Favorite')
const Merchant=require('../data/merchant')
// const { el } = require('date-fns/locale');
const getUser=async (req,res)=>{
    var isFavored;
    if(!req?.params?.username){
        return res.status(400).json({"message":" username is required"})
    }
    const user= await User.findOne({ username:req.params.username}).exec();
    if(!user){
        return res.status(204).json({"message":"No user matches the username"})
    }
    const checkFav=user.favoredBy.find((item)=>req.username)
    if(checkFav){
        isFavored=true
    }else{
        isFavored=false
    }
    user.password="";
    res.status(200).json({user,isFavored});
};

const getProducts=async(req,res)=>{
    var productInfo=[];
    if(!req?.params?.username){
        return res.status(400).json({"message":"username is required "})
    }
    const products= await RetailerProduct.find({retailerUserName:req.params.username})
    if(!products){
        return res.status(204).json({"message":"No products available"})
    }
    for(let i=0; i<products.length; i++){
        var resp=await Product.findOne({barcode:products[i].barcode}).exec()
        productInfo.push(resp)
    }
    res.json({products,productInfo})
}

const getProduct = async(req,res)=>{
    var productInfo;
    var review=[];
    var saved=false;
    if(!req?.params?.username){
        return res.status(400).json({"message":"username is required "})
    }
    if(!req?.params?.barcode){
        return res.status(400).json({"message":"barcode is required"})
    }
    const product= await RetailerProduct.findOne({retailerUserName:req.params.username,barcode:req.params.barcode}).exec()
    if(!product){
        return res.status(204).json({"message":"product is not available"})
    }
    const checkSaved=await Saved.findOne({"username":req.username,"retailerUserName":req.params.username,"barcode":req.params.barcode})
    if(checkSaved){
        saved=true;
    }
    for(let i=0; i<product.reviewed.length; i++){
        const user=await User.findOne({"username":product.reviewed[i].reviewedBy})
        const modification={"reviewedBy":product.reviewed[i].reviewedBy,"imgUrl":user.imgUrl, "text":product.reviewed[i].reviewText,"name":user.firstname+" "+ user.lastname}
        review.push(modification)
    }
    product.reviewed=[]
    var productInfo=await Product.findOne({barcode:req.params.barcode})
    if(!productInfo){
        return res.status(204).json({"message":"product is not available"})
    }
    res.json({product,productInfo,review,saved})
}
const review=async(req,res)=>{
    if(!req?.params?.username){
        return res.status(400).json({"message":"username is required "})
    }
    if(!req?.params?.barcode){
        return res.status(400).json({"message":"barcode is required"})
    }
    const product= await RetailerProduct.findOne({retailerUserName:req.params.username,barcode:req.params.barcode}).exec()
    const newReview={
        "reviewedBy":req.username,
        "reviewText":req.body.review
    }
    product.reviewed.push(newReview);
    product.save();
    res.status(200).json({"message":"you reviewed the product"})
}
const save=async(req,res)=>{
    if(!req?.params?.username){
        return res.status(400).json({"message":"username is required "})
    }
    if(!req?.params?.barcode){
        return res.status(400).json({"message":"barcode is required"})
    }
    const duplicate=await Saved.findOne({"username":req.username,"retailerUserName":req.params.username,"barcode":req.params.barcode}).exec()
    if(duplicate){
        await Saved.deleteOne({"username":req.username,"retailerUserName":req.params.username,"barcode":req.params.barcode})
    }else{  
        await Saved.create({"username":req.username,"retailerUserName":req.params.username,"barcode":req.params.barcode})
    }
    res.status(200).json({"message":"you saved the product"})
}
const favorite=async(req,res)=>{
    if(!req?.params?.username){
        return res.status(400).json({"message":"username is required"})
    }
    const favoredUser=await User.findOne({"username":req.params.username}).exec()
    const user = await Favorite.findOne({"username":req.username}).exec()
    if(user){
        if(user.favorites.includes(req.params.username)){
            favoredUser.favoredNumber-=1;
            favoredUser.favoredBy.pop((item)=>item===req.username)
            user.favorites.pop((item)=>item===req.params.username)
        }
        else{
            favoredUser.favoredNumber+=1;
            favoredUser.favoredBy.push(req.username)
            user.favorites.push(req.params.username)
        }
        user.save()
    }else{
        await Favorite.create({"username":req.username,"favorites":[req.params.username]})
        favoredUser.favoredNumber+=1
        favoredUser.favoredBy.push(req.username)
    }
    favoredUser.save()
    res.status(200).json({"message":"favorite backend path is completed"})
}
const getMerchantSecret = async (req,res)=>{
    if(!req?.params?.username){
        return res.status(400).json({"message":"username is required"})
    }
    const merchantSecret=await Merchant.findOne({"username":req.params.username}).exec()
    if(merchantSecret){
        res.status(200).json(merchantSecret)
    }else{
        res.sendStatus(401)
    }
}
module.exports={getUser,getProducts,getProduct,review,save,favorite,getMerchantSecret}


