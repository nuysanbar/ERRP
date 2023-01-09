const Employee=require('../data/Employee');

const getAllEmployees=async(req,res)=>{
    const employees=await Employee.find();
    if(!employees) return res.status(204).json({"message":"no employees found"});
    res.json(employees);
};
const createEmployee=async (req,res)=>{
    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({"message":"firstname and lastname are required"});
    }
    try{
        const result= await Employee.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname
        })
        res.status(201).json(result);
    }catch(err){
        console.error(err);
    }
};
const updateEmployee=async(req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({"message":" employee id is required"})
    }
    const employee= await Employee.findOne({ _id:req.body.id}).exec();
    if(!employee){
        return res.status(204).json({"message":"No employee matches the the id "+req.body.id})
    }
    if(req.body?.firstname) employee.firstname=req.body.firstname;
    if(req.body?.lastname) employee.lastname=req.body.lastname;
    const result=employee.save();
    res.json(result)
};

const deleteEmployee=async (req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({"message":" employee id is required"})
    }
    const employee= await Employee.findOne({ _id:req.body.id}).exec();
    if(!employee){
        return res.status(204).json({"message":"No employee matches the the id "+req.body.id})
    }
    const result= await Employee.deleteOne({_id:req.body.id});
    res.json(result);
}
const getEmployee=async (req,res)=>{
    if(!req?.params?.id){
        return res.status(400).json({"message":" employee id is required"})
    }
    const employee= await Employee.findOne({ _id:req.params.id}).exec();
    if(!employee){
        return res.status(204).json({"message":"No employee matches the the id "+req.body.id})
    }
    res.json(employee);
};
module.exports={
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
