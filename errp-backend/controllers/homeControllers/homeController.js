var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);

const recommendedProducts=async (req,res)=>{
        const results=await ger.recommendations_for_person("products",req.username,{actions:{searches:1}})
        console.log(results)
        res.status(200).json({"home": req.username + "reccommended system"})
    }

module.exports={recommendedProducts};

