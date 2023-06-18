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
var upload = multer({ storage: storage })
router.route("/getUsers")
    .get(adminController.getUsers);
router.route("/getProducts")
    .get(adminController.getProducts)
router.route('/editProduct')
    .put(adminController.editProduct)
router.route('/addMember')
    .post(upload.single('profileImg'),adminController.addUser)
module.exports=router;