const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const grocerySchema=new Schema({
    item:{
        type:String,
        required:true
    },
    checked:{
        type:Boolean,
        required:true
    }
})

module.exports=mongoose.model('Grocey',grocerySchema);