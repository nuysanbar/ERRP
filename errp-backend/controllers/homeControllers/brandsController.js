const Brands=require("../../data/Brand")
const Product=require("../../data/Product")
const RetailerProduct=require("../../data/RetailerProduct")
const User=require("../../data/User")
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
    const retailers=[]
    const product=await Product.findOne({"barcode":barcode})
    const retailersProducts=await RetailerProduct.find({"barcode":barcode})
    for(let i=0; i<retailersProducts.length; i++){
        const user=await User.findOne({"username":retailersProducts[i].retailerUserName})
        retailers.push(user)
    }
   return  res.status(200).json({product,retailersProducts,retailers})
}
module.exports={getType,getBrands,getSpecificBrand,getBrandStores,getTypeProducts}
