const express = require('express');
const router=express.Router();
const homeController = require("../../controllers/homeControllers/homeController")
const productsController=require("../../controllers/homeControllers/productsController")
const dashboardController=require("../../controllers/homeControllers/dashboardController")
const profileController=require("../../controllers/homeControllers/profileController")
const savedController=require("../../controllers/homeControllers/savedController")
const favouriteController=require("../../controllers/homeControllers/favouriteController")
const notificationController=require("../../controllers/homeControllers/notificationController")
const multer=require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('calling destination...')
    cb(null, './public/uploads/products')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    cb(null, Date.now()+file.originalname)
  }
})
var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('calling destination...')
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    cb(null, Date.now()+file.originalname)
  }
})
var upload = multer({ storage: storage })
var upload2= multer({ storage: storage2})
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
router.route("/products/:barcode/soldOne")
    .post(verifyRetailer,productsController.soldOne)
router.route("/products/:barcode/updatePrice")
    .post(verifyRetailer,productsController.updatePrice)
router.route("/products/:barcode/updateAmount")
    .post(verifyRetailer,productsController.updateAmount)
router.route("/products/:barcode/deleteProduct")
    .post(verifyRetailer,productsController.deleteProduct)


router.route("/favorites")
    .get(favouriteController.getFavourites)
router.route("/notifications")
    .get(verifyRetailer,notificationController.getNotifications)
router.route("/dashboard")
    .get(verifyRetailer,dashboardController.getDashboard)
router.route('/profile')
    .get(profileController.getProfile)
router.route('/profile/update')
    .post(upload2.single("profileImg"),profileController.updateProfile)
router.route("/saved")
    .get(savedController.getSavedProductAndPlace)

module.exports=router;