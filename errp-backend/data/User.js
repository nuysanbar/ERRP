const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    roles:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    refreshToken:String,
    stars:Number
});
module.exports=mongoose.model('User',userSchema);
