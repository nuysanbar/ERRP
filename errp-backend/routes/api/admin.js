const express = require('express');
const router=express.Router();
const adminController = require('../../controllers/adminController.js');
const multer=require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('calling destination...')
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    cb(null, file.originalname)
  }
})

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('calling destination...')
    cb(null, './public/uploads/products')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    cb(null, Date.now()+file.originalname)
  }
})
var upload = multer({ storage: storage })
var upload2 = multer({ storage: storage2 })
const verifyAdmin=(req,res,next)=>{
  if(!req?.roles) return res.sendStatus(401)
  if(!(req.roles===3030)){
      return res.sendStatus(401)
  }
  next()
}
router.route("/getUsers")
    .get(verifyAdmin,adminController.getUsers);
router.route("/getUser/:username")
    .get(verifyAdmin,adminController.getUser);
router.route("/getProducts")
    .get(verifyAdmin,adminController.getProducts)
router.route('/editProduct/:barcode')
    .put(verifyAdmin,upload2.array("productImg",5),adminController.editProduct)
router.route('/addMember')
    .post(verifyAdmin,upload.single('profileImg'),adminController.addUser)
router.route("/editMember/edit/:username")
    .put(verifyAdmin,adminController.editMember)
router.route("/deleteMember/:username/:role")
    .delete(verifyAdmin,adminController.deleteUser)
module.exports=router;