const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new Schema({
    barcode:{
        type:String,
        required:true
    },
    brandName:{
        type:String,
        required:true
    },
    modelName:{
        type:String
    },
    imgUrl:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Product',productSchema);
