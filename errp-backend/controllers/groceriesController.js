const Grocery = require('../data/Grocery');

const handleNewGrocery= async (req,res)=>{
    const {checked,item}=req.body;
    if(!item)return res.status(401).json({"message":"item should be filled"})
    const duplicate= await Grocery.findOne({item:item}).exec();
    if(duplicate) return res.status(409).json({"message":"duplicate"});
    try{
        const result=await Grocery.create({
            "item":item,
            "checked":checked
        })
        console.log(result);
        res.status(201).json({"success":"new item is added"})
    }catch(err){
        res.status(500).json({"error":"server problem"})
    }
}
const getGroceries=async(req,res)=>{
    const groceries=await Grocery.find();
    if(!groceries) return res.status(204).json({"message":"no groceries found"});
    res.json(groceries);
};
const handleCheck=async (req,res)=>{
    const {checked}=req.body;
    console.log(req.params.id)
    if(!req?.params?.id){
        return res.status(400).json({"message":" grocery id is required"})
    }
    try{
     await Grocery.updateOne( { _id:req.params.id },{$set: { checked:!checked}})
    }catch(err){
        console.error(err)
    }
};
const deleteGrocery=async (req,res)=>{
    console.log(req.params.id)
    if(!req?.params?.id){
        return res.status(400).json({"message":" grocery id is required"})
    }
    const grocery= await Grocery.findOne({ _id:req.params.id}).exec();
    console.log(grocery);
    if(!grocery){
        return res.status(204).json({"message":"No employee matches the the id "+req.params.id})
    }
    const result= await Grocery.deleteOne({_id:req.params.id});
    res.json(result);
}
module.exports={handleNewGrocery,getGroceries,handleCheck,deleteGrocery};
