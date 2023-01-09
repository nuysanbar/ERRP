const express = require('express');
const router=express.Router();
const homeController = require("../../controllers/homeControllers/homeController")
const productsController=require("../../controllers/homeControllers/productsController")
const dashboardController=require("../../controllers/homeControllers/dashboardController")
const profileController=require("../../controllers/homeControllers/profileController")
const savedController=require("../../controllers/homeControllers/savedController")

const multer=require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('calling destination...')
    cb(null, './public/uploads/products')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

router.route("/")
    .get(homeController.recommendedProducts);

router.route("/products")
    .get(productsController.getProducts)
    .post(productsController.addProduct)
    
router.route("/products/addNew")
    .post(upload.single("productImg") ,productsController.addNewProduct)
router.route("/products/addOld")
    .post(productsController.addOldProduct)

router.route("/dashboard")
    .get(dashboardController.getDashboard)

router.route('/profile')
    .get(profileController.getProfile)

router.route("/saved")
    .get(savedController.getSavedProductAndPlace)

module.exports=router;