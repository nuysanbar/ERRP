const Product=require('../../data/Product')
var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);
ger.initialize_namespace('products')

const getSearch=async (req,res)=>{
    var params = req.query;
    var search=params.search;
    const results= await ger.add_event({
        namespace: 'products',
        person: req.username,
        action: 'searches',
        thing: search,
        expires_at: '2023-11-10'
      })
    console.log(results)
    const cursor = await Product.find({"brandName" : {$regex : search}},{"barcode":true,"brandName":true,"imgUrl":true});
    console.log(cursor)
    if(cursor){
       return res.status(200).json(cursor)
    }
    else{
        return res.status(200).json({"message":"No product called "+search+ " available"})
    }
}
module.exports={getSearch}
