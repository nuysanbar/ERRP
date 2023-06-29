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
var storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('calling destination...')
    cb(null, './public/uploads/delivery')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    cb(null, Date.now()+file.originalname)
  }
})
var upload = multer({ storage: storage })
var upload2 = multer({ storage: storage2 })
var upload3 = multer({storage:storage3})
const verifyAdmin=(req,res,next)=>{
  if(!req?.roles) return res.sendStatus(401)
  if(!(req.roles===3030)){
      return res.sendStatus(401)
  }
  next()
}
router.route("/getCustomers")
    .get(verifyAdmin,adminController.getCustomers);
router.route("/getRetailers")
    .get(verifyAdmin,adminController.getRetailers)
    router.route("/getDeliverers")
    .get(verifyAdmin,adminController.getDeliverers)
router.route("/getUser/:username")
    .get(verifyAdmin,adminController.getUser);
router.route("/getProducts")
    .get(verifyAdmin,adminController.getProducts)
router.route('/editProduct/:barcode')
    .put(verifyAdmin,upload2.array("productImg",5),adminController.editProduct)
router.route('/addMember')
    .post(verifyAdmin,upload.single('profileImg'),adminController.addUser)
router.route("/addLicense/:id")
    .put(verifyAdmin,upload3.single("license"),adminController.addLicense)
router.route("/editMember/edit/:username")
    .put(verifyAdmin,adminController.editMember)
router.route("/deleteMember/:username/:role")
    .delete(verifyAdmin,adminController.deleteUser)
router.route("/changeStatus/:id/toggleSuspend")
    .get(verifyAdmin,adminController.toggleSuspend)
module.exports=router;