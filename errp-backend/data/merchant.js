const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const merchantSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    sellerCode:{
        type:String,
        required:true
    },
    pdtToken:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('Merchant',merchantSchema);
