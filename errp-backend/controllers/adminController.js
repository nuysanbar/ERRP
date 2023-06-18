const Product=require("../data/Product");
const User=require("../data/User")
const Merchant=require("../data/merchant")

const getUsers=async(req,res)=>{
    const results=await User.find({},{password:false})
    return res.status(201).json(results)
}
const getProducts=async(req,res)=>{
    const results= await Product.find()
    return res.status(201).json(results)
}
const addUser=async(req,res)=>{
    const {username,firstname,lastname,password,role,subcity,city,lat,lon,phoneNum,email}=req.body;
    if(!username || !password|| !role || !firstname || !lastname || !subcity) return res.status(400).json({"message":"bad request"})
    const duplicate= await User.findOne({username:username}).exec();
    if(duplicate) return res.sendStatus(409);
    if(role===5508){
        if(!req.body.sellerCode || !req.body.pdtToken){
            return res.status(400).json({"message":"selleCode and pdtToken needed"})
        }
        try{
            const addToMerchant= await Merchant.create({
                "username":username,
                "sellerCode":req.body.sellerCode,
                "pdtToken":req.body.pdtToken
            })
            console.log(addToMerchant)
        }catch(err){
            return res.status(500).json({"error":"server problem"})
        }
    }
    try{
        const hashedPwd= await bcrypt.hash(password,10);
        const result=await User.create({
            "username":username,
            "firstname":firstname,
            "lastname":lastname,
            "subcity":subcity,
            "city":city,
            "password":hashedPwd,
            "roles":parseInt(role),
            "lat":parseFloat(lat),
            "lon":parseFloat(lon),
            "email":email,
            "phoneNum":parseInt(phoneNum),
            "imgUrl":req.file.filename
        })
        console.log(result);
       return  res.status(201).json({"success":"new username is created"})
    }catch(err){
       return res.status(500).json({"error":"server problem"})
    }    
}
const editProduct=async(req,res)=>{
    const pictures=[]
    console.log(req.files)
    if(req.files){
        for(let i=0; i<req.files.length; i++){
            pictures.push(req.files[i].filename)
        }
    }
    const {barcode,brandname,type,brand,details}=req.body
    try{
        const result=await Product.create({
            "barcode":barcode,
            "brandName":brandname,
            "type":type,
            "brand":brand,
            "details":details,
            "imgUrl":pictures
        })
        console.log(result);
        var rqst=new rqs.SetItemValues(barcode,{
            "brandName":brandname,
            "type":type,
            "brand":brand,
            "details":details
        })
        rqst.timeout=10000
        client.send(rqst,(err,response)=>{
            if(err){
                console.log(err)
            }else{
                console.log(response)
            }
         })
        res.status(201).json({"success":"product is updated successfully"})
    }catch(err){
        res.status(500).json({"error":"server problem"})
    }
}

module.exports={editProduct, addUser,getUsers,getProducts}