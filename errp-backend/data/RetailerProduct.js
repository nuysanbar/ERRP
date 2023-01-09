const { id } = require('date-fns/locale');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const retailerProductSchema=new Schema({
   barcode:{
    type:String,
    required:true
   },
   price:String,
   availableAmount:Number,
   retailerUserName:{
    type:String,
    required:true,
   },
   likedCount:Number,
   disLikedCount:Number,
   reviewed:[{
    reviewedBy:String,
    reviewText:String
   }],
   likedBy:[{likedBy:String}],
   disLikedBy:[{dislikedBy:String}]
});
module.exports=mongoose.model('RetailerProduct',retailerProductSchema);
