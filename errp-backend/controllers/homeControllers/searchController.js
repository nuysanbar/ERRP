const Product=require('../../data/Product')
var recombee=require("recombee-api-client")
var rqs = recombee.requests;
var privateToken="dnd6Tav4GksaTyatcBgaO3VTsWwhhYLr6Tws4iIM877BZNcyK3GduLySqXMjFdB0"
var client = new recombee.ApiClient("astu-dev",privateToken,{region:'us-west'})
const getSearch= async (req,res)=>{
    var params = req.query;
    var search=params.search;
    const cursor = await Product.find({"brandName" : {$regex : search}});
    console.log(cursor)
    if(cursor){
     var length=cursor.length;
     for(let i=0; i<length; i++){
        var rqst= new rqs.AddDetailView(req.username,cursor[i].barcode,{cascadeCreate:true})
        rqst.timeout=10000;
        client.send(rqst ,(err,response)=>{
            if(err){
                console.log(err)
            }else{
                console.log(response)
            }
         })
     }
       return res.status(200).json(cursor)
    }
    else{
        return res.status(200).json({"message":"No product called "+search+ " available"})
    }
}
module.exports={getSearch}
