const User=require('../data/User');
const RetailerProduct=require('../data/RetailerProduct')
const Product=require('../data/Product')

const getUser=async (req,res)=>{
    if(!req?.params?.username){
        return res.status(400).json({"message":" username is required"})
    }
    const user= await User.findOne({ username:req.params.username}).exec();
    if(!user){
        return res.status(204).json({"message":"No user matches the username"})
    }
    res.json(user);
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
        var resp=await Product.findOne({barcode:products[i].barcode})
        productInfo.push(resp)
    }
    res.json({products,productInfo})
}


const getProduct = async(req,res)=>{
    var productInfo=[]
    if(!req?.params?.username){
        return res.status(400).json({"message":"username is required "})
    }
    if(!req?.params?.barcode){
        return res.status(400).json({"message":"barcode is required"})
    }
    const product= await RetailerProduct.findOne({retailerUserName:req.params.username,barcode:req.params.barcode}).exec()
    var resp=await Product.findOne({barcode:req.params.barcode})
    productInfo.push(resp)
    if(!product){
        return res.status(204).json({"message":"product is not available"})
    }
    res.json({product,productInfo})
}
const like= async(req,res)=>{
    if(!req?.params?.username){
        return res.status(400).json({"message":"username is required "})
    }
    if(!req?.params?.barcode){
        return res.status(400).json({"message":"barcode is required"})
    }
    const product= await RetailerProduct.findOne({retailerUserName:req.params.username,barcode:req.params.barcode}).exec()
    if(product.likedBy.includes(req.username)){
        product.likedCount=product.likedCount-1
        product.likedBy.filter((item=>item===req.username))
    }else{
        product.likedCount=product.likedCount+1
        product.likedBy.push(req.username)
    }
    product.save()
    res.status(200).json({"message":"you like the product"})
}
const dislike=async(req,res)=>{
    if(!req?.params?.username){
        return res.status(400).json({"message":"username is required "})
    }
    if(!req?.params?.barcode){
        return res.status(400).json({"message":"barcode is required"})
    }
    const product= await RetailerProduct.findOne({retailerUserName:req.params.username,barcode:req.params.barcode}).exec()
    if(product.disLikedBy.includes(req.username)){
        product.disLikedCount=product.disLikedCount-1
        product.disLikedBy.filter(item=>item===req.username)
    }else{
        product.disLikedCount=product.disLikedCount+1
        product.disLikedBy.push(req.username)
    }
    product.save()
    res.status(200).json({"message":"you dislike the product"})
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
    const product= await RetailerProduct.findOne({retailerUserName:req.params.username,barcode:req.params.barcode}).exec()
    res.status(200).json({"message":"you saved the product"})
}
module.exports={getUser,getProducts,getProduct,like,dislike,review,save}
