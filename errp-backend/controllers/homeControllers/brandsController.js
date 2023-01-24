const Brands=require("../../data/Brand")
const Product=require("../../data/Product")
const RetailerProduct=require("../../data/RetailerProduct")
const User=require("../../data/User")
const Saved=require("../../data/Saved")
const getBrands=async(req,res)=>{
    return res.status(200).json(Brands)
}
const getType=async(req,res)=>{
    const type=req.params.type
    const types= Brands.find((item)=>item.type===type)
    if(!types) return res.status(200).json({"message":"couldn't find this category"})
    return res.status(200).json(types)
}
const getTypeProducts=async(req,res)=>{
    const type=req.params.type
    const products=await Product.find({"type":type})
    res.status(200).json(products)
}
const getSpecificBrand=async(req,res)=>{
    const type=req.params.type
    const brand=req.params.brand
    const products=await Product.find({"type":type,"brand":brand})
    return res.status(200).json(products)
}
const getBrandStores=async(req,res)=>{
    const barcode=req.params.barcode
    var likes;
    var dislikes;
    var saved;
    var isFavored;
    const retailers=[]
    const product=await Product.findOne({"barcode":barcode}).exec()
    const retailersProducts=await RetailerProduct.find({"barcode":barcode})
    const storeNumbers=retailersProducts.length
    for(let i=0; i<storeNumbers; i++){
        const user=await User.findOne({"username":retailersProducts[i].retailerUserName}).exec()
        if(!user)return res.status(200).json({"message":"the retailer is not available"})
        const checkLike=retailersProducts[i].likedBy.find((item)=>item.name===req.username)
        if(checkLike){
            likes=true
        }else{
            likes=false
        }
        const checkDisLike=retailersProducts[i].disLikedBy.find((item)=>item.name===req.username)
        if(checkDisLike){
            dislikes=true
        }else{
            dislikes=false
        }
        const checkSaved=await Saved.findOne({"username":req.username,"retailerUserName":retailersProducts[i].retailerUserName,"barcode":req.params.barcode}).exec()
        if(checkSaved){
            saved=true
        }else{
            saved=false
        }
        if(user){
            const checkFavored=user.favoredBy.find((item)=>item===req.username)
            if(checkFavored){
                isFavored=true
            }else{
                isFavored=false
            }
        }
        var storeProductInfo={
            isLiked:likes,
            isDisLiked:dislikes,
            isSaved:saved,
            isFavorite:isFavored,
            storeImg:user.imgUrl,
            storeName:user.username,
            favoredAmount:user.favoredBy.length,
            likeCount:retailersProducts[i].likedBy.length,
            disLikeCount:retailersProducts[i].disLikedBy.length,
            review:retailersProducts[1].reviewed
        }
        retailers.push(storeProductInfo)
    }
   return  res.status(200).json({product,retailers})
}

module.exports={getType,getBrands,getSpecificBrand,getBrandStores,getTypeProducts}
