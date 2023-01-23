const { id } = require('date-fns/locale');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const retailerProductSchema=new Schema({
   barcode:{
    type:String,
    required:true
   },
   price:Number,
   availableAmount:Number,
   usedOrNew:String,
   retailerUserName:{
    type:String,
    required:true,
   },
   likedCount:Number,
   disLikedCount:Number,
   reviewed:[{
    date:{
      type:Date,
      default:new Date()
    },
    reviewedBy:String,
    reviewText:String
   }],
   likedBy:[{
      date:{
         type:Date,
         default:new Date()
       },
      name:String
   }],
   disLikedBy:[{
      date:{
         type:Date,
         default:new Date()
       },
      name:String
   }]
});
module.exports=mongoose.model('RetailerProduct',retailerProductSchema);

