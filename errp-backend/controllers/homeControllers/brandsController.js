const Brands=require("../../data/Brand")
const Product=require("../../data/Product")
const RetailerProduct=require("../../data/RetailerProduct")
const User=require("../../data/User")
const Saved=require("../../data/Saved")
//all brands 
const getBrands=async(req,res)=>{
    return res.status(200).json(Brands)
}
//all brand types
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
    var saved;
    var isFavored;
    const retailers=[]
    const product=await Product.findOne({"barcode":barcode}).exec()
    const costumerInfo=await User.findOne({"username":req.username}).exec()
    const retailersProducts=await RetailerProduct.find({"barcode":barcode})
    const storeNumbers=retailersProducts.length
    for(let i=0; i<storeNumbers; i++){
        const user=await User.findOne({"username":retailersProducts[i].retailerUserName}).exec()
        if(!user)return res.status(200).json({"message":"the retailer is not available"})
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
            isSaved:saved,
            isFavorite:isFavored,
            storeImg:user.imgUrl,
            storeName:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            lat:user.lat,
            lon:user.lon,
            city:user.city,
            subcity:user.subcity,
            favoredAmount:user.favoredBy.length,
            price:retailersProducts[i].price,
            availableAmount:retailersProducts[i].availableAmount,
            usedOrNew:retailersProducts[i].usedOrNew,
            review:retailersProducts[i].reviewed
        }
        retailers.push(storeProductInfo)
    }
   return  res.status(200).json({costumerInfo,product,retailers})
}

module.exports={getType,getBrands,getSpecificBrand,getBrandStores,getTypeProducts}
