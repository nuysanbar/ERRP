const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const dashboardSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    sales:[
        {
            date:Date,
            barcode:String,
            amount:Number,
            price:Number
        }
    ]
})
module.exports=mongoose.model("Dashboard",dashboardSchema)

