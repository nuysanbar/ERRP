const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const savedSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    retailerUserName:{
        type:String,
        required:true
    },
    barcode:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('Saved',savedSchema);
