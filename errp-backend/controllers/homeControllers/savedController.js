
const getSavedProductAndPlace=(req,res)=>{
    res.status(200).json({"saved":req.username + " saved products"})
}

module.exports={getSavedProductAndPlace}
