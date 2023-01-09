const express=require('express');
const router=express.Router();
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
const registerController = require('../../controllers/registerController')
router.route('/')
    .post(upload.single('profileImg'),registerController.handleNewUser)
module.exports=router;