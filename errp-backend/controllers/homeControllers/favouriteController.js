const Favorite=require( '../../data/Favorite')

const getFavourites=async(req,res)=>{
    const favourites=await Favorite.findOne({"username":req.username}).exec()
    if(!favourites){
        return res.status(204).json({"messaage":"you didn't favored every online store"})
    }
    res.status(200).json(favourites)
}
module.exports={getFavourites}