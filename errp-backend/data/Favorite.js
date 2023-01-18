const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const favoriteSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    favorites:[]
})

module.exports=mongoose.model("Favorite",favoriteSchema)