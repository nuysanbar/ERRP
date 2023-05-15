const Favorite=require( '../../data/Favorite')
const User=require("../../data/User")
const getFavourites=async(req,res)=>{
    const allFavoritesListed=[]
    const results=await Favorite.findOne({"username":req.username}).exec();
    const favourites=results.favorites;
    if(!favourites){
        return res.status(204).json({"messaage":"you didn't favored any online store"})
    }
    for(let i=0; i<favourites.length; i++){
        const user=await User.findOne({"username":favourites[i]}).exec()
        const modification={"username":favourites[i],"imgUrl":user.imgUrl,"name":user.firstname+" "+ user.lastname}
        allFavoritesListed.push(modification)
    }
    console.log(allFavoritesListed)
    res.status(200).json(allFavoritesListed)
}
module.exports={getFavourites}