const Saved=require('../../data/Saved')
const Product=require('../../data/Product')
const User=require('../../data/User')
const getSavedProductAndPlace=async (req,res)=>{
    var saved=[]
    const result=await Saved.find({"username":req.username})
    if(result===[]) return res.status(400).json({"message":"could not find any bookmarks"})
    for(let i=0; i<result.length; i++){
        const product=await Product.findOne({"barcode":result[i].barcode}).exec()
        const retailer=await User.findOne({"username":result[i].retailerUserName})
        const singleSave={"retailerImg":retailer.imgUrl,
                          'retailer':retailer.username,
                          "firstname":retailer.firstname,
                          "lastname":retailer.lastname,
                          "productImg":product.imgUrl,
                          "brandname":product.brandName,
                          "barcode":product.barcode
                        }
        saved.push(singleSave)
    }
    res.json(saved)
}
module.exports={getSavedProductAndPlace}
