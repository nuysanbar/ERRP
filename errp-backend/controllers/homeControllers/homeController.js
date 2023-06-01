const Product=require('../../data/Product')
var recombee=require("recombee-api-client")
var rqs = recombee.requests;
var privateToken="dnd6Tav4GksaTyatcBgaO3VTsWwhhYLr6Tws4iIM877BZNcyK3GduLySqXMjFdB0"
var client = new recombee.ApiClient("astu-dev",privateToken,{region:'us-west'})

const recommendedProducts=async (req,res)=>{
    var rqst=new rqs.RecommendItemsToUser(req.username, 2)
    rqst.timeout=10000;
    client.send(rqst,
    async(err, response) => {
    if(err){
        res.json(null)
    }else{
       const results=[];
       var length=response.recomms.length;
       for(let i=0; i<length; i++){
        const result= await Product.findOne({barcode:response.recomms[i].id}).exec()
        if(result){
            results.push(result)
        }}
        if(results){
            res.status(200).json(results)
        }else{
            res.json(null)
        }
}});
    return 0;
}
module.exports={recommendedProducts};

