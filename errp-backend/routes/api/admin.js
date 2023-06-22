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
router.route("/getUsers")
    .get(adminController.getUsers);
router.route("/getUser/:username")
    .get(adminController.getUser);
router.route("/getProducts")
    .get(adminController.getProducts)
router.route('/editProduct/:barcode')
    .put(upload2.array("productImg",5),adminController.editProduct)
router.route('/addMember')
    .post(upload.single('profileImg'),adminController.addUser)
router.route("/editMember/edit/:username")
    .put(adminController.editMember)
router.route("/deleteMember/:username/:role")
    .delete(adminController.deleteUser)
module.exports=router;