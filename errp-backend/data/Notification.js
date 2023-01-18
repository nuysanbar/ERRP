const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const notificationSchema=new Schema({
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
module.exports=mongoose.model('Notification',notificationSchema);
