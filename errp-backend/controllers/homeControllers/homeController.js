

const recommendedProducts=(req,res)=>{
        res.status(200).json({"home": req.username + "reccommended system"})
    }

module.exports={recommendedProducts};