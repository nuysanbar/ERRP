const Favorite=require( '../../data/Favorite')
const User=require("../../data/User")
const getFavourites=async(req,res)=>{
    const allFavoritesListed=[]
    const results=await Favorite.findOne({"username":req.username}).exec();
    if(!results){
        return res.status(404).json({"messaage":"you didn't favored any online store"})
    }else{
    const favourites=results.favorites;
    for(let i=0; i<favourites.length; i++){
        const user=await User.findOne({"username":favourites[i]}).exec()
        if(user!=undefined){
        const modification={"username":favourites[i],"imgUrl":user.imgUrl,"name":user.firstname+" "+ user.lastname}
        allFavoritesListed.push(modification)
        }
    }
   return res.status(200).json(allFavoritesListed)}
}
module.exports={getFavourites}
