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
    type:{
        type:String
    },
    brand:{
        type:String
    },
    details:{
        type:String
    },
    imgUrl:[]
});

module.exports=mongoose.model('Product',productSchema);
