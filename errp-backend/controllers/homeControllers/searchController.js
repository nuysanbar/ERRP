const Product=require('../../data/Product')
const User= require("../../data/User")
var recombee=require("recombee-api-client")
var rqs = recombee.requests;
var privateToken="dnd6Tav4GksaTyatcBgaO3VTsWwhhYLr6Tws4iIM877BZNcyK3GduLySqXMjFdB0"
var client = new recombee.ApiClient("astu-dev",privateToken,{region:'us-west'})
const getSearch= async (req,res)=>{
    var params = req.query;
    var search=params.search;
    var searchType=params.type;
    var results;
    if(searchType=="name"){
        results = await Product.find({"brandName" : {$regex : search,$options:"i"}});
    }else if(searchType=="brand"){
        results = await Product.find({"brand":{$regex: search,$options:"i"}})
    }else{
        results = await Product.find({'type':{$regex: search, $options:"i"}})
    }
    console.log(results)
    if(results){
        return res.status(200).json(results)
    }
    // if(results){
    //  var length=results.length;
    //  for(let i=0; i<length; i++){
    //     var rqst= new rqs.AddDetailView(req.username,results[i].barcode,{cascadeCreate:true})
    //     rqst.timeout=10000;
    //     client.send(rqst ,(err,response)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             console.log(response)
    //         }
    //      })
    //  }
    //    return res.status(200).json(results)
    // }
    else{
        return res.status(200).json({"message":"No product called "+search+ " available"})
    }
}
const getRetailers=async(req,res)=>{
    const search=req.query.search
    const results= await User.find({"firstname":{$regex :search, $options:"i"}})
    if(results){
        console.log("searched retailers")
        console.log(results)
        res.status(200).json(results)
    }else{
        res.sendStatus(400)
    }

}
module.exports={getSearch,getRetailers}
