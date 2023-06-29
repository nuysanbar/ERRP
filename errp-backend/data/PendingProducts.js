const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PendingProductSchema=new Schema({
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
    imgUrl:[],
    price:{
        type:Number
    },
    availableAmount:{
        type:Number
    },
    usedOrNew:{
        type:String
    },
    retailerUserName:{
     type:String,
     required:true,
    }
});

module.exports=mongoose.model('PendingProduct',PendingProductSchema);
