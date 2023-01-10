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

const verifyRetailer=(req,res,next)=>{
    if(!req?.roles) return res.sendStatus(401)
    if(!(req.roles===5508)){
        return res.sendStatus(401)
    }
    next()
}

router.route("/")
    .get(homeController.recommendedProducts);

router.route("/products")
    .get(verifyRetailer,productsController.getProducts)
    .post(verifyRetailer,productsController.addProduct)
router.route("/products/:barcode")
    .get(verifyRetailer,productsController.getProduct)
router.route("/products/addNew")
    .post(upload.single("productImg") ,productsController.addNewProduct)
router.route("/products/addOld")
    .post(verifyRetailer,productsController.addOldProduct)

router.route("/dashboard")
    .get(verifyRetailer,dashboardController.getDashboard)

router.route('/profile')
    .get(profileController.getProfile)

router.route("/saved")
    .get(savedController.getSavedProductAndPlace)

module.exports=router;